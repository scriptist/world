'use strict';

// This file needs to support Node v5.1.1 in order to run Atom's ESLint
// That's why it has a 'use strict' at the top

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    resolve: {
        extensions: ['', '.ts', '.tsx', '.js', '.jsx']
    },
    devtool: 'source-map',
    entry: {
        app: [
            './source/app.ts',
        ],
    },
    output: {
        filename: '[name].js',
        path: path.join(__dirname, 'dist'),
    },
    module: {
        loaders: [
            {
                test: /\.ts$/,
                loader: 'awesome-typescript-loader'
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({ title: 'World' }),
    ],
};
