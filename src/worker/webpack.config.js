const path = require("path");

module.exports = (env) => {
    return {
        entry: "./index.ts",
        output: {
            filename: "worker.js",
            path: path.resolve(__dirname, "../../out/webpack/")
        },
        devtool: "source-map",
        resolve: {
            extensions: [".ts", ".js"]
        },
        module: {
            rules: [{
                test: /\.ts$/,
                loader: "ts-loader"
            }, {
                test: /\.js$/,
                loader: "source-map-loader",
                enforce: "pre"
            }]
        }
    };
};