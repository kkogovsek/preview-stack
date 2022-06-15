export const metaWebpackConfig = `
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin =
  require("webpack").container.ModuleFederationPlugin;
const path = require("path");
const DashboardPlugin = require("webpack-dashboard/plugin");
const CopyPlugin = require("copy-webpack-plugin");

const esbuildOptions = {
  loader: "tsx",
  target: "es2020",
};

type SimpleConfig = {
  port: number;
  entry: string;
  template?: string | boolean;
  container?: string;
  pullRequestContainer?: boolean;
  copy?: Array<{ from: string; to: string }>;
  localFsPath?: string;
};

module.exports = ({
  port,
  entry,
  template,
  container,
  pullRequestContainer,
  copy,
  localFsPath,
}: SimpleConfig) => ({
  entry,
  mode: "development",
  devServer: {
    // contentBase: path.join(__dirname, "dist"),
    port,
    open: !!template,
    headers: {
      "Cache-Control": "no-store",
    },
  },
  output: {
    publicPath: "auto",
  },
  resolve: {
    extensions: [".ts", ".js", ".json", ".jsx", ".tsx", ".css"],
    fallback: {
      path: require.resolve("path-browserify"),
    },
  },
  module: {
    rules: [
      {
        test: /\.[tj]sx?$/,
        loader: "esbuild-loader",
        options: esbuildOptions,
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: "file-loader",
          },
        ],
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
            name: \`\${container}\${
              pullRequestContainer && process.env.PULL_REQUEST_ID
                ? \`_pr_\${process.env.PULL_REQUEST_ID}\`
                : ""
            }\`,
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
    ...(copy
      ? [
          new CopyPlugin({
            patterns: copy,
          }),
        ]
      : []),
    new DashboardPlugin({}),
    new webpack.DefinePlugin({
      LOCAL_BASE: JSON.stringify(localFsPath),
    }),
  ],
});

`;

export const minimalWebpackConfig = `const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: './src/index.js',
  mode: "development",
  devServer: {
    port: 1337,
    open: true,
  },
  output: {
    publicPath: "auto",
  },
  resolve: {
    extensions: [".ts", ".js", ".json", ".jsx", ".tsx"],
  },
  module: {
    rules: [
      {
        test: /\.[tj]sx?$/,
        loader: "esbuild-loader",
        options: {
          loader: "tsx",
          target: "es2020",
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
  ],
};`;

export const federationPluginExample = `module.exports = {
  // ...
  plugins: [
    // ...
    [
      new webpack.container.ModuleFederationPlugin({
        name: "remote_app",
        filename: "container.js",
        exposes: {
          "./entry": "./src/App.tsx",
        },
        shared: [
          {
            react: { singleton: true, eager: true },
            "react-dom": { singleton: true, eager: true },
          },
        ],
      }),
    ]
    // ...
  ]
  // ...
}`;

export const loadRemoteModule = ``;
