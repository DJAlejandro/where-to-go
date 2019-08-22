const path = require('path')
function resolve(dir) {
    return path.join(__dirname, dir)
}
module.exports = {
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
    },
    configureWebpack: config => {
        config.resolve = {
            extensions: ['.js', '.vue', '.json', ".css"],
            alias: {
                'vue$': 'vue/dist/vue.esm.js',
                '@': resolve('src'),
                'styles': resolve('src/assets/styles')
            }
        }
    },
}
