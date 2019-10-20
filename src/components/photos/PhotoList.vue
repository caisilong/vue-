<template>
    <div>
        <!-- 顶部滑动条区域 -->
        <div id="slider" class="mui-slider">
            <div id="sliderSegmentedControl" class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted">
                <div class="mui-scroll">
                    <a :class="['mui-control-item',item.id == 0 ? 'mui-active' : '']" 
                    v-for="item in cates" :key="item.id" @click="getPhotoListByCateId(item.id)">
                        {{ item.title }}
                    </a>
                    
                </div>
            </div>

        </div>

        <!-- 图片列表区域 -->
        <ul class="photo-list">
            <li v-for="item in list" :key="item.id">
                <img v-lazy="item.img_url">
                <div class="info">
                    <div class="info-title">{{ item.title }}</div>
                    <div class="info-body">{{ item.zhaiyao }}</div>
                </div>
            </li>
        </ul>

    </div>
</template>

<script>
// 1.导入mui的js文件
import mui from '../../lib/mui/js/mui.min.js'

import { Toast } from 'mint-ui'
export default {
    data(){
        return {
            cates:[],  // 所有分类的数组
            list:[] //放置图片的数组
        }
    },
    created(){
        this.getAllCategory()

        // 默认进入页面，就主动请求 所有图片列表数据
        this.getPhotoListByCateId(0)
    },
    mounted(){ //当组件中的DOM结构被渲染好，并放到页面中的时候，会执行这个钩子函数
        //如果要操作元素了  最好在mounted ，因为这个时候的 DOM元素 是最新的  
        // 2.使用官方方法初始化scroll控件
        mui('.mui-scroll-wrapper').scroll({
            deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
        });
    },
    methods:{
        getAllCategory(){ //获取所有的图片分类
            this.$http.get('api/getimgcategory').then( result => {
                if(result.body.status === 0 ){
                    //手动拼接处一个最完整的 分类列表
                    result.body.message.unshift({ title:"全部",id: 0 })
                    this.cates = result.body.message
                }else{
                    Toast('获取图片数据失败！')
                }
            })
        },
        getPhotoListByCateId(cateId){
            // 根据 分类ID 获取图片列表
            this.$http.get('api/getimages/' + cateId).then( result => {
                if( result.body.status === 0 ){
                    this.list = result.body.message
                }else{
                    Toast('获取图片数据失败！')
                }
            })
        }
    }
}
</script>

<style lang="scss" scoped>
*{
    touch-action:pan-y;
}
.photo-list{
    list-style: none;
    margin:0;
    padding:10px;
    padding-bottom:0;
    li{
        background-color:#ccc;
        text-align:center;
        margin-bottom:10px;
        box-shadow: 0 0 9px #999;
        position:relative;
    }
    img{
        width:100%;
        // 处理图片3像素问题
        vertical-align:middle;
    }
    
    // 懒加载图片
    img[lazy=loading] {
        width: 40px;
        height: 300px;
        margin: auto;
    }

    .info{
        position:absolute;
        bottom:0;
        color:white;
        text-align:left;
        background-color: rgba(0,0,0,0.4);
        max-height:84px;
        .info-title{
            font-size:14px;
        }
        .info-body{
            font-size:13px;
        }
    }
}

</style>