<template>
    <div class="photoinfo-container">
        <h3>{{ photoinfo.title }}</h3>
        <p class="subtitle">
            <span>发表时间：{{ photoinfo.add_time | dataFormat }}</span>
            <span>点击：{{ photoinfo.click }}次</span>
        </p>

        <hr>

        <!-- 图片缩略图区域 -->
        <vue-preview :slides="thumbsList" @close="handleClose" class="imgPrev"></vue-preview>

        <!-- 图片内容区域 -->
        <div class="content" v-html="photoinfo.content"></div>

        <!-- 放置一个现陈的评论子组件 -->
        <cmt :id="id" class="photoinfo-container"></cmt>
    </div>
</template>

<script>
import { Toast } from 'mint-ui'

// 1.导入评论子组件
import comment from '../subcomponents/comment.vue'

export default {
    data(){
        return {
            id: this.$route.params.id,  //从路由中获取到图片的 id
            photoinfo:{}, //图片详情
            thumbsList: [] //图片缩略图的数组
        
        }
    },
    created(){
        this.getPhotoInfo()
        this.getTumbs()
    },
    methods:{
        getPhotoInfo(){  //获取图片的详情
            this.$http.get('api/getimageInfo/' + this.id).then( result => {
                if( result.body.status === 0 ){
                    this.photoinfo = result.body.message[0]
                }else{
                    Toast('获取图片详情失败')
                }
            })
        },
        handleClose () {
        console.log('close event')
        },
        getTumbs(){ //获取缩略图
            this.$http.get('api/getthumimages/' + this.id).then( result =>{
                if(result.body.status === 0 ){
                    //循环每个图片的数据，补全图片的宽和高
                    result.body.message.forEach( item => {
                        item.w = 600;
                        item.h = 400;
                        item.src = item.src;  //大图
                        item.msrc = item.src;  //小图
                    })

                    // 把完整的数据保存到thumbsList中
                    this.thumbsList = result.body.message
                }else{
                    Toast('获取图片详情失败')
                }
            })
        }
    },
    components:{
        'cmt':comment
    }
}
</script>

<style lang="scss" >
.photoinfo-container{
    padding:3px;
    h3{
        color:#26A2ff;
        font-size:15px;
        text-align:center;
        margin:15px 0;
    }
    .subtitle{
        display: flex;
        justify-content: space-between;
        font-size:13px;
    }
    .content{
        font-size:13px;
        line-height: 30px;
    }
    .imgPrev{
        .my-gallery{
                figure{
                    display: inline-block;
                    margin: 8px;
                }
                img{
                    width: 80px;
                    height: 60px;
                }
            }
        }
    .photoinfo-container h3 {
        z-index:999;
        color:#000;
        font-size: 18px;
        text-align: left;
        margin: 15px 0;
        line-height: 1;
        margin-top: 5px;
        margin-bottom: 5px;
    }        
                    
            
}

</style>