const path = require("path");

module.exports = {
    entry: './main.js',
    output: {
        path: './',
        filename: 'index.js'
    },
    devServer: {
        inline: true,
        port: 3333
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel',
                query: {
                    presets: ['es2015', 'react', 'stage-2'],
					plugins: ['transform-decorators-legacy']
                }
            },
            {
                test: /\.css$/,
                loader:'style!css'
            },
            {
                test: /\.less$/,
                loader:'style-loader!css-loader!less-loader'
            },
            {
                test: /\.(eot|woff|woff2|ttf)$/,
                loader: 'url-loader?limit=30000&name=[name]-[hash].[ext]'
            },
        ]
    },
    resolve: {
        extensions: ['', '.js', '.jsx'],
        root: [
            path.resolve('./'),
            path.resolve('./components')
        ]
    },
};
