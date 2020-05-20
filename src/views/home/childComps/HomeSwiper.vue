<template>
  <swiper>
      <swiper-item v-for="(item,index) in banners" :key = "index">
        <a :href="item.link">
          <img :src="item.image" alt="" @load="imageLoad">
        </a>
      </swiper-item>
    </swiper>
</template>

<script>
import {Swiper,SwiperItem} from 'components/common/swiper'
export default {
  components: {
    Swiper,
    SwiperItem
  },
  props: {
    banners:{
      type:Array,
      default(){
        return []
      }
    }
  },
  data(){
    return {
      isload:false
    }
  },
  methods: {
    // 监听图片加载，发出事件
    imageLoad(){
      if(!this.isload)
      this.$emit('swiperImageLoad')
      this.isload = true
    }
  }
}
</script>

<style>

</style>