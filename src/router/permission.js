import router from "./index.js"
import { getUserInfo } from "@/api/login.js"
router.beforeEach((to,from,next)=>{
  // 获取token
  const token = localStorage.getItem("xdz-manager-token")
  // 访问非登录页面则不允许访问
  if(!token){
    if(to.path !== '/login'){
      next({path:'/login'})
    }
    else{
      next()
    }
  }
  else{
    const userInfo = localStorage.getItem("xdz-manager-user")
    if(userInfo){
      next()
    }
    else{
      getUserInfo(token).then((response)=>{
        const respUser = response.data
        // 如果获取到用户信息
        if(respUser.flag){
          localStorage.setItem("xdz-manager-user",JSON.stringify(respUser.data))
          next()
        }
        else{
          next({path:'/login'})
        }
      })
    }
  }
})
export default router