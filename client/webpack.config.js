var path = require("path");
const webpack = require('webpack');
const { ESBuildPlugin } = require('esbuild-loader');
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

const ROOT = path.resolve( path.join(__dirname));
const PATHS = {
    src: path.join(ROOT, 'src'),
    styles: path.join(ROOT, 'src', 'style'),
    assets: path.join(ROOT, 'static'),
    build: path.join(ROOT, 'build'),
    modules: path.join(ROOT, 'node_modules')
};

module.exports = {
    name: 'browser',
    cache: true,
    devtool: 'eval',

    mode: 'development',

    context: ROOT,

    entry: {
        app: [
            path.join(PATHS.src, 'entry.tsx')
        ]
    },

    output: {
        path: PATHS.build,
        publicPath: '/',
        //filename: '[name].[hash].js',
        filename: '[name].js',
        chunkFilename: '[id].chunk.js',
    },

    module: {

        rules: [

            {
                test: /\.(j|t)sx?$/,
                include: [PATHS.src], 
                exclude: [PATHS.modules],
                use: [
                    {
                        
                        loader: 'esbuild-loader',
                        options: {
                            loader: 'tsx', // Or 'ts' if you don't need tsx
                            target: 'esnext'
                        }
                    }
                ]
            },

            {
                test: /\.scss$/,
                include: [PATHS.styles, PATHS.src],
                exclude: [PATHS.modules],
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader'
                    // {
                    //     loader: 'postcss-loader',
                    //     options: {
                    //         postcssOptions: {
                    //             plugins: [
                    //                 ['postcss-preset-env'],
                    //                 ['autoprefixer']
                    //             ],
                    //         },
                    //     },
                    // },
                ]
            },

            {
                test: /.*\.(ttf|eot|woff|woff2|svg|gif|png|jpe?g|svg)$/,
                loader: "file-loader",
                include: [PATHS.assets, PATHS.src], 
                exclude: [PATHS.modules],
                options: {
                    name: "[name].[ext]",
                    outputPath: (url, resourcePath, context) => {
                        const relativePath = path.relative(context, resourcePath);
                        console.log("RELATIVE", relativePath, url)
            
                        // ignore SVG file if its relative path contains "fonts"
                        if (/\/img\//.test(relativePath)) {
                            return `static/img/${url}`;
                        }

                        // ignore SVG file if its relative path contains "images"
                        if (/\/fonts\//.test(relativePath)) {
                            return `static/fonts/${url}`;
                        }

                        return url;
                    },
                },
            },


        ]
    },

    plugins: [ 

        new CopyPlugin( {
            patterns: [
                { from: PATHS.assets, to: path.join(PATHS.build, 'static') }
            ]
        }),

        new ESBuildPlugin(),
        
        new HtmlWebpackPlugin({
            template: 'index.template.html',
            publicPath: ''
        })

        // new CleanWebpackPlugin(['build/app.*.js', 'build/app.*.css'], {
        //     root:     path.resolve(__dirname),
        //     verbose:  true,
        //     allowExternal: true,
        //     watch: true
        // }),
    
        //new webpack.SourceMapDevToolPlugin({})

        // new webpack.DllReferencePlugin({
        //     context: PATHS.src,
        //     manifest: path.join(PATHS.build, 'vendor-manifest.json')
        // }),
        /*
        // new ExtractTextPlugin('[name].[chunkhash].css')
        new ExtractTextPlugin('css/[name].css', {
            publicPath: '/css/',
            allChunks: true
        })
        */
    ],

    // optimization: {
    //     +     minimize: true,
    //     +     minimizer: [
    //     +       new ESBuildMinifyPlugin({
    //     +         target: 'es2015' // Syntax to compile to (see options below for possible values)
    //     +       })
    //     +     ],
    //     +   },

    resolve: {
        extensions: [".js", ".ts", ".jsx", ".tsx", ".scss"],
        //roots: [PATHS.src],
        modules: [PATHS.modules],
        alias: {
            'react-dom': '@hot-loader/react-dom',
            client: PATHS.src,
            components: path.join(PATHS.src, 'components'),
            lib: path.join(PATHS.src, 'lib'),
            utils: path.join(PATHS.src, 'lib', 'utils'),
            models: path.join(PATHS.src, 'lib', 'models'),
            data: path.join(PATHS.src, 'data'),
            style: PATHS.styles,
            config: path.join(PATHS.src, 'config')
        }
    },
    
    performance: {
        hints: false
    },

    devServer: {
        hot: true,
        contentBase: PATHS.build,
        publicPath: 'http://localhost:8080',
        port: 8080,
        headers: { "Access-Control-Allow-Origin": "*" },
        lazy: false,
        stats: { colors: true }
    }
}


/*,
{

    // The configuration for the server-side rendering
        name: "server-side rendering",
        entry: "./server/server.js",
        target: "node",
        output: {
            path: './dist',
            filename: "server.generated.js",
            publicPath: 'dist',
            //libraryTarget: "commonjs2"
        },
        externals: /^[a-z\-0-9]+$/,
        module: {
            preLoaders: [
                { test: /\.json$/, exclude: /node_modules/, loader: 'json'},
            ],
            loaders: [
                {
                    test: /\.jsx?$/,
                    loader: 'babel',
                    include: [              
                        path.join(__dirname, "server"), //important for performance
                        path.join(__dirname, "src/js")
                    ], 
                    query: {
                        cacheDirectory: true, //important for performance
                        plugins: ["transform-regenerator"],
                        presets: ["react", "es2015"]
                    }
                }
            ]
        }
        /*
        module: {
            loaders: commonLoaders.concat([
                { test: /\.css$/,  loader: path.join(__dirname, "server", "style-collector") + "!css-loader" },
            ])
        }
        *

}*/