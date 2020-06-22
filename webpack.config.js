const nodeExternals = require("webpack-node-externals");
const path = require("path");

const js = {
    test: /\.js$/,
    exclude: /node_modules/,
    use: {
        loader: "babel-loader",
        options: {
            presets: [
                [
                    "@babel/preset-env",
                    {
                        useBuiltIns: "usage",
                    },
                ],
                "@babel/preset-react",
            ],
        },
    },
};

const css = {
    test: /\.css$/i,
    exclude: /node_modules/,
    use: ["style-loader", "css-loader"],
};

const serverConfig = {
    mode: "development",
    target: "node",
    node: {
        __dirname: false,
    },
    externals: [nodeExternals()],
    entry: {
        "index.js": path.resolve(__dirname, "src/index.js"),
    },
    module: {
        rules: [
            js,
            {
                test: /\.css$/,
                loader:
                    "css/locals?module&localIdentName=[name]__[local]___[hash:base64:5]",
            },
        ],
    },
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "[name]",
    },
};

const clientConfig = {
    mode: "development",
    target: "web",
    entry: {
        "home.js": path.resolve(__dirname, "src/public/home.js"),
        "reactRoutes.js": path.resolve(__dirname, "src/public/reactRoutes.js"),
    },
    module: {
        rules: [js, css],
    },
    optimization: {
        splitChunks: {
            chunks: "all",
        },
    },
    output: {
        path: path.resolve(__dirname, "dist/public"),
        filename: "[name]",
    },
};

module.exports = [serverConfig, clientConfig];
