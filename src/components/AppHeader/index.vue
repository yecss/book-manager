<template>
  <div class="header">
    <a href="/">
      <img class="logo" src="../../assets/another_widget.png" alt="" />
      <span class="title">小豆子图书管理系统</span>
    </a>
    <el-dropdown @command="handleCommand">
      <span class="el-dropdown-link">
        账号管理
        <i class="el-icon-arrow-down el-icon--right"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item icon="el-icon-edit" command="a">修改密码</el-dropdown-item>
        <el-dropdown-item icon="el-icon-user" command="b">退出登录</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
// 这里是按需导入
import {logout} from "@/api/login"
export default {
  name: "AppHeader",
  methods:{
    handleCommand(command){
      switch(command){
        case 'a':
          // 修改密码
          this.$message({
            type:'success',
            message:'点击了修改密码'
          })
          break;
        case 'b':
          const token = localStorage.getItem("xdz-manager-token")
          logout(token).then((response)=>{
            const resp = response.data
            if(resp.flag == true){
              // 清除本地浏览器的token和用户数据
              localStorage.removeItem("xdz-manager-token")
              localStorage.removeItem("xdz-manager-user")
              // 跳转到登录页面
              this.$router.push('/login')
            }
            else{
              this.$message({
                type:'warning',
                message:resp.message,//获取接口返回的message
                duration:1000//停留一秒钟
              })
            }
          })
          break;
      }
    }
  }
};
</script>

<style scoped>
.logo {
  border-radius: 5px;
  height: 35px;
  vertical-align: middle;
  margin-left: 5px;
}
.title {
  position: absolute;
  color: #fff;
  padding-left: 5px;
  font-size: 20px;
}
.el-dropdown{
  float: right;
  margin-right: 30px;
}
.el-dropdown-link {
  cursor: pointer;
  color: #fff;
}
.el-icon-arrow-down {
  font-size: 12px;
}
</style>