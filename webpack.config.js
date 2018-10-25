const path = require('path');

module.exports = {
    entry: './src/js/main.js',
    mode:'production',
    output: {
        filename: 'script.js',
        path: path.resolve(__dirname, 'build/js')
    },
    module: {
        rules: [{
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
                loader: 'babel-loader',
            }
        }]
    }
};