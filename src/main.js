// 项目入口文件
import Vue from 'vue'

// 导入mint-ui的样式
import './lib/mui/css/mui.min.css'




// 按需导入  mint-ui的组件
import {Header} from 'mint-ui'
Vue.component(Header.name,Header)



// 导入app.vue组件
import app from'./app.vue'

var vm = new Vue({
    el:'#app',
    data:{},
    render: c=>c(app)
})
