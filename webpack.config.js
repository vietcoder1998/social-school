var HtmlWebpackPlugin = require('html-webpack-plugin');
var BrowserSyncPlugin = require('browser-sync-webpack-plugin');

module.exports = {
    mode: 'production',
    entry: './app.js',
    output: {
        filename: './dist/bundle.js'
    },

    watch: true,

    // module: {
    //     loaders: [{
    //         test: /\.css$/,
    //         use: ['style-loader', 'css-loader']
    //     }]
    // },


    plugin: [
        new BrowserSyncPlugin({
            // browse to https: // localhost:4000 during development , ./public directory is being server
            host: 'localhost',
            port: 4000, 
            server: {baseDir: ['dist']}
        }),

        new HtmlWebpackPlugin({template: './dist/index.html'})
    ]
}