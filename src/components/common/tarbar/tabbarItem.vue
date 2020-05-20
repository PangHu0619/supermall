<template>
  <div class="tab-bar-item" @click="click">
    <div v-if="!isActive"><slot name = "item-icon"></slot></div>
    <div v-else><slot name = "item-icon-active"></slot></div>
    <div :style="fontColor"><slot name = "item-name"></slot></div>
    
  </div>
</template>

<script>
export default {
  name:"tabbaritem",
  props:{
    path:String,
    tarcolor:{
      type:String,
      default:"red"
    }
  },
  data () {
    return {
     
    }
  },
  computed: {
    isActive(){
      return this.$route.path.indexOf(this.path) !== -1
    },
    fontColor(){
      return this.isActive ? {color:this.tarcolor} : {}
    }

  },
  methods: {
    click(){
      this.$router.replace(this.path)
    },
    
  }
}
</script>

<style>
  .tab-bar-item{
    flex: 1;
    text-align:center;
    height: 49px;
    font-size: 14px;
  }
  .tab-bar-item img{
    width: 24px;
    height: 24px;
    margin-top: 3px;
    margin-bottom: 2px;
    /* 图片下面会有三像素 消除像素 */
    vertical-align: middle
  }
  .active{
    color:red
  }
</style>