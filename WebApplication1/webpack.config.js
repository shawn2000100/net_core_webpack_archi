const webpack = require('webpack'); //to access built-in plugins
const MiniCssExtractPlugin = require("mini-css-extract-plugin"); // load css 檔案的套件
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const path = require("path");
const distPath = path.resolve(__dirname, './wwwroot'); /* bundle 檔發布位置 */
const srcPathCS = path.resolve(__dirname, '../OLCS/wwwroot');
const srcPathPU = path.resolve(__dirname, '../OLPU/wwwroot');

module.exports = {
    devtool: "source-map",
    entry: {
        /* --- OLCS --- */
        'css/main': ['./src/test.scss'],
        'js/CS/base/base': [`${srcPathCS}/A/site.ts`],
        'js/CS/UpdateData/UpdateData': [`${srcPathCS}/B/site.ts`, `${srcPathCS}/B/site-Copy (2).ts`, `${srcPathCS}/B/site-Copy.ts`],
        /* --- OLPU --- */
        'js/PU/IdVerify/AuthSelection': [`${srcPathPU}/A/site.ts`],
        'js/PU/IdVerify/Auth': [`${srcPathPU}/B/site.ts`, `${srcPathPU}/B/site-Copy (2).ts`, `${srcPathPU}/B/site-Copy.ts`]
    },
    output: {
        path: distPath,
        filename: '[name].min.js'
        //,publicPath: distPath /* Asset Path */
    },
    resolve: {
        extensions: [".js", ".ts", "scss"]
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                exclude: [/node_modules/],
                loader: "ts-loader",
                options: {
                    configFile: path.resolve(__dirname, './tsconfig.json')
                }
            },
            {
                test: /\.scss$/,
                use: [
                    // 需要用到的 loader
                    MiniCssExtractPlugin.loader,
                    "css-loader",
                    "sass-loader"
                ]
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            // 指定輸出位置
            // [name] 為上方進入點設定的 "名稱"
            filename: "[name].min.css"
        })
    ],
    optimization: {
        minimizer: [
            new CssMinimizerPlugin()
        ]
    }
};