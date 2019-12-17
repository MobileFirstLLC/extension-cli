const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
    mode: 'production',
    module: {
        rules: [
            {
                test: /(\.jsx|\.js)$/,
                loader: ['babel-loader', 'eslint-loader'],
                exclude: /(node_modules|bower_components)/
            }
        ]
    },
    resolve: {
        modules: [path.resolve(__dirname, 'src'), 'node_modules'],
        extensions: ['.js']
    },
    plugins: [
        new UglifyJsPlugin()
    ]
};
