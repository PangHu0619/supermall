<template>
  <div class="toast" v-show="isShow"> 
    <div >
      {{message}}
    </div>
  </div>
</template>

<script>
export default {
  // props: {
  //   message:{
  //     type:String,
  //     default:'ccc'
  //   },
  //   isShow:{
  //     type:Boolean,
  //     default:false
  //  }
  // },
  name:'Toast',
  data(){
    return {
      message:'1111',
      isShow:false
    }
  },
  methods: {
    show(message,time){
      this.isShow = true
      this.message = message
      setTimeout(() =>{
        this.isShow = false
        this.message = ''  
      },time)
    },
    aaa(){
      console.log(this.message)
    }
  }
}
</script>

<style >
  .toast{
    position:fixed;
    top: 50%;
    left: 50%;
    color: #fff;
    background-color:rgba(0,0,0,0.5);
    padding: 10px;
    transform:translate(-50%,-50%);
    z-index: 9992;
  }
</style>