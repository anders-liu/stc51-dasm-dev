const path = require("path");

module.exports = (env) => {
    return {
        entry: "./index.tsx",
        output: {
            filename: "ui.js",
            path: path.resolve(__dirname, "../../../out/webpack/")
        },
        devtool: "source-map",
        resolve: {
            extensions: [".ts", ".tsx", ".js"],
            alias: {
                "package.json": path.resolve(__dirname, "./package.g.json")
            }
        },
        module: {
            rules: [{
                test: /\.tsx?$/,
                loader: "ts-loader"
            }, {
                test: /\.js$/,
                loader: "source-map-loader",
                enforce: "pre"
            }]
        },
        externals: {
            "react": "React",
            "react-dom": "ReactDOM",
            "redux": "Redux",
            "react-redux": "ReactRedux"
        }
    };
};