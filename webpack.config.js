'use strict';

const MiniCssExtractPlugin = require("mini-css-extract-plugin");
var path = require("path");

module.exports = {
    mode: 'development',
    entry: {
        app: "./src/index.jsx"
    },
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "[name].js"
    },
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            publicPath: "./dist"
                        }
                    },
                    "css-loader", 
                    "sass-loader"
                ]
            },
            {
                test: /\.jsx?$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ["@babel/preset-env", "@babel/preset-react"],
                        plugins: ["@babel/plugin-proposal-class-properties"]
                    }
                }
            },
            {
                test: /\.(jpe?g|png|gif|svg|ico)$/i,
                use: [
                    "file-loader?name=[name].[ext]&outputPath=images/&publicPath=http://racheldotey.local/wp-content/themes/rachel-react-single/dist/images",
                    "image-webpack-loader"
                ]
            },
            {
                test: /\.(woff2?|svg)$/,
                loader: "url-loader?limit=10000&name=fonts/[name].[ext]"
            },
            {
                test: /\.(ttf|eot)$/,
                loader: "file-loader?name=fonts/[name].[ext]"
            }
        ]
    },
    resolve: {
        extensions: [".js", ".jsx"]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'style.css'
        })
    ]
};