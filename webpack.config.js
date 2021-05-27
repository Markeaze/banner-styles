const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require("path");

const isProduction = true;

module.exports = {
  name: "styles",
  entry: ["./src/styles.js"],
  output: {
    filename: "[name]",
    path: path.resolve("dist"),
    publicPath: "/",
  },
  optimization: {
    namedModules: true,
    namedChunks: true,
    moduleIds: "named",
    chunkIds: "named",
    portableRecords: true,
    splitChunks: {
      chunks: "all",
    },
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: [{ loader: "babel-loader" }],
      },
      {
        test: /\.s?(a|c)ss$/,
        exclude: /node_modules/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: !isProduction,
              publicPath: (resourcePath, context) => {
                // publicPath is the relative path of the resource to the context
                // e.g. for ./css/admin/main.css the publicPath will be ../../
                // while for ./css/main.css the publicPath will be ../
                return path.relative(path.dirname(resourcePath), context) + "/";
              },
            },
          },
          {
            loader: "css-loader",
            options: { sourceMap: true },
          },
          {
            loader: "postcss-loader",
            options: { sourceMap: true },
          },
          { loader: "sass-loader", options: { sourceMap: true } },
        ],
      },
    ],
  },
  watch: false,
  watchOptions: {
    ignored: ["node_modules/*"],
  },
  resolve: {
    extensions: [".js", ".jsx", ".scss"],
  },
  plugins: [
    new MiniCssExtractPlugin({
      splitChunks: false,
      filename: "styles.min.css",
      chunkFileName: "[id].css",
      ignoreOrder: false,
    }),
  ],
};
