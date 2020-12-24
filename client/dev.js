var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack.config');
const path = require('path');

const PORT = 5001;

const ROOT = path.resolve( path.join(__dirname));

console.log("Starting webpack dev server...");

// Start dev server for secure site / client:
new WebpackDevServer(webpack(config), {
    publicPath: config.output.publicPath,
    public: config.output.public,
    hot: true,
    historyApiFallback: true,
    watchContentBase: true
}).listen(PORT, 'localhost', function (err, result) {
    if (err) {
        return console.log(err);
    }

    console.log('Listening at http://localhost:' + PORT + '/');
});
