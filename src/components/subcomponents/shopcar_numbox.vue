<template>

    <div class="mui-numbox" data-numbox-min='1' style="height:25px;">
        <button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
        <input id="test" class="mui-input-numbox" type="number" :value="initnum" 
        @change="countChange" ref="numbox" readonly />
        <button class="mui-btn mui-btn-numbox-plus" type="button">+</button>
    </div>


    <!-- 分析：子组件什么时候把 数据传递给父组件 -->
    <!-- 文本框数据被修改的时候 将数据传递给父组件 -->
</template>

<script>
import mui from '../../lib/mui/js/mui.min.js'
export default {
    mounted() {  
    //初始化数字选择框组件
     mui(".mui-numbox").numbox()   
    
    },
    methods:{
        countChange(){
            // 数量改变的时候
            // 每当数量值改变，立即把最新的数量同步到 购物车的store中，覆盖之前的数量值
            this.$store.commit("updateGoodsInfo",{
                id: this.goodsid,
                count: this.$refs.numbox.value
            })
        }
    },
    props:["initnum", "goodsid"]
}
</script>

<style lang="scss" scoped>

</style>