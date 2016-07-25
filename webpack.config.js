module.exports = {
    entry: "./src/index.es6",
    output: {
        filename: "bundle.js"
    },
    resolve: {
        extensions: ['', '.js', '.es6']
    },
    module: {
        loaders: [{
                test: /\.es6$/,
                exclude: /node_modules/, 
                loader: "babel" 
            }
        ]
    }
};