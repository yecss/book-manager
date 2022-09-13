import axios from "axios"
export function login(username,passowrd){
  return axios({
    url:'https://mock.mengxuegu.com/mock/631d7e87b4c53348ed2bbf30/book/user/login',
    method:'post',
    data:{
      username,
      passowrd
    }
  })
}
export function getUserInfo(token){
  return axios({
    method:'get',
    url:`https://mock.mengxuegu.com/mock/631d7e87b4c53348ed2bbf30/book/user/info/${token}`,
  })
}

export function logout(token){
  return axios({
    url:`https://mock.mengxuegu.com/mock/631d7e87b4c53348ed2bbf30/book/user/logout/${token}`,
    method:'post',
    data:{
      token
    }

  })
}