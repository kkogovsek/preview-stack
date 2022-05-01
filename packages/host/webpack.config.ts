const HtmlWebpackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin =
  require("webpack").container.ModuleFederationPlugin;
const path = require("path");
const DashboardPlugin = require("webpack-dashboard/plugin");

const esbuildOptions = {
  loader: "tsx",
  target: "es2015",
};

module.exports = {
  entry: "./src/index.tsx",
  mode: "development",
  devServer: {
    // contentBase: path.join(__dirname, "dist"),
    port: 1337,
    open: true,
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
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
    new DashboardPlugin({}),
  ],
};
