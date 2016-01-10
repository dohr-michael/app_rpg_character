import path from 'path';

export const PATHS = {
    root:         path.join( __dirname, '..' ),
    src:          path.join( __dirname, '../src' ),
    build:        path.join( __dirname, '../build' ),
    node_modules: path.resolve( __dirname, '../node_modules' ),
    test:         path.join( __dirname, '../test' )
};

export const VENDOR_LIBS = [
    'airflux',
    'babel-polyfill',
    'classnames',
    'history',
    'immutable',
    'lodash',
    'moment',
    'react',
    'react-dom',
    'react-intl',
    'react-router',
    'react-select',
    'whatwg-fetch'
];

export const VENDOR_ES6 = [
    { name: 'airflux', es6: 'es6', es5: 'lib' }
];

export const CHUNKS = [
    'app',
    'vendor'
];

export const SASS_MODULE_NAME = {
    build: 'localIdentName=[hash:base64:5]&modules',
    dev:   'localIdentName=[hash:base64:5]&modules'
};

export const STATIC_COPY = [
    { from: path.join( PATHS.src, 'external_lib' ), to: 'external_lib' },
    { from: path.join( PATHS.src, 'config' ), to: 'config' }
];

export const CONFIG = {
    entry:      {
        app:    PATHS.src,
        vendor: VENDOR_LIBS
    },
    resolve:    {
        extensions: ['', '.js', '.jsx']
    },
    module:     {
        loaders: [
            {
                test:    /\.jsx?$/,
                exclude: [PATHS.node_modules],
                loader:  'babel',
                include: [ PATHS.src ]
            },
            {
                test:   /\.(png|jpg|jpeg|gif|bmp)$/,
                loader: 'file?name=images/[hash].[ext]'
            },
            {
                test:   /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9-\.=]+)?$/,
                loader: 'file?name=fonts/[hash].[ext]'
            },
            {
                test:   /\.json/,
                loader: 'file'
            }
        ]
    },
    sassLoader: {
        includePaths: [
            PATHS.src,
            PATHS.node_modules,
            PATHS.node_modules + '/font-awesome/scss'
        ]
    },
    output:     {
        path:     PATHS.build,
        filename: '[name].js'
    },
    externals:  {
        "auth0lock":  "Auth0Lock",
        "app-config": "AppConfig"
    },
    plugins:    []
};