var webpack = require('webpack');

module.exports = {
    entry: {
        javascript: "./app/js/client.js"
    },
    output: {
        path: __dirname + "/dist",
        filename: "bundle.js"
    },
    module: {
        loaders: [
            {
                test: /\.scss$/,
                use: ['style-loader', 'css-loader', 'sass-loader'],
            },
            {test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" },
            {test: /\.jsx$/, exclude: /node_modules/, loader: "babel-loader" },
            {test: /\.(jpe?g|png|gif|svg)$/i, loader: "file-loader?name=/public/icons/[name].[ext]"}
        ]
    },
    plugins: [
        new webpack.IgnorePlugin(/^(buffertools)$/) // unwanted "deeper" dependency
    ]
};
