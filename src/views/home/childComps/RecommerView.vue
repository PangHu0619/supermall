<template>
  <div class="recommend">
    <div v-for = "(item,index) in recommends" :key=index class="recommenditem">
      <a :href="item.link"></a>
        <img :src="item.image" alt="">
        <div>{{item.title}}</div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    recommends:{
      type:Array,
      dafault(){
        return []
      }
    }
  }
}
</script>

<style>
  .recommend{
    display: flex;
    width: 100%;
    text-align: center;
    font-size: 12px;
    padding: 10px 0 20px;
    border-bottom: 12px solid #eee;
  }
  .recommenditem{
    flex: 1;
  }
  .recommenditem img{
    width: 65px;
    margin-bottom: 10px;
  }
</style>