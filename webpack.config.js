/* eslint-env node */
const path = require('path')
const webpack = require('webpack')

const TARGET = process.env.npm_lifecycle_event

let config = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist/'),
        filename: 'vue-tagsinput.js',
        libraryTarget: 'commonjs'
    },
    module: {
        loaders: [
            {test: /\.js$/, exclude: /node_modules/, loader: 'babel'},
            {test: /\.css$/, loader: 'style!css'},
            {test: /\.vue$/, loader: 'vue'},
        ]
    },
    plugins: [],
    devtool: 'source-map',
    babel: {
        presets: ['es2015', 'stage-2'],
        plugins: []
    },
    vue: {
        loaders: {
            scss: 'style!css'
        }
    }
}

// for production build
if (TARGET === 'build') {
    process.env.NODE_ENV = 'production'
    config.externals = {
        vue: 'commonjs vue'
    },
    // config.babel.plugins.push('transform-runtime')
    config.plugins.push(
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            }
        })
    )
} else if (TARGET === 'dev' || TARGET === 'build:example') {
    config = Object.assign(config, {
        entry: './example/index.js',
        output: {
            path: path.resolve(__dirname, 'example'),
            filename: 'example.js'
        },
        devtool: 'eval'
    })
}

module.exports = config
