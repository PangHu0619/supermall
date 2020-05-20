<template>
  <div id="detail">
    <detail-nav class="detail-nav" @titleClick="titleClick" ref="detialnav"></detail-nav>
    <scroll class="content" ref="scroll" :probe-type="3" @scroll="contentScroll">
      <detail-swiper :images = "topImage"></detail-swiper>
      <detail-base-info :goods = "goods"></detail-base-info>
      <detail-shop-info :shop = "shop"></detail-shop-info> 
       <!-- <detail-goods-info :detail-info ="detailInfo" @imageLoad="imageLoad"></detail-goods-info>  -->
      <detail-param-info :paramInfo = "paramInfo" ref="param"></detail-param-info> 
     <detail-comment-info :commentInfo="commentInfo" ref="comment"></detail-comment-info> 
    <good-list :goods = "recommend" @imageLoad="imageLoad" ref="recommend"></good-list> 
    </scroll>
    <detail-bottom-bar @addToCart="addCar"></detail-bottom-bar>
    <back-top @click.native="backtop" v-show = "isShowBackTop"></back-top>
    <toast :message="message" :isShow = "show"></toast>
  </div>
</template>

<script>
import detailNav from './childComps/DetailNavBar'
import DetailSwiper from './childComps/DetailSwiper'
import DetailBaseInfo from './childComps/DetailBaseInfo'
import DetailShopInfo from './childComps/DetailShopInfo'
import DetailGoodsInfo from './childComps/DetailGoodsInfo'
import DetailParamInfo from './childComps/DetailParamInfo'
import DetailCommentInfo from './childComps/DetailCommentInfo'
import DetailBottomBar from './childComps/DetailBottomBar'

import GoodList from 'components/content/goods/GoodList'
import Scroll from 'components/common/scroll/Scroll'
import BackTop from 'components/content/backTop/BackTop'
import Toast from 'components/common/toast/Toast'

import {getDetail,Goods,Shop,GoodsParam,getRecommend} from 'network/detail'
import {itemListerMixin,backTopMixin} from 'common/mixin'
import {debounce} from 'common/utils'
import {mapActions} from 'vuex'

export default {
  name: 'detail',
  data(){
    return {
      iid:null,
      topImage:[],
      goods:{},
      shop:{},
      detailInfo:{},
      paramInfo:{},
      commentInfo:{},
      recommend:[],
      themeTopYs:[],
      getThemeTopY:null,
      currentIndex: 0,
      isShowBackTop:false,
      message:'',
      show:false
    }
  },
  created () {
    // 获取路由传递的参数iid
    this.iid = this.$route.params.iid
    // console.log(this.$route.params.iid)

    // 根据iid请求详情数据
    getDetail(this.iid).then(res =>{
      // 获取顶部图片
      const data = res.result
      this.topImage = data.itemInfo.topImages
      // 
      // console.log(res)
      // 获取商品信息
      this.goods = new Goods(data.itemInfo,data.columns,data.shopInfo.services)
      // console.log(this.goods)

      // 创建店铺信息
      this.shop = new Shop(data.shopInfo)

      //保存商品详情
      this.detailInfo = data.detailInfo
      // console.log(data.detailInfo)

      // 获取商品属性
      this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)

      // 获取评论信息
      if(data.rate.cRate !==0){
        this.commentInfo = data.rate.list[0]
      }

      // created回调函数
      this.$nextTick(() =>{
        
      this.themeTopYs =  []
      this.themeTopYs.push(0)
      this.themeTopYs.push(this.$refs.param.$el.offsetTop-44)
      this.themeTopYs.push(this.$refs.comment.$el.offsetTop-44)
      this.themeTopYs.push(this.$refs.recommend.$el.offsetTop-44)
      // 传入一个最大值
      this.themeTopYs.push(Number.MAX_VALUE)
      
      console.log(this.themeTopYs)
      })
    })

    getRecommend().then(res => {
      this.recommend = res.data.list
    })

    this.getThemeTopY = debounce(() =>{
      
    })
  },
  mounted () { 
    
  },
  methods: {
    // mapActions映射 
    ...mapActions(['addCars']),
    // 图片加载完刷新
    imageLoad(){
      this.$refs.scroll.refresh()
    },

    // 拖动页面，导航栏跟随变化
    contentScroll(position){
      //  console.log(position)
      const positionY = -position.y
      let length = this.themeTopYs.length
      for(let i = 0;i<length-1;i++){
        // if(this.currentIndex !== i && ((i<length-1 && positionY >=this.themeTopYs[i] && positionY < this.themeTopYs[i+1])||(i === length-1 && positionY > this.themeTopYs[i]))){
        //   this.currentIndex = i
          // 
          if(this.currentIndex !== i && (positionY > this.themeTopYs[i] && positionY < this.themeTopYs[i+1])){
            this.currentIndex = i
            this.$refs.detialnav.currentIndex = this.currentIndex
           
          }
          
        }

      // 是否回到顶部
       -position.y>1000? this.isShowBackTop = true:this.isShowBackTop = false
    },
    titleClick(index){
      // console.log(index)
      this.$refs.scroll.scrollTo(0,-this.themeTopYs[index],200)
    },

    // 返回顶部
    backtop(){
      this.$refs.scroll.scrollTo(0,0,500)
    },

    // 加入购物车事件
    addCar(){
      // 获取购物车展示的信息
      const product = {}
      product.image = this.topImage[0]
      product.title = this.goods.title
      product.desc = this.goods.desc
      product.price = this.goods.realPrice
      product.iid = this.iid

      // this.$store.dispatch('addCars',product).then(res =>{
      //   console.log(res)
      // 
      this.addCars(product).then(res =>{
         this.$toast.show(res,1100)
        
      })
    }
  },
  deactivated () {
     this.$bus.$off('itemImageLoad',this.homeItemListener)
  },
  components: {
    detailNav,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    Scroll,
    GoodList,
    DetailBottomBar,
    Toast
  
  },
  mixins: [itemListerMixin,backTopMixin]
}
</script>

<style scoped>
  #detail{
    position: absolute;
    z-index: 9;
    background-color: #fff;
    height: 100vh;
  }
  .content{

    height: calc(100% - 44px - 58px);
    /* background-color:red; */
    /* background-color:red; */
    /* background-color: red; */
  }
  .detail-nav{
    position: relative;
    z-index: 9;
   
  }
</style>