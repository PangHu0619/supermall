<template>
  <div class="check-button" :class="{check:ischecked}">
    <img src="~assets/img/cart/tick.svg" alt="">
  </div>
</template>

<script>
export default {
  props: {
    ischecked :{
      type:Boolean,
      
    }
  }
}
</script>

<style scoped>
  .check-button{
    
    border-radius: 50%;
    border: 2px solid #aaa;
    width: 20px;
    height: 20px;
    line-height: 20px;
    
  }
  .check{
    border-color:red;
    background-color: red;
   
    
  }
  .check-button img{
    width: 14px;
    height: 14px;
    
   
  }
</style>