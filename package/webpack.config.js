const path = require("path");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const DtsBundlePlugin = require("dts-bundle-webpack");

let browserOutput = path.resolve(__dirname, 'dist');
let libOutput = path.resolve(__dirname, 'lib');

let baseConfig = {
    entry: './src/mylibrary.ts',
    devtool: 'inline-source-map',
    resolve: {
        extensions: ['.tsx', '.ts', '.js']
    },
}

let browserConfig = {
    ...baseConfig,
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            }
        ]
    },
    output: {
        filename: 'mylibrary.js',
        path: browserOutput,
        library: 'mylibrary',
        libraryTarget: 'umd',
    },
    plugins: [
        new CleanWebpackPlugin(browserOutput)
    ]
};

let nodeConfig = {
    ...baseConfig,
    target: 'node',
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: {
                    loader: 'ts-loader',
                    options: {
                        compilerOptions: {
                            declaration: true,
                            declarationDir: './'
                        }
                    }
                },
                exclude: /node_modules/
            }
        ]
    },
    output: {
        filename: 'mylibrary.js',
        path: libOutput,
        libraryTarget: 'commonjs2',
    },
    plugins: [
        new DtsBundlePlugin({
            name: 'mylibrary',
            main: path.resolve(libOutput, "mylibrary.d.ts"),
            removeSource: true,
            outputAsModuleFolder: true,
        }),
        new CleanWebpackPlugin(libOutput),
    ]
};

module.exports = [browserConfig, nodeConfig];