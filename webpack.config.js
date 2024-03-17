const path = require('path');
const TerserPlugin = require('terser-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    entry: './src/js/controller.js',
    output: {
        filename: 'bundle.[contenthash].js',
        path: path.resolve(__dirname, 'dist'),
    },
    watchOptions: {
        ignored: /node_modules/,
    },
    mode: 'development',
    module: {
        rules: [
            // {
            //     test: /\.(png|jpg)$/,
            //     type: 'asset/resource'
            // },
            // {
            //     test: /\.(png|jpg)$/,
            //     type: 'asset/inline'
            // },
            {
                test: /\.(png|jpg|svg)$/,
                type: 'asset/resource',
                generator: {
                    filename: 'img/[name]-[hash][ext]'
                }
                // If image is less than maxsize, it will consider as resource type else inline type
                // parser: {
                //     dataUrlCondition: {
                //         maxSize: 100 * 1024
                //     }
                // }
            },
            {
                // HTML LOADER
                test: /\.html$/,
                use: [
                    {
                      loader: 'html-loader'
                    }
                ]
            },
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader, 'css-loader'
                ]
            },
            {
                test: /\.scss$/,
                use: [
                    MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'
                ]
            }
        ]
    },
    devServer: {
        host: 'localhost',
        compress: false,
        port: 8081,
        hot: true,
        open: true,
        static: {
            directory: path.join(__dirname, 'dist'),
        },
    },
    plugins: [
        new TerserPlugin(),
        new MiniCssExtractPlugin({
            filename: 'styles.[contenthash].css',
        }),
        new CleanWebpackPlugin({
            cleanOnceBeforeBuildPatterns: [
                '**/*',
                path.join(process.cwd(), 'build/**/*')
            ]
        }),
        new HtmlWebpackPlugin({
            inject: 'head',
            template: './index.html',
            filename: 'index.html',
            title: 'Forkify',
        })
    ]
}