const pkg = require( '../package.json' );
const path = require( 'path' );
const util = require( 'util' );
var ExtractTextPlugin = require('extract-text-webpack-plugin');

const DEV = process.env.NODE_ENV === 'dev';

const jsLoader = [
    'babel-loader?presets[]=es2015,presets[]=stage-0,presets[]=react'
];
const fileLoader = 'file-loader?name=[path][name].[ext]';
const htmlLoader = [
    'file-loader?name=[path][name].[ext]',
    'template-html-loader?' + [
        'raw=true',
        'engine=lodash',
        'csp=' + ( DEV ? pkg.config.csp.dev : pkg.config.csp.prod ),
        'version=' + pkg.version,
        'title=' + pkg.name,
        'debug=' + DEV
    ].join( '&' )
].join( '!' );

var sassLoader;
var cssLoader;
const sassParams = [
    'outputStyle=expanded',
    'includePaths[]=' + path.resolve( __dirname, '../src' ),
    'includePaths[]=' + path.resolve( __dirname, '../node_modules' )
];
if( DEV ) {
    sassParams.push( 'sourceMap', 'sourceMapContents=true' );
    sassLoader = [
        'style-loader',
        'css-loader?sourceMap&modules&localIndentName=[name]__[local]___[hash:base64:5]', //?sourceMap&modules&localIdentName=[name]__[local]___[hash:base64:5]',
        'postcss-loader',
        'sass-loader?' + sassParams.join( '&' )
    ].join( '!' );
    cssLoader = [
        'style-loader',
        'css-loader?sourceMap&localIdentName=[name]__[local]___[hash:base64:5]',
        'postcss-loader'
    ].join('!');
} else {
    sassLoader = ExtractTextPlugin.extract( 'style-loader', [
        'css-loader?localIdentName=[hash:base64:5]&modules',
        'postcss-loader',
        'sass-loader?' + sassParams.join( '&' )
    ].join( '!' ) );
    cssLoader = ExtractTextPlugin.extract('style-loader', [
        'css-loader?localIdentName=[hash:base64:5]',
        'postcss-loader'
    ].join('!'));
}


module.exports = [
    {
        test:    /\.jsx?$/,
        exclude: /node_modules/,
        loaders: jsLoader
    },
    {
        test:   /\.jpe?g$|\.gif$|\.png$|\.ico|\.svg$|\.woff2?$|\.ttf$|\.otf$|\.eot$/,
        loader: fileLoader
    },
    {
        test: /\.css$/,
        loader: cssLoader
    },
    {
        test:   /\.html$/,
        loader: htmlLoader
    },
    {
        test:    /\.scss$/,
        exclude: /node_modules/,
        loader:  sassLoader
    }
];
