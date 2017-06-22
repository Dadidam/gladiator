const path = require('path');
// const ENV = process.env.NODE_ENV;

const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin');

const lessRules = {
    use: [
        { loader: 'css-loader' },
        { loader: 'less-loader' }
    ]
};

const baseConfig = {
    entry: {
        main: './main.js'
    },
    output: {
        filename: 'index.js',
        path: path.resolve('./build')
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-loader',
                        query: {
                            presets: ['es2015', 'react', 'stage-2'],
                            plugins: ['transform-decorators-legacy']
                        }
                    }
                ]
            },
            {
                test: /\.css$/,
                use: [
                    { loader: 'style-loader' },
                    { loader: 'css-loader' }
                ]
            },
            { test: /\.less$/, use: ExtractTextPlugin.extract(lessRules) },
            {
                test: /\.svg$/,
                use: [
                    {
                        loader: 'url-loader',
                        query: { limit: 10000 }
                    }
                ]
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin('main.css'),
        new HTMLWebpackPlugin(),
        // new webpack.DefinePlugin({
        //     'process.env.NODE_ENV': JSON.stringify(ENV)
        // })
    ]
};

// if (ENV === 'production') {
//     baseConfig.plugins.push(new webpack.optimize.UglifyJsPlugin());
// }

// export configuration
module.exports = baseConfig;

// const path = require("path");
//
// module.exports = {
//     entry: './main.js',
//     output: {
//         path: './',
//         filename: 'index.js'
//     },
//     devServer: {
//         inline: true,
//         port: 3333
//     },
//     module: {
//         loaders: [
//             {
//                 test: /\.js$/,
//                 exclude: /node_modules/,
//                 loader: 'babel',
//                 query: {
//                     presets: ['es2015', 'react', 'stage-2'],
// 					plugins: ['transform-decorators-legacy']
//                 }
//             },
//             {
//                 test: /\.css$/,
//                 loader:'style!css'
//             },
//             {
//                 test: /\.less$/,
//                 loader:'style-loader!css-loader!less-loader'
//             },
//             {
//                 test: /\.(eot|woff|woff2|ttf)$/,
//                 loader: 'url-loader?limit=30000&name=[name]-[hash].[ext]'
//             },
//         ]
//     },
//     resolve: {
//         extensions: ['', '.js', '.jsx'],
//         root: [
//             path.resolve('./'),
//             path.resolve('./components')
//         ]
//     },
// };
