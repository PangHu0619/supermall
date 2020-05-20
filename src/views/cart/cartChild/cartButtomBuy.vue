<template>
  <div class="buttom-buy">
    <div class="check-content" @click="SeletAll">
      <check-button :ischecked = "isSeletAll" @click.native="SeletAll"></check-button>
      <span>全选</span>
    </div>
    <div class="price">
      合计:{{totalPrice}}
    </div>
    <div class="sum" @click="sumClick">
      去结算({{checkLength}})
    </div>
  </div>
</template>

<script>
import checkButton from 'components/content/checkButton/CheckButton'
import { mapGetters } from 'vuex'
export default {
  components: {
    checkButton
  },
  data(){
    return {

    }
  },
  computed: {
    ...mapGetters(['carList']),
    // 计算总价
    totalPrice(){
      return '$' + this.$store.state.carList.filter(item => {
        return item.checked 
      }).reduce((preValue,item) => {
        return preValue + item.price * item.count
      },0)
    },
    // 计算购物车长度
    checkLength(){
      return this.$store.state.carList
      .filter(item => {
        return item.checked
      })
      .reduce((preValue,item) =>{
        return preValue + item.count
      },0)
    },
    // 全选框状态显示
    isSeletAll(){
      // return !(this.carList.filter(item =>!item.checked).length)
      if(this.carList.length ===0) return false
      return !(this.carList.find(item =>!item.checked))
    }
  },
  methods: {
    // 全选按钮状态改变
    SeletAll(){
      if(this.isSeletAll){
        this.carList.forEach(item => !item.checked )
      }else{
        for(let item of this.carList){
          item.checked = true
          }
        }
      },
       sumClick(){
         let n = 0
         for(let item of this.carList){
           if(item.checked === false){
             n++
           }  
         }
         if(n == this.carList.length){
           this.$toast.show('请选择商品',1000)
         }
      }
    },
   
    
  }

</script>

<style scoped>
  .buttom-buy{
    height: 40px;
    background-color:#eee;
    /* position: relative; */
    /* bottom: 49px; */
    line-height: 40px;
    display: flex;
  }
  .check-content{
    display: flex;
    align-items: center;
    padding-left: 4px;
    width: 60px;
    /* background-color: blue; */
  }
  .price{
    margin-left: 20px;
    flex:1
  }
  .sum{
    width: 90px;
    background-color: blue;
    text-align: center;
  }
</style>