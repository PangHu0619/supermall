import {ADD_COUNTER,ADD_TO_CART} from './mutations-types'

export default {
  addCars(context,payload){
    return new Promise((resolve,reject) =>{
      let oldProduct = context.state.carList.find(item => item.iid === payload.iid)
      if(oldProduct){
        context.commit(ADD_COUNTER,oldProduct)
        resolve('商品数量+1')
      }else{
        payload.count = 1
        context.commit(ADD_TO_CART,payload)
        resolve("已经添加进购物车")
      }
    })
  }
}