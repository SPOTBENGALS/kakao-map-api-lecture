const path = require("path");

const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const dotenv = require("dotenv");
const webpack = require("webpack");
const isProduction = process.env.NODE_ENV === "production";

dotenv.config();
//process.env.KAKAP_MAP_KEY 로 접근할 수 있게 된다.

module.exports = {
  entry: "./src/index.tsx",
  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx"],
  },
  output: {
    path: path.resolve(__dirname, "../build"),
    filename: "static/js/[name].[contenthash:8].js",
    clean: true,
  },
  devtool: isProduction ? false : "eval-source-map",
  devServer: {
    port: 3000,
    hot: true, // 코드 자동 갱신
    open: true, // 코드 실행 시 자동 브라우징
    client: {
      overlay: true, // 코드 에러 시 콘솔 에러를 브라우저 화면에도 에러 표시
      progress: true, // 웹팩 진행상황 표시
    },
  },
  module: {
    rules: [
      {
        oneOf: [
          {
            test: /\.(ts|tsx)$/, // ts, tsx 파일에만 babel loader를 사용하겠다.
            exclude: /node_modules/, // 해당 파일은 로드하지 않겠다.
            use: {
              loader: "babel-loader",
            },
          },

          {
            test: /\.css$/,
            exclude: /node_modules/,
            use: [isProduction ? MiniCssExtractPlugin.loader : "style-loader", "css-loader"],
          },
        ],
      },
    ],
  },
  plugins: [
    isProduction
      ? new HtmlWebpackPlugin({
          template: "public/index.html",
          minify: true, // 개발에서만 쓰이는 불필요한 코드 제거(줄바꿈, 띄어쓰기, 콘솔로그, 무의미한 메서드 호출 등)
        })
      : new HtmlWebpackPlugin({ template: "public/index.html" }),
    isProduction ? new MiniCssExtractPlugin({ linkType: false, filename: "[name].[contenthash:8].css" }) : undefined,
    new webpack.DefinePlugin({
      "process.env": JSON.stringify(process.env),
    }),
  ].filter(Boolean),
};
