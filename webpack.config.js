const path = require('path');

module.exports = {
    entry: './src/index.js',
    mode:'production',
    output: {
        filename: 'main.js',
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