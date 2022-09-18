import axios from "axios"
import { Loading } from 'element-ui'
export default{
  getBookInfoList(){
    return axios({
      url:'https://mock.mengxuegu.com/mock/631d7e87b4c53348ed2bbf30/book/bookinfo/list',
      method:'get'
    })
  },
  search(page,size,searchWhere){
    return axios({
      url:`https://mock.mengxuegu.com/mock/631d7e87b4c53348ed2bbf30/book/bookinfo/list/search/${page}/${size}`,
      method:'post',
      data:{
        searchWhere
      }
    })
  },
  add(bookForm){
    return axios({
      url:'https://mock.mengxuegu.com/mock/631d7e87b4c53348ed2bbf30/book/addbookinfo',
      method:'post',
      data:bookForm,
    })
  },
  getBookById(id){
    return axios({
      url:`https://mock.mengxuegu.com/mock/631d7e87b4c53348ed2bbf30/book/bookinfo/${id}`,
      method:'get',
    })
  },
  updateBook(bookObj){
    return axios({
      url:`https://mock.mengxuegu.com/mock/631d7e87b4c53348ed2bbf30/book/bookinfo/${bookObj.id}`,
      method:'put',
      data:bookObj
    })
  },
  deleteBookById(id){
    return axios({
      url:`https://mock.mengxuegu.com/mock/631d7e87b4c53348ed2bbf30/book/bookinfo/${id}`,
      method:'delete'
    })
  },
  getTypeSum(){
    return axios({
      url:'https://mock.mengxuegu.com/mock/631d7e87b4c53348ed2bbf30/book/book/getTypeSum',
      method:'get'
    })
  }
}
const loading = {
  loadingInstance:null,
  open:function(){
    if(this.loadingInstance === null){
      this.loadingInstance = Loading.service({
        target:'.main'
    })
    }
  },
  close:function(){
    if(this.loadingInstance != null){
      this.loadingInstance.close()
    }
  }
}
axios.interceptors.request.use(
  (config) => {
    loading.open()
    return config
  },
  (error) => {
    loading.close()
    return Promise.reject(error)
  }
)
axios.interceptors.response.use(function (response){
  loading.close()
  return response
},function (error){
  loading.close()
  return Promise.reject(error)
})