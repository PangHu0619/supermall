import axios from 'axios'

export function request(config){
  const instance = axios.create({
    baseURL:'http://123.207.32.32:8000/api/h3',
    timeout:5000
  })
  instance.interceptors.request.use(aa =>{
    return aa
  },err =>{
    console.log(err)
  })
    // 响应拦截
  instance.interceptors.response.use(res => {
    return res.data
  },err => {
    console.log(err)
  })
  return instance(config)
}