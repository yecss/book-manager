import axios from "axios"
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
      data:bookForm
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
  }
}