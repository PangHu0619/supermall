<template>
  <nav-bar>
    <div slot="left" class="back" @click="bakcClick">
      <img src="~assets/img/common/back.svg" alt="">
    </div>
    <div slot="center" class="titles">
      <div  v-for = "(item,index) in titles" 
            :key="index" 
            class="titles-item"
            :class="{active: index === currentIndex}"
            @click="detailClick(index)"
            >{{item}}</div>
    </div>
  </nav-bar>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
export default {
  components: {
    NavBar
  },
  data(){
    return {
      titles:['商品','参数','评论','推荐'],
      currentIndex:0
    }
  },
  methods: {
    detailClick(index){
      this.currentIndex = index
    },
    bakcClick(){
      this.$router.back()
    }
  }
}
</script>

<style>
  .titles{
    display: flex;
    font-size: 13px;
  }
  .titles-item{
    flex: 1;

  }
  .active{
    color:var(--color-high-text)
  }
  .back img{
    padding-left: 10px;
    margin-top: 10px;
  }
</style>