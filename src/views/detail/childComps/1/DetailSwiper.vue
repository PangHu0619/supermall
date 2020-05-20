<template>
  <div class="detail-swiper">
   <swiper>
     <swiper-item v-for="(item,index) in topImage" :key='index' class="swiper-item">
       <img :src="item" alt="">
     </swiper-item>
   </swiper>
  </div>
</template>

<script>
import {Swiper,SwiperItem} from 'components/common/swiper'

export default {
  props:{
    topImage:{
      type:Array,
      default(){
        return 
      }
    }
  },
  components: {
    Swiper,
    SwiperItem
  }
}
</script>

<style scoped>
  .swiper-item{
    height: 300px;
    overflow: hidden;
  }
</style>