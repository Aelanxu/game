const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'game.js'
    },
    plugins: [new HtmlWebpackPlugin({
        title: 'MyGame',
        template: 'index.html'
    })]
};