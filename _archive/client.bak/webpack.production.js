const webpack = require('webpack');
const path = require('path');
//const ExtractTextPlugin = require("extract-text-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const BUILD_DIR = path.resolve(__dirname, 'build');
const APP_DIR = path.resolve(__dirname, 'src');
const PORT = 5000;

let config = {
    mode: 'production',
    
    entry: {
        app: [
            APP_DIR + '/entry.tsx'
        ]
    },

    output: {
        publicPath: '/schemedream',
        path: BUILD_DIR,
        filename: '[name].[hash].js'
    },

    resolve: {
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.scss'],
	    alias: {
          shared: path.resolve(__dirname, "../shared/"),
          client: path.resolve(__dirname, "./src/"),
          components: path.resolve(__dirname, "./src/components"),
          lib: path.resolve(__dirname, "./src/lib")
        }
    },

    module: {
        rules: [
            { 
                test: /\.(t|j)sx?$/, 
                include: [APP_DIR],
                exclude: [/node_modules/],
                loader: 'ts-loader'
            },


            {
                test: /\.scss$/,
                include: [
                    APP_DIR
                ],
                exclude: /node_modules/,

                use: [
                    //'style-loader', // 
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            publicPath: path.resolve(__dirname, 'src/style')
                        }
                    },
                    {
                        loader: 'css-loader',
                        options: {
                          importLoaders: 1,
                          minimize: true,
                          publicPath: path.resolve(__dirname, 'src/style')
                        }
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: () => [require('autoprefixer')({
                                'browsers': ['> 1%', 'last 2 versions']
                            })],
                        }
                    },
                    'sass-loader'
                ]
            }

        ]
    },

    plugins: [
        // Clean previous client builds
        new CleanWebpackPlugin(['build/app.*.js', 'build/app.*.css'], {
            root:     path.resolve(__dirname),
            verbose:  true,
            allowExternal: true,
            watch: true
        }),

        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'index.template.html',
        }),

        new MiniCssExtractPlugin({
            filename: "[name].[hash].css",
            chunkFilename: "[id].[hash].css",
            publicPath: path.resolve(__dirname, 'src/style')
        }),
            
    ],

};

module.exports = config;
