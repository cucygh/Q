module.exports = {
    entry: './public/javascripts/index.js',
    module: {
        loaders: [{
                test: /\.less$/,
                loader: 'style-loader!css-loader!less-loader'
            }, // use ! to chain loaders
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader'
            }, {
                test: /\.(png|jpg)$/,
                loader: 'url-loader?limit=8192'
            } // inline base64 URLs for <=8k images, direct URLs for the rest
        ]
    },
    output: {
        filename: './public/javascripts/index.min.js'
    }
};
