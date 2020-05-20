<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <tab-control :titles="['流行','新款','精选']" 
                    class="tab-control" 
                    @tabClick="tabClick" 
                    ref = "tabcontrol1"
                    v-show="ifTabFixed"
                    ></tab-control>
    <scroll class="content" 
            ref="scroll" 
            :probe-type = "3" 
            @scroll = "contentScroll" 
            :pull-up-load = "true"
            @pullingUp = "loadMore">
      <home-swiper :banners = "banners" @swiperImageLoad="swiperImageLoad"></home-swiper>
      <recommend-view :recommends='recommends'></recommend-view>
      <feature-view></feature-view>
      <tab-control :titles="['流行','新款','精选']"  
                    @tabClick="tabClick" 
                    ref = "tabcontrol2"
                    :class="{fixed:ifTabFixed}"></tab-control>
      <good-list :goods="showGoods"></good-list>
    </scroll>
    <!-- 监听组件原生事件时，必须添加native属性-->
    <back-top @click.native="backtop" v-show = "isShowBackTop"></back-top>

  </div>
</template>

<script>

import HomeSwiper from './childComps/HomeSwiper'
import RecommendView from './childComps/RecommerView'
import FeatureView from './childComps/FeatureView'

import NavBar from 'components/common/navbar/NavBar'
import TabControl from 'components/content/tabControl/TabControl'
import GoodList from 'components/content/goods/GoodList'
import Scroll from 'components/common/scroll/Scroll'
import BackTop from 'components/content/backTop/BackTop'


import {getHomeMultidata, getHomeGoods} from '../../network/home'
import {debounce} from 'common/utils'
import {itemListerMixin,backTopMixin} from 'common/mixin'

export default {
  components: {
    HomeSwiper,
    RecommendView,
    FeatureView,
    NavBar,
    TabControl,
    GoodList,
    Scroll,
    BackTop,
    
  },
  data(){
    return {
      recommends:[],
      banners:[],
      goods:{
        'pop':{page:0,list:[]},
        'new':{page:0,list:[]},
        'sell':{page:0,list:[]},
      },
      currentType:'pop',
      isShowBackTop:false,
      tabOffsetTop:0,
      ifTabFixed:false,
      saveY:0,
     
    }
  },
  mixins: [itemListerMixin,backTopMixin],
  created() {
    // 1请求数据
    this.getHomeMultidata(),

    this.getHomeGoods('pop'),
    this.getHomeGoods('new'),
    this.getHomeGoods('sell')

    // 接受图片加载事件
    
  },
  mounted () {

    // 图片加载完的事件监听
    // const refresh = debounce(this.$refs.scroll.refresh,0)


    // this.ItemListener = () =>{
    //   refresh()
    // }
    // this.$bus.$on('itemImageLoad',this.ItemListener)

    // setTimeout(() =>{
    //   console.log(this.$refs.tabcontrol.$el.offsetTop)
    // },6000)
    // 获取tabcontrol的offsettop
    
  },
  methods: {
    //事件监听
    tabClick(index){
      switch(index){
        case 0:
          this.currentType = 'pop'
          break
        case 1:
          this.currentType = 'new'
          break
        case 2:
          this.currentType = 'sell'
          break
      }
      this.$refs.tabcontrol1.currentIndex = index
      this.$refs.tabcontrol2.currentIndex = index
    },
    // 单击返回最上层层
    
    // 判断返回顶部组件是否出现
    contentScroll(position){
      // 判断backtop是否出现
      -position.y>1000? this.isShowBackTop = true:this.isShowBackTop = false

      // 判断tabcontrol是否需要吸顶
      this.ifTabFixed = (-position.y) > this.tabOffsetTop


    },
    
    // 加载上拉更多的数据
    loadMore(){
      this.getHomeGoods(this.currentType)
    },

    //等轮播图加载完成，获取TabControl的值
    swiperImageLoad(){
      this.tabOffsetTop = this.$refs.tabcontrol2.$el.offsetTop
    },

    //网络请求的相关方法

    // 获取轮播图数据
    getHomeMultidata(){
      getHomeMultidata().then(res => {
      this.banners = res.data.banner.list
      this.recommends = res.data.recommend.list
    })
  },
    // 获取['流行','新款','精选']的数据
    getHomeGoods(type){
        const page = this.goods[type].page+1
        getHomeGoods(type,page).then(res => {
        this.goods[type].list.push(...res.data.list)
        this.goods[type].page += 1
        this.$refs.scroll.finishPullUp()
      })
    },
    
  },
  computed: {
    showGoods(){
      return this.goods[this.currentType].list
    }
  },
  destroyed () {
    console.log('xx')
  },
  activated () {
    this.$refs.scroll.refresh()
    this.$refs.scroll.scrollTo(0,this.saveY)
    
  },
  deactivated () {
    this.saveY = this.$refs.scroll.getScrollY()

    // 取消全局的监听事件
    this.$bus.$off('itemImageLoad',this.homeItemListener)
  },
  
  
}
</script>

<style scoped>
/* scoped 该样式只会对当前的组件有用 */
  #home{
    /* padding-top: 44px; */
    position: relative;
    height: 100vh;
  }
  .home-nav{
    background-color: var(--color-tint);
    color:white;
    /* position:fixed;
    left: 0;
    top: 0;
    right: 0;
    z-index: 9; */

  }
   .tab-control{
     position: relative;
    background-color: #fff;
    z-index: 9; 
  } 
  .content{
    /* height: 300px; */
    overflow: hidden;
    position: absolute;
    left: 0;
    top:44px;
    bottom: 49px;
    right: 0;
  }
  
</style>