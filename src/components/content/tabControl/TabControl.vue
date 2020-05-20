<template>
  <div class="tab-control">
    <div v-for = "(item,index) in titles" :key="index" class="tab-control-items"
    :class="{Active:index===currentIndex}" @click="btnClick(index)"><span>{{item}}</span></div>
  </div>
</template>

<script>
export default {
  props: {
    titles:{
      type:Array,
      default(){
        return []
      }
    }
  },
  data(){
    return {
      currentIndex:0
    }
  },
  methods: {
    btnClick(index){
      this.currentIndex = index
      this.$emit('tabClick',index)
    }
  }
}
</script>

<style>
  .tab-control{
    display: flex;
    text-align: center;
    font-size: 15px;
    height: 40px;
    line-height: 40px;
  }
  .tab-control-items{
    flex: 1;
  }
  
  .Active{
    color:var(--color-tint);
    
  }
  .Active span{
    border-bottom:2px solid pink;
    padding:5px
  }
</style>