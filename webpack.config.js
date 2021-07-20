const path = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const {CleanWebpackPlugin} = require("clean-webpack-plugin")

module.exports = {
    entry: "./src/main.js",
    mode: "development",
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "bundle.js"
    },
    devServer: {
        // 运行代码目录
        contentBase: path.resolve(__dirname, "src"),
        // 监听 contentBase 目录下的所有文件，一旦文件变化就会 reload
        watchContentBase: true,
        watchOptions: {
            // 忽略文件
            ignored: /node_modules/
        },
        // gzip 压缩
        compress: true,
        // 端口
        port: 8082,
        // 域名
        host: "localhost",
        // 自动打开浏览器
        open: true,
        // 开始 HMR 功能
        hot: true,
        // 日志等级
        // 不显示启动服务器日志信息
        clientLogLevel: "none",
        // 除了一些基本信息意外，其他内容都不打印
        quiet: true,
        // 出现错误，不全屏提示
        overlay: false,
        // 服务器代理 ----> 解决开发环境跨域问题
        proxy: {
            '/^api': {
                target: "http://localhost:3000",

            }
        }
    },
    module: {
        rules: [
            {
                test: /\.(css|scss|sass)$/,
                use: [
                    'style-loader', 'css-loader'
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./src/grid/demo.html"
        }),
        // 清理 dist 目录下的文件
        new CleanWebpackPlugin()
    ]
}