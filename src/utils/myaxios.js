import { Loading } from 'element-ui'
import axios from 'axios'
const myaxios = axios.create({
  timeout: 3000,
})
myaxios.interceptors.request.use(
  (config) => {
    Loading.service({
      target: '.main',
    })
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)
