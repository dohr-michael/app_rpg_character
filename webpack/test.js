import HtmlWebpackPlugin from 'html-webpack-plugin';
import webpack           from 'webpack';
import merge             from 'webpack-merge';
import { 
    PATHS,
    SASS_MODULE_NAME,
    CONFIG }             from './base';
import pkg               from '../package.json';

const TEST_CONFIG = {
    entry: {}, // karma will set this
    resolve: {
        fallback: [PATHS.src]
    },
    output: {},
    devtool: 'inline-source-map',
    module: {
        loaders: [
            {
                test: /\.s?css$/,
                loaders: ['style', `css?${SASS_MODULE_NAME.dev}`, 'resolve-url', 'sass'],
                include: PATHS.src
            },
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: 'babel'
            },
            {
                test: /\.jsx?$/,
                loader: 'isparta',
                include: PATHS.src
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            appMountId: 'app',
            mobile: true,
            template: PATHS.src + '/index.html',
            title: pkg.title
        })
    ]
};

export default TEST_CONFIG;