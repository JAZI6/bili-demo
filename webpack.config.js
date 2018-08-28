const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');
const path = require('path');
//  /根目录   ./当前目录  ../上一个目录，最好只用后两个，/的话万一上传到的服务器位置不是根目录就容易出错
module.exports = {
    entry: "./src/js/main.js",  //模块的入口文件，可以配置alias省略一些东西
    output: {
        filename: "[name].js",  //打包后输出文件的文件名
        path: __dirname + '/dist'   //打包后的文件存放的地方;注："__dirname"是node.js中的一个全局变量，它指向当前执行脚本所在的目录，仅绝对路径
    },
    //配置所有和路径相关的参数，基本要么和__dirname相关要么和打包输出路径相关，不懂时往这上面想，即先进再进，没有就创建
    module: {
        rules: [
            {
                test:/\.js$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ["env"]
                    }
                },
                exclude: path.resolve(__dirname,'node_modules')
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin('dist'),   //__dirname，参数
        new HtmlWebpackPlugin({
            filename: 'index.html',  //打包输出路径，参数
            template:'src/component/index.html',　　//__dirname，参数，为新生成的index.html指定模版
            hash: true,
            minify:{ //压缩HTML文件
                removeComments:true,    //移除HTML中的注释
                collapseWhitespace:false    //删除空白符与换行符
            }
        }),
        new CopyWebpackPlugin([
            {
                from: __dirname + '/src/img',
                to: __dirname + '/dist/img'
            },
            {
                from: __dirname + '/src/css',
                to: __dirname + '/dist/css'
            }
        ]),
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
            jquery: "jquery",
            "window.jQuery": "jquery"
        }),
        //new BundleAnalyzerPlugin()
    ],
    // webpack4里面移除了commonChunksPulgin插件，放在了config.optimization里面,提取js， vendor名字可改
    optimization: {
        splitChunks: {
            cacheGroups: {
                vendor: {
                    // test: /\.js$/,
                    test: /[\\/]node_modules[\\/]/,
                    chunks: "initial", //表示显示块的范围，有三个可选值：initial(初始块)、async(按需加载块)、all(全部块)，默认为all;
                    name: 'js/vendor', //拆分出来块的名字(Chunk Names)，默认由块名和hash值自动生成；
                    enforce: true
                }
            }
        },
        runtimeChunk: {
            name: 'js/runtime'
        }
    }
};