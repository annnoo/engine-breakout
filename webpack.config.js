const path = require('path');

module.exports = {
    devtool: 'source-map',
    entry: './src/index.js',
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.(gif|png|jpe?g|svg)$/i,
                use: [
                    'file-loader',
                    {
                        loader: 'image-webpack-loader',
                        options: {
                            outputPath: 'images/',
                            mozjpeg: {
                                progressive: true,
                                quality: 65
                            },
                            optipng: {
                                enabled: true,
                            },
                            gifsicle: {
                                interlaced: false,
                            }
                        }
                    },
                ],
            },
            {
                test: /\.(ogg|mp3|wav|mpe?g)$/i,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            // name: '[name].[ext]'
                            // outputPath: 'audio/'
                        }
                    }
                ]
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            // outputPath: 'fonts/'
                        }
                    }
                ]
            },
            {
                test: /\.html?$/,
                loader: 'dom-element-loader'
            }
        ]
    }
};
