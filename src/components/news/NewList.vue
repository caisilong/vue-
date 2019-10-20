<template>
    <div>
        
        <ul class="mui-table-view">
            <li class="mui-table-view-cell mui-media" v-for="item in newsList" :key="item.id">
                <router-link :to="'/home/newsinfo/' + item.id ">
                    <img class="mui-media-object mui-pull-left" :src="item.img_url">
                    <div class="mui-media-body">
                        <h1> {{ item.title }} </h1>
                        <p class='mui-ellipsis'>
                            <span>发表时间: {{ item.add_time | dataFormat }} </span>
                            <span>点击: {{ item.click }}次 </span>
                        </p>
                    </div>
                </router-link>
            </li>
        </ul>
    </div>
</template>

<script>
import { Toast } from "mint-ui"
export default {
    data(){
        return{
            newsList:[]  //新闻列表
        }
    },
    created(){
        this.getNewList()
    },
    methods:{
        getNewList(){
            // 获取新闻列表数据
            this.$http.get('api/getnewslist').then(result => {
                if(result.body.status == 0){
                    // 如果没有失败   就把数据保存到data中
                    this.newsList = result.body.message
                }else{
                    Toast("列表数据加载失败")
                }
            })
        }
    }
}
</script>

<style lang="scss" scoped>
    .mui-table-view{
        li{
            h1{
                font-size:14px;
            }
        }
        .mui-ellipsis{
            color:#226aff;
            font-size:12px;
            display:flex;
            justify-content:space-between;
        }
    }
</style>