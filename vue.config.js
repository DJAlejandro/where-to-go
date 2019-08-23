const path = require('path')
function resolve(dir) {
    return path.join(__dirname, dir)
}
const webpack = require("webpack")
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');
const InlineManifestWebpackPlugin = require('inline-manifest-webpack-plugin');
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
module.exports = {
    lintOnSave: process.env.NODE_ENV !== 'production',
    productionSourceMap: false,
    devServer: {
        proxy: {
            '/api': {
                target: 'http://localhost:80',
                pathRewrite: {
                    '^/api': '/api'
                }
                // target: 'http://localhost:8080',
                // changeOrigin: true,
                // pathRewrite: {
                //     '^/api': 'mock'
                // }
            }
        },
        // port: 8080
        quiet: true, //// 不显示 devServer 的 Console 信息，让 FriendlyErrorsWebpackPlugin 取而代之
        open: true,
        hot: true,
        hotOnly: true,
        overlay: true,
        compress: true,
        watchOptions: {
            ignored: /node_modules/,
            aggregateTimeout: 600, //当第一个文件更改，会在重新构建前增加延迟。这个选项允许 webpack 将这段时间内进行的任何其他更改都聚合到一次重新构建里。以毫秒为单位   
            poll: 2000 //轮询间隔，specifying a poll interval in milliseconds
        }
    },

    chainWebpack: config => {
        config.resolve.extensions
            .merge(['scss', 'sass', '.js', '.vue', '.json', ".css", "styl"])
        config.resolve.alias
            .set('@', resolve('src'))
            .set('styles', resolve('src/assets/styles'))
            .set('vue$', 'vue/dist/vue.esm.js')
        // 生产环境
        if (process.env.NODE_ENV === 'development') {
            config.optimization.removeAvailableModules(false)
            config.optimization.removeEmptyChunks(false)
            config.optimization.splitChunks(false)
            config.output.pathinfo(false)
        }
        //开发环境
        if (process.env.NODE_ENV === 'production') {
            config.output
                .filename("js/[name].[chunkhash:5].js")
                .chunkFilename("js/[name]-chunk.[chunkhash:5].js")

            config.module
                .rule('fonts')
                .use('url-loader')
                .tap(options => {
                    options.limit = 8 * 1024
                    let fallback = options.fallback.options
                    fallback.outputPath = "assets/"
                    fallback.name = "fonts/[name]-[hash:5].[ext]"
                    fallback.publicPath = "../assets/"
                    return options
                })
            config
                .plugin('css-assets')
                .use(OptimizeCSSAssetsPlugin);
        }

        config.optimization.runtimeChunk('single')
        config.optimization.usedExports(true)
        config.optimization.sideEffects(true)
        config.optimization.splitChunks({
            cacheGroups: {
                vendors: {
                    test: /(axios|better-scroll|core-js|swiper|fastclick)/,
                    name: 'vendors',
                    chunks: 'all',
                    priority: 100,
                },
                asyncs: { // 异步加载公共包、组件等
                    chunks: 'async',
                    name: 'async-commons',
                    priority: 80,
                },
                commons: { // 其他同步加载公共包
                    chunks: 'initial',
                    name: 'common',
                    reuseExistingChunk: true,
                    priority: 70,
                },
                styles: {
                    name: 'styles',
                    test: /\.(scss|css|stylus)$/,
                    chunks: 'all',
                    minChunks: 1,
                    reuseExistingChunk: true,
                    enforce: true
                }
            }
        })
        config.module
            .rule('sass')
            .include
            .add(path.resolve(__dirname, "./src"))
            .end()

        config.module
            .rule('scss')
            .include
            .add(path.resolve(__dirname, "./src"))
            .end()

        config
            .plugin('html')
            .tap(args => {
                args[0].filename = "index.html"
                args[0].template = "./public/index.html"
                args[0].title = "webpack"
                args[0].favicon = "./public/favicon.ico"
                args[0].minify = {
                    collapseWhitespace: true, //删除空格，但是不会删除SCRIPT、style和textarea中的空格
                    collapseBooleanAttributes: true, //省略只有boolean值的属性值,比如：readonly checked
                    keepClosingSlash: true, //在单例元素上保留尾部斜杠
                    minifyJS: true, //是否压缩html里的js（使用uglify-js进行的压缩
                    minifyCSS: true, //是否压缩html里的css（使用clean-css进行的压缩）
                    minifyURLs: true,
                    removeComments: true, // 删除注释，但是会保留script和style中的注释
                    removeRedundantAttributes: true, //HTML 4.01中的某些属性具有默认值,删除多余的属性
                    removeEmptyAttributes: true, // 删除空（或空白）属性
                    removeScriptTypeAttributes: true, //从脚本标签中删除type="text/javascript"
                    removeStyleLinkTypeAttributes: true, //从style和link标签中删除type="text/css"
                    sortAttributes: true, //按频率对属性排序
                    sortClassName: true, //按频率对class排序
                    useShortDoctype: true, //如果文档被定义为除HTML5之外的任何内容（例如HTML 4.01）,现有的doctype被替换为它短的（HTML5）中译本<!DOCTYPE html>
                }
                return args
            })
        config
            .plugin('asset-html')
            .use(AddAssetHtmlPlugin, [{
                filepath: path.resolve(__dirname, './dll/*.dll.js')
            }])
        config
            .plugin('dll')
            .use(webpack.DllReferencePlugin, [{
                manifest: require("./dll/vue-manifest.json")
            }])
        config
            .plugin('inline-manifest')
            .use(InlineManifestWebpackPlugin)

        config.plugins.delete("optimize-css")

    },
    css: {
        sourceMap: process.env.NODE_ENV !== 'production'
    }
}
