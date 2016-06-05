'use strict';

const path = require('path');
const webpack = require('webpack');

const env = process.env.NODE_ENV;

let config = {
    entry: {
        app: path.resolve(path.resolve(__dirname + '/src'), 'ndom.js')
    },
    output: {
        library: 'ndom',
        libraryTarget: 'umd'
    },
    stats: {
        colors: true
    },
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
    module: {
        noParse: /\.min\.js$/,
        loaders: [
            {test: /\.js$/, exclude: /node_modules/, loaders: ['babel']}
        ]
    },
    plugins: [
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(env)
        })
    ],
    devtool: 'source-map'
};

if (process.env.NODE_ENV === 'production') {
    config.plugins.push(
        new webpack.optimize.UglifyJsPlugin({
            compressor: {
                pure_getters: true,
                unsafe: true,
                unsafe_comps: true,
                screw_ie8: true,
                warnings: false
            }
        })
    )
}

module.exports = config;