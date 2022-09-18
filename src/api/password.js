import axios from "axios"
export default {
  checkPwd(userId,oldPwd){
    return axios({
      url:'https://mock.mengxuegu.com/mock/631d7e87b4c53348ed2bbf30/book/user/pwd',
      method:'post',
      data:{
        userId,
        oldPwd
      }
    })
  },
  updatePwd(userId,newPwd){
    return axios({
      url:'https://mock.mengxuegu.com/mock/631d7e87b4c53348ed2bbf30/book/user/pwd',
      method:'put',
      data:{
        userId,
        newPwd
      }
    })
  }
}