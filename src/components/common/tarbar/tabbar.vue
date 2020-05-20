<template>
  <div id="tab-bar">
    <slot></slot>
  </div>
</template>

<script>

export default {
  
}
</script>

<style>
   #tab-bar{
    /* 水平分布 */
    display: flex;
    background-color: #f6f6f6;
    position: fixed;
    left: 0;
    bottom: 0;
    right: 0;
    /* 设置阴影 */
    box-shadow: 0px -3px 1px rbga(100,100，100，0.1)
  }
  
</style>