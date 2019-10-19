// 项目入口文件
import Vue from 'vue'
// 1.1导入路由模块
import VueRouter from 'vue-router'
// 1.2安装路由
Vue.use(VueRouter)
// 1.3有现成的路由对象，把自己的router.js路由模块导入
import router from './router.js'

// 2.1导入vue-resource
import VueRescource from 'vue-resource'
// 2.2安装vue-rescource
Vue.use(VueRescource)


// 导入mint-ui的样式
import './lib/mui/css/mui.min.css'
import './lib/mui/css/icons-extra.css'

// 按需导入  mint-ui的组件
import {Header,Swipe, SwipeItem} from 'mint-ui'
Vue.component(Header.name,Header)
Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);

// 导入app.vue组件
import app from'./app.vue'


var vm = new Vue({
    el:'#app',
    data:{},
    render: c=>c(app),
    router   //1.4挂载路由对象到vm实例
})
