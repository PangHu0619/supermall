<template>
  <div class="wrapper" ref="wrapper">
    <div>
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
export default {
  props: {
    probeType:{
      type:Number,
      default:0
    },
    pullUpLoad:{
      type:Boolean,
      default:false
    }
  },
  data(){
    return {
      scroll:null,
    }
  },
  mounted () {
    // 创建BScroll的对象
    this.scroll = new BScroll(this.$refs.wrapper,{
      click:true,
      probeType:this.probeType,
      pullUpLoad:this.probeType
    })
    
    // 监听滚动的位置
    this.scroll.on('scroll',(position) =>{
      // console.log(position)
      this.$emit('scroll',position)
    })

    // 监听scroll滚动底部
   if(this.pullUpLoad){
     this.scroll.on('pullingUp',() => {
       this.$emit('pullingUp')
     })
   }
  },
  methods: {
    scrollTo(x,y,time=300){
     this.scroll && this.scroll.scrollTo(x,y,time)
    },
    // 多次上拉
    finishPullUp(){
      this.scroll.finishPullUp()
    },
    // 重新刷新
    refresh(){
      // console.log('dsd')
      this.scroll && this.scroll.refresh()
      console.log('finish')
    },
    getScrollY(){
      return this.scroll?this.scroll.y:0
    }
  }
}
</script>

<style>

</style>