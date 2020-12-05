const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'game.js',

    },
    devServer: {
        contentBase: path.join(__dirname, "src"),
        hot: true,
        open: true

    },
    plugins: [new HtmlWebpackPlugin({
        title: 'MyGame',
        template: 'index.html'
    })]
};