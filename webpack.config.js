
var path = require('path')
var htmlWebpackPlugin = require('html-webpack-plugin')

// // 当以命令行形式运行 webpack 或 webpack-dev-server 的时候，
// 工具会发现，我们并没有提供 要打包 的文件的 入口 和 出口文件，
// 此时，他会检查项目根目录中的配置文件，并读取这个文件，就拿到了导出的这个 配置对象，然后根据这个对象，进行打包构建
module.exports = {
    entry: path.join(__dirname, './src/main.js'),   //入口
    output: {   //出口
        path: path.join(__dirname, './dist'),  //指定输出路径
        filename:'bundle.js'         //指定输出文件
    },
    plugins: [
        new htmlWebpackPlugin({
            template: path.join(__dirname,'./src/index.html'),
            filename:'index.html'
        })
    ],
    module:{
        rules:[
            { test:/\.css$/, use: ['style-loader','css-loader']},
            { test:/\.less$/, use:['style-loader','css-loader','less-loader']},
            { test:/\.scss$/, use:['style-loader','css-loader','sass-loader']},
            { test:/\.(jpg|png|jpeg|gif)$/, use:'url-loader?limit=7631&name=[hash:8]-[name].[ext]'},  //处理图片路径的loader
            // limit 给定的值，是图片的大小，单位是 byte， 如果我们引用的 图片，
            //大于或等于给定的 limit值，则不会被转为base64格式的字符串， 如果 图片小于给定的 limit 值，
            // 则会被转为 base64的字符串
            { test:/\.(ttf|woff|woff2|eot|svg)$/, use:'url-loader'},
            //处理字体的loader
            { test: /\.js$/, use: 'babel-loader', exclude: /node_modules/}, //配置babel来转换高级的JS语法
            { test: /\.vue$/, use:'vue-loader'} //处理.vue文件的loader
        ]
    },
    resolve:{
        alias:{ //修改 vue 被导入时候的包的路径
            // "vue$":"vue/dist/vue.js"
        }
    }

}