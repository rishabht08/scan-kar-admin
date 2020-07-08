const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const isDevelopment = process.env.NODE_ENV === 'development'

module.exports = {
    entry: ["@babel/polyfill", "./src/index.js"],
    output: {
        path: path.join(__dirname, 'build'),
        publicPath: '/build/',
        filename: 'bundle.js',
    },
    module: {
        rules: [
            {
                test: /\.module\.s(a|c)ss$/,
                exclude: /node_modules/,
                loader: [
                    isDevelopment ? MiniCssExtractPlugin.loader : 'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true,
                            sourceMap: isDevelopment
                        }
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: isDevelopment
                        }
                    }
                ]
            },
            {
                test: /\.s(a|c)ss$/,
                exclude: /\.module.(s(a|c)ss)$/,
                loader: [
                    isDevelopment ? MiniCssExtractPlugin.loader : 'style-loader',
                    'css-loader',
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: isDevelopment
                        }
                    }
                ]
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ['@babel/preset-react'],
                    }
                }
            },
            {
                test: /\.css$/,
                exclude: /node_modules/,
                use: [
                    'style-loader',
                    'css-loader'
                ],
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/,
                exclude: /node_modules/,
                loader: 'url-loader?limit=1024&name=images/[name].[ext]'
            },
            {
                test: /\.(woff|woff2|eot|ttf|svg)$/,
                exclude: /node_modules/,
                loader: 'url-loader?limit=1024&name=fonts/[name].[ext]'
            }
        ]
    }, resolve: {
        extensions: ['.js', '.jsx', '.es6', '.json']
    },
    devServer: {
        compress: true,
        contentBase: './',
        port: 4000,
        proxy: {
            '/api': {
                target: 'http://13.233.49.163:8000',
                secure: false,
                pathRewrite: { '^/api': '' }
            }
        },
        historyApiFallback: true,
    },
    plugins: [
        new HtmlWebpackPlugin({
            'meta': {
                'viewport': 'width=device-width, initial-scale=1, shrink-to-fit=no',
                // Will generate: <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
                //   'theme-color': '#4285f4'
                // Will generate: <meta name="theme-color" content="#4285f4">
            }
        }),
        ///...
        new MiniCssExtractPlugin({
            filename: isDevelopment ? '[name].css' : '[name].[hash].css',
            chunkFilename: isDevelopment ? '[id].css' : '[id].[hash].css'
        })
    ]
}