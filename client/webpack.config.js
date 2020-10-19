const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");

const BUILD_DIR = path.resolve(__dirname, 'build');
const APP_DIR = path.resolve(__dirname, 'src');
const PORT = 5001;

let config = {
    mode: 'development',

    entry: {
        app: [
            'webpack-dev-server/client?http://localhost:' + PORT,
            'webpack/hot/dev-server',
            //'react-hot-loader/patch',
            APP_DIR + '/entry.tsx'
        ]
    },

    output: {
        publicPath: '/',
        path: BUILD_DIR,
        filename: '[name].[hash].js',
        chunkFilename: 'hot-update.js',
        hotUpdateMainFilename: 'hot-update-chunk.json',
        hotUpdateChunkFilename: 'hot-update-chunk.js',
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
                    'style-loader',
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
            },

            {
                test: /\.(png|jpg|gif|svg|webp|ico|woff|woff2|eot|otf|ttf|css)$/,
                use: [
                {
                    loader: 'file-loader',
                    options: {}
                }
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
    
        new webpack.HotModuleReplacementPlugin(),

        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'index.template.html',
        }),
            
    ],

    devServer: {
        hot: true,
        contentBase: './src',
        publicPath: '/',
        public: 'http://localhost:' + PORT,
        port: PORT,
        watchContentBase: true
    }

};

module.exports = config;