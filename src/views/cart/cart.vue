<template>
  <div class="cart">
    <nav-bar class="nav-bar">
      <div slot="center" >购物车({{length}})</div>
    </nav-bar>
    
    <cart-list></cart-list>
    <cart-buttom-buy></cart-buttom-buy>
  </div>
 
  
</template>

<script scoped>

import NavBar from 'components/common/navbar/NavBar'

import cartList from './cartChild/cartList'
import cartButtomBuy from './cartChild/cartButtomBuy'




import {mapGetters} from 'vuex'



export default {
  components: {
    NavBar,
    cartList,
    cartButtomBuy
   
  },
  computed: {
    // 将vuex的getters里面的函数转化为组件的计算属性
    // ...mapGetters(['carLength'])

    ...mapGetters({
      length:'carLength'
    })
      
  }
}
</script>
  
<style scoped>
  .cart{
    height: 100vh;
  }

  .nav-bar{
    color:white;
    background-color: var(--color-tint);
  };

</style>