<template>
  <div class="cart-list">
    <scroll class="content" ref="scroll">
      <cart-list-item v-for = "(item,index) in carList" :key="index" :item-info="item"></cart-list-item>
    </scroll>
    
  </div>
</template>

<script>
import Scroll from 'components/common/scroll/Scroll'
import cartListItem from './cartListItem'
import {mapGetters} from 'vuex'
export default {
  components: {
    Scroll,
    cartListItem
  },
  computed: {
    ...mapGetters(['carList'])
  },
  activated () {
    this.$refs.scroll.refresh()
    console.log('222')
  }
}
</script>

<style scoped>

  .cart-list{
    height: calc(100% - 44px - 49px - 40px);
    
  }
  .content{
    height: 100%;
    overflow: hidden;
  }
</style>