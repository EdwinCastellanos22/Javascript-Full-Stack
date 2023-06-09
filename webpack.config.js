const path = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const modeenv= process.env.NODE_ENV != 'production';
const MiniCssExtractPlugin= require("mini-css-extract-plugin");

module.exports = {

    entry: "./frontend/app.js",
    output: {
        path: path.join(__dirname, "backend/public"),
        filename: "js/bundle.js"
    },
    module: {
        rules: [{test: /\.css/, use: [
            modeenv ? 'style-loader' : MiniCssExtractPlugin.loader,
            'css-loader'
        ]}]
    },
    mode: 'production',
    plugins: [
        new HtmlWebpackPlugin({
            template: "./frontend/index.html",
            minify: {
                collapseWhitespace: true,
                removeComments: true,
                removeRedundantAttributes: true,
                removeScriptTypeAttributes: true,
                removeStyleLinkTypeAttributes: true,
                useShortDoctype: true
            }
        }),
        new MiniCssExtractPlugin({
            filename: 'css/bundle.css'
        })
    ],
    devtool: 'source-map'
}