const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin =
  require("webpack").container.ModuleFederationPlugin;
const path = require("path");
const DashboardPlugin = require("webpack-dashboard/plugin");

const esbuildOptions = {
  loader: "tsx",
  target: "es2015",
};

type SimpleConfig = {
  port: number;
  entry: string;
  template?: string | boolean;
  container?: string;
  pullRequestContainer?: boolean;
};

module.exports = ({
  port,
  entry,
  template,
  container,
  pullRequestContainer,
}: SimpleConfig) => ({
  entry,
  mode: "development",
  devServer: {
    // contentBase: path.join(__dirname, "dist"),
    port,
    open: !!template,
  },
  output: {
    publicPath: "auto",
  },
  resolve: {
    extensions: [".ts", ".js", ".json", ".jsx", ".tsx", ".css"],
  },
  module: {
    rules: [
      {
        test: /\.[tj]sx?$/,
        loader: "esbuild-loader",
        options: esbuildOptions,
      },
      {
        test: /\.css$/i,
        use: [
          "style-loader",
          "css-loader",
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: [
                  [
                    "postcss-preset-env",
                    {
                      // Options
                    },
                  ],
                ],
              },
            },
          },
        ],
      },
    ],
  },
  plugins: [
    ...(template
      ? [
          new HtmlWebpackPlugin({
            template: template === true ? "./public/index.html" : template,
          }),
        ]
      : []),
    ...(container
      ? [
          new ModuleFederationPlugin({
            name: `container${
              pullRequestContainer && process.env.PULL_REQUEST_ID
                ? `_pr_${process.env.PULL_REQUEST_ID}`
                : ""
            }`,
            filename: "container.js",
            exposes: {
              "./entry": "./src/index.tsx",
            },
            shared: [
              {
                react: { singleton: true, eager: true },
                "react-dom": { singleton: true, eager: true },
              },
            ],
          }),
        ]
      : []),
    new DashboardPlugin({}),
  ],
});
