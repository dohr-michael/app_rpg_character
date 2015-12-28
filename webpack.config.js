const path = require( 'path' );
const util = require( 'util' );
const autoprefixer = require( 'autoprefixer' );
const pkg = require( './package.json' );
const loaders = require( './webpack/loaders' );
const plugins = require( './webpack/plugins' );


const DEV = process.env.NODE_ENV === 'dev';
const PROFILE = process.env.PROFILE || '';

const jsBundle = path.join( 'js', util.format( '[name].%s.js', pkg.version ) );
const entries = {
    app:       ['./app.js'],
    vendors:   ['react', 'react-dom', 'react-router', 'react-intl', 'flux', 'history', 'lodash'],
    polyfills: ['babel-polyfill', 'whatwg-fetch']
};

if( DEV ) {
    entries.app.push(
        util.format( 'webpack-dev-server/client?http://%s:%d', pkg.config.devHost, pkg.config.devPort ),
        'webpack/hot/dev-server'
    );
}

var context = path.join( __dirname, 'src' );

module.exports = {
    context:   context,
    entry:     entries,
    target:    'web',
    output:    {
        path:       path.resolve( pkg.config.buildDir ),
        publicPath: '/',
        filename:   jsBundle,
        pathinfo:   false
    },
    resolve:   {
        root:       context,
        extensions: ['', '.js', '.json', '.jsx'],
        alias:      (pkg.config.alias[PROFILE] || {})
    },
    module:    {
        loaders: loaders
    },
    plugins:   plugins,
    devtool:   DEV ? 'inline-source-map' : false,
    cache:     DEV,
    debug:     DEV,
    postcss:   [
        autoprefixer
    ],
    devServer: {
        contentBase: context,
        reload:      util.format( 'http://%s:%d', pkg.config.devHost, pkg.config.devPort ),
        hot:         true,
        noInfo:      true,
        inline:      true,
        stats:       { colors: true }
    }
};