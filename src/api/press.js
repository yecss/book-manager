import axios from "axios"

export default{
  getPressList(){
    return axios({
      url:'https://mock.mengxuegu.com/mock/631d7e87b4c53348ed2bbf30/book/press/list',
      method:'get',
    })
  },
  search(page,size,searchWhere){
    return axios({
      url:`https://mock.mengxuegu.com/mock/631d7e87b4c53348ed2bbf30/book/press/list/search/${page}/${size}`,
      method:'post',
      data:searchWhere//没有传值就是空值，即是无条件查询
    })
  },
}