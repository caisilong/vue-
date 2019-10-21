<template>
    <div class="goodsinfo-container">

        <transition
        @before-enter="beforeEnetr"
        @enter="enter"
        @after-enter="afterEnter">
            <div class="ball" v-show="ballFlag" ref="ball"></div>
        </transition>

        <!-- 商品轮播图区域 -->
        <div class="mui-card">
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                   <swiper :lunbotulist="lunbotu" :isfull="false"></swiper>
                </div>
            </div>
        </div>
        
        <!-- 商品购买区域 -->
        <div class="mui-card">
            <div class="mui-card-header">{{ goodsinfo.title }}</div>
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <p class="price">
                        市场价：<del>￥{{ goodsinfo.market_price }}</del>&nbsp;&nbsp;<span class="now-price">
                        销售价:￥{{ goodsinfo.sell_price }}</span>
                    </p>
                    <p>购买数量：<numbox @getcount="getSelectedCount" 
                    :max="goodsinfo.stock_quantity"></numbox></p>
                    <p>
                        <mt-button type="primary" size="small">立即购买</mt-button>
                        <mt-button type="danger" size="small" @click="addToShopCar">加入购物车</mt-button>

                        <!-- 分析：如何实现加入购物车，拿到 选择的数量 -->
                        <!-- 1.经过分析发现：按钮属性于 goodsinfo页面，数字 属于 number组件-->
                        <!-- 2.由于涉及到了父子组件的嵌套了，所以，无法直接在 goodsinfo 页面中获取
                         到 选中的商品数量值-->
                        <!-- 3.怎么解决这个问题：涉及到了子组件向父组件传值了（事件调用机制） -->
                        <!-- 4.事件调用的本质：父组件向子组件传值，子组件调用这个方法，同时把 数据当作
                        参数 传递给这个方法 -->
                    </p>
                </div>
            </div>
            
		</div>

        <!-- 商品参数区域 -->
        <div class="mui-card">
            <div class="mui-card-header">商品参数</div>
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <p>商品货号：{{ goodsinfo.goods_no }}</p>
                    <p>库存情况：{{ goodsinfo.stock_quantity }} 件</p>
                    <p>上架时间：{{ goodsinfo.add_time | dataFormat }}</p>
                </div>
            </div>
            <div class="mui-card-footer">
                <mt-button type="primary" size="large" plain @click="getDesc(id)">图文介绍</mt-button>
                <mt-button type="danger" size="large" plain @click="getComment(id)">商品评论</mt-button>
            </div>
		</div>



    </div>
</template>

<script>
import { Toast } from 'mint-ui'
// 导入轮播图组件
import swiper from '../subcomponents/swiper.vue'
// 导入数字选择框组件
import numbox from '../subcomponents/goodsinfo_numbox.vue'
export default {
    data(){
        return{
            id:this.$route.params.id, //将路由对象中的id挂载到 id上，方便后期使用
            lunbotu:[],  //轮播图的数据
            goodsinfo:{},  //获取到商品的信息
            ballFlag:false, //控制小球隐藏和显示
            selectedCount:1  //保存用户选中的商品数量，默认，认为用户买1个
        }
    },
    created(){
        this.getLunbotu()
        this.getGoodsInfo()
    },
    methods:{
        getLunbotu(){
            this.$http.get('api/getthumimages/' + this.id).then( result =>{
                if(result.body.status === 0){
                    // 先循环轮播图数组中的每一项，为item添加img属性
                    // 因为 轮播图组件中，只认识item.img，不认识 item.src
                    result.body.message.forEach( item => {
                        item.img = item.src
                    })
                    this.lunbotu = result.body.message
                }else{
                    Toast('获取商品信息失败！')
                }
            })
        },
        getGoodsInfo(){
            // 获取商品的信息
            this.$http.get('api/goods/getinfo/' + this.id).then( result => {
                if(result.body.status === 0 ){
                    this.goodsinfo = result.body.message[0]
                }else{
                    Toast('商品数据获取失败！')
                }
            })
        },
        getDesc(id){
            // 点击使用编程式导航跳转到 图文介绍
            this.$router.push({ name:'goodsdesc', params: { id }})
        },
        getComment(id){
            // 点击使用编程式导航跳转到 评论页面
            this.$router.push({ name:'goodscomment',params:{ id }})
        },
        addToShopCar(){
            // 添加到购物车
            this.ballFlag = !this.ballFlag
        },
        // 半场动画
        beforeEnetr(el){
            el.style.transform = " translate(0,0)"
        },
        enter(el,done){
            el.offsetWidth

            // 小球动画优化思路：
            // 1.先分析导致动画不准确的本质原因：我把小球最终位移到的位置，已经局限在了某一分辨率
            // 下的 滚动条未滚动的情况下；
            // 2.只要分辨率和 测试的时候不一样，或者 滚动条有一定的距离之后，问题就出现了；
            // 3.因此，我经过分析，得出结论：不能把 位置的 横纵坐标 直接写死，而是应该 根据不同的
            // 情况，动态计算这个坐标值；
            // 4.经过分析，得出解题思路：先得到 徽标的横纵坐标，再得到小球的横纵坐标，然后让 y值 求差
            // x值 求差，得到的结果，就是横纵坐标要位移的距离
            // 5.如何 获得徽标和小球的 位置？  使用domObject.getBoundingClientRect()

            // 获取小球在页面的位置
            const ballPosition = this.$refs.ball.getBoundingClientRect();
            // 获取 徽标 在页面中的位置
            const badgePosition = document.getElementById('badge').getBoundingClientRect()

            const xDist = badgePosition.left - ballPosition.left
            const yDist = badgePosition.top - ballPosition.top

            el.style.transform = `translate(${xDist}px, ${yDist}px)`
            el.style.transition = " all 0.4s cubic-bezier(.4,-0.3,1,.68)"
            done()
        },
        afterEnter(el){
            this.ballFlag = !this.ballFlag
        },
        getSelectedCount(count){
             // 当子组件把 选中的数量传递给父组件的时候，把选中的值保存到 data 上
            this.selectedCount = count
            console.log('值为：' + this.selectedCount)
        }
    },
    components:{
        swiper,
        numbox
    }
}
</script>

<style lang="scss" scoped>
.goodsinfo-container{
    background-color:#eee;
    overflow:hidden;
    .now-price{
        color:red;
        font-size:16px;
        font-weight: bold;
    }
    .mui-card-footer{
    display: block;
    button{
        margin:15px 0;
    }
    }
    .ball{
        width:15px;
        height: 15px;
        border-radius: 50%;
        background-color: red;
        position:absolute;
        z-index:99;
        top:408px;
        left:149px;

    }
}

</style>