<template>
    <div class="newsinfo-container">
        <!-- 标题 -->
        <h3 class="title"> {{ newsInfo.title }} </h3>
        <!-- 子标题 -->
        <p class="subtitle">
            <span>发表时间: {{ newsInfo.add_time}} </span>
            <span>点击: {{ newsInfo.click }} 次</span>
        </p>
        <hr/>

        <!-- 内容区域 -->
        <div class="content" v-html="newsInfo.content" ></div>

        <!-- 评论子组件区域 -->
        <comment-box :id='this.id'></comment-box>
    </div>
</template>

<script>
import { Toast } from 'mint-ui'
// 1.导入评论子组件
import comment from '../subcomponents/comment.vue'

export default {
    data(){
        return {
            id: this.$route.params.id,   //把URL地址传递过来的 id值 挂载到data中 方便以后以后调用
            newsInfo:[]  //新闻对象
        }
    },
    created(){
        this.getNewsInfo()
    },
    methods:{
        getNewsInfo(){
            this.$http.get('api/getnew/' + this.id ).then( result => {
                if( result.body.status === 0){
                    this.newsInfo = result.body.message[0]
                }else{
                    Toast('获取新闻数据失败！')
                }
            })
        }
    },
    components:{  //用于注册子组件
        'comment-box': comment
    }

}
</script>

<style lang="scss">
.newsinfo-container{
    padding: 0 4px;
    .title{
        font-size: 16px;
        color:darkred;
        text-align:center;
        margin:15px 0;
    }
    .subtitle{
        font-size:13px;
        color:#226aff;
        display:flex;
        justify-content: space-between;
    }
    .content{
        img{
            width:100%;
        }
    }
}
</style>