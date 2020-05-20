import Toast from './Toast.vue'

const obj = {}

obj.install = function(Vue){
  // 创建组件构造器
  const toastConstructor = Vue.extend(Toast)

  // 使用new方法,根据组件构造器,可以创建一个组件对象
  const toast = new toastConstructor()

  // 将组件对象,手动挂载再一个元素上
  toast.$mount(document.createElement('div'))

  // 
  document.body.appendChild(toast.$el)

  Vue.prototype.$toast = toast
}

export default obj