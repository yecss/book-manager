import Vue from "vue"
import VueRouter from "vue-router"
// 导入登录组件
import Login from "../views/login"
import Layout from "@/components/layout"
import Home from "@/views/home"
import User from "@/views/user"
import Booktype from "@/views/book/booktype.vue"
import Bookinfo from "@/views/book/bookinfo.vue"
import Kucunsearch from "@/views/kucun/kucunsearch.vue"
import Chukusearch from "@/views/kucun/chukusearch.vue"
import Rukusearch from "@/views/kucun/rukusearch.vue"
Vue.use(VueRouter)

const routes = [
  {//配置主页路由
    path:'/',
    name:'layout',
    component:Layout,
    // 从/重定向到/home
    redirect:'/home',
    children:[
      {
        path:'/home',
        component:Home,
        meta:{title:'首页'},
        // 给路由标注meta信息，获取方法：$route.meta.title
      },
      {
        path:'/user',
        component:User,
        meta:{title:'用户管理'},
      },
      {
        path:'/booktype',
        component:Booktype,
        meta:{title:'图书类比管理'},
      },
      {
        path:'/bookinfo',
        component:Bookinfo,
        meta:{title:'图书信息管理'},
      },
      {
        path:'/kucunsearch',
        component:Kucunsearch,
        meta:{title:'库存查询'},
      },
      {
        path:'/chukusearch',
        component:Chukusearch,
        meta:{title:'出库查询'},
      },
      {
        path:'/rukusearch',
        component:Rukusearch,
        meta:{title:'入库查询'},
      },
    ]
  },
  {//配置登录路由
    path:'/login',
    name:'login',
    component:Login
  }
]
const router = new VueRouter({
  mode:'history',
  base:'',//process.env.BASE_URL
  routes
})
export default router;