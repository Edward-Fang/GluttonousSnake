const HTMLWebpackPlugin = require("html-webpack-plugin");
module.exports = {
  mode: "production",
  entry: "./src/index.ts",
  output: {
    path: __dirname + "/dist",
    filename: "bundle.js",
    clean: true,
    environment: {
      arrowFunction: false,
      const: false,
    },
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: [
                [
                  "@babel/preset-env",
                  {
                    targets: {
                      chrome: "58",
                      ie: "11",
                    },
                    corejs: "3",
                    useBuiltIns: "usage",
                  },
                ],
              ],
            },
          },
          "ts-loader",
        ],
        exclude: /node-modules/,
      },
      {
        test: /\.less$/,
        use: [
          "style-loader",
          "css-loader",
          {
            loader: "postcss-loader",
            ident: "postcss",
            options: {
              postcssOptions: {
                plugins: () => [require("postcss-preset-env")()],
              },
            },
          },
          "less-loader",
        ],
      },
    ],
  },
  plugins: [
    new HTMLWebpackPlugin({
      template: "./src/index.html",
    }),
  ],
  resolve: {
    extensions: [".ts", ".js"],
  },
  devServer: {
    open: true,
    port: 3000,
  },
};
