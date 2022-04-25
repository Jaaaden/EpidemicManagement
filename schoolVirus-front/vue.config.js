"use strict";
const path = require("path");
const defaultSettings = require("./src/settings.js");

function resolve(dir) {
    return path.join(__dirname, dir);
}

const name = defaultSettings.title || "vue Admin Template"; 

const port = process.env.port || process.env.npm_config_port || 9528; // dev port

// https://cli.vuejs.org/config/
module.exports = {
    // https://cli.vuejs.org/config/#publicpath
    publicPath: "/",
    outputDir: "dist",
    assetsDir: "static",
    lintOnSave: false, 
    // lintOnSave: process.env.NODE_ENV === "development",
    productionSourceMap: false,
    devServer: {
        port: port,
        open: true,
        overlay: {
            warnings: false,
            errors: true,
        },
        before: require("./mock/mock-server.js"),
    },
    configureWebpack: {
        name: name,
        resolve: {
            alias: {
                "@": resolve("src"),
            },
        },
    },
    chainWebpack(config) {
        // it can improve the speed of the first screen, it is recommended to turn on preload
        config.plugin("preload").tap(() => [
            {
                rel: "preload",
                // https://github.com/vuejs/vue-cli/blob/dev/packages/@vue/cli-service/lib/config/app.js#L171
                fileBlacklist: [
                    /\.map$/,
                    /hot-update\.js$/,
                    /runtime\..*\.js$/,
                ],
                include: "initial",
            },
        ]);
        
        config.plugins.delete("prefetch");

        config.module.rule("svg").exclude.add(resolve("src/icons")).end();
        config.module
            .rule("icons")
            .test(/\.svg$/)
            .include.add(resolve("src/icons"))
            .end()
            .use("svg-sprite-loader")
            .loader("svg-sprite-loader")
            .options({
                symbolId: "icon-[name]",
            })
            .end();

        config.when(process.env.NODE_ENV !== "development", (config) => {
            config
                .plugin("ScriptExtHtmlWebpackPlugin")
                .after("html")
                .use("script-ext-html-webpack-plugin", [
                    {
                        inline: /runtime\..*\.js$/,
                    },
                ])
                .end();
            config.optimization.splitChunks({
                chunks: "all",
                cacheGroups: {
                    libs: {
                        name: "chunk-libs",
                        test: /[\\/]node_modules[\\/]/,
                        priority: 10,
                        chunks: "initial", 
                    },
                    elementUI: {
                        name: "chunk-elementUI", 
                        priority: 20, 
                        test: /[\\/]node_modules[\\/]_?element-ui(.*)/, 
                    },
                    commons: {
                        name: "chunk-commons",
                        test: resolve("src/components"), 
                        minChunks: 3, 
                        priority: 5,
                        reuseExistingChunk: true,
                    },
                },
            });
            // https:// webpack.js.org/configuration/optimization/#optimizationruntimechunk
            config.optimization.runtimeChunk("single");
        });
    },
};
