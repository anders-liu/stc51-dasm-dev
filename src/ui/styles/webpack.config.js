const path = require("path");

module.exports = (env) => {
    return {
        entry: "./ui.scss",
        output: {
            filename: "ui.css",
            path: path.resolve(__dirname, "../../../out/webpack/")
        },
        devtool: "source-map",
        resolve: {
            extensions: [".scss"]
        },
        module: {
            rules: [{
                test: /\.scss$/,
                use: [
                    "style-loader", // creates style nodes from JS strings
                    "css-loader", // translates CSS into CommonJS
                    "sass-loader" // compiles Sass to CSS
                ]
            }]
        }
    };
};