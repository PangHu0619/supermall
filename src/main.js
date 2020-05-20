import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import toast from 'components/common/toast'

import FastClick from 'fastclick'
import VueLazyLoad from 'vue-lazyload'

Vue.config.productionTip = false

Vue.prototype.$bus = new Vue()

Vue.use(toast)

// 图片懒加载
Vue.use(VueLazyLoad,{
    loading:require("./assets/img/common/placeholder.png")
  }
)

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')


// 解决移动端300毫秒延时
FastClick.attach(document.body)
// let name = 1
// function a (name){
//   this.name = name
// }

// let boy = new a(2)

// boy.apply(this,)

// let a = {count:1}
// let b = a 
// let c = 2
// let d = c 
// d +=2
// b.count +=1 
// console.log(a)
// console.log(b)
// console.log(c)
// console.log(d)