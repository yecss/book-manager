import axios from "axios"
export default{
  getBookInfoList(){
    return axios({
      url:'https://mock.mengxuegu.com/mock/631d7e87b4c53348ed2bbf30/book/bookinfo/list',
      method:'get'
    })
  }
}