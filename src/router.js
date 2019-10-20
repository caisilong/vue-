import VueRouter from 'vue-router'

// 导入对应的路由组件
import HomeContainer from './components/tabbar/HomeContainer.vue'
import MemberContainer from './components/tabbar/MemberContainer.vue'
import SearchContainer from './components/tabbar/SearchContainer.vue'
import ShopcarContainer from './components/tabbar/ShopcarContainer.vue'
import NewList from './components/news/NewList.vue'
import NewsInfo from './components/news/NewsInfo.vue'
import PhotoList from './components/photos/PhotoList.vue'


var router = new VueRouter({
    routes:[ //配置路由规则
        { path:'/', redirect:'/home'},
        { path:'/home', component:HomeContainer},
        { path:'/member', component:MemberContainer},
        { path:'/shopcar', component:ShopcarContainer},
        { path:'/search', component:SearchContainer},
        { path:'/home/newlist', component: NewList},
        { path:'/home/newsinfo/:id', component: NewsInfo},
        { path:'/home/photolist', component:PhotoList}
    ],
    linkActiveClass:'mui-active' //覆盖原来的类  router-link active
})

// 把路由对象暴露出去
export default router