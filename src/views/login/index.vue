<template>
  <div id="login-container">
    <el-form
      ref="LoginForm"
      :rules="rules"
      :model="form"
      label-width="80px"
      class="login-form"
    >
      <h2 class="login-title">小豆子图书管理系统</h2>
      <el-form-item prop="username" label="用户名:">
        <el-input type="text" v-model="form.username"></el-input>
      </el-form-item>
      <el-form-item prop="password" label="密码:">
        <el-input type="password" v-model="form.password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm">登录</el-button>
        <el-button>注册</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { login, getUserInfo } from "@/api/login";
export default {
  name: "TheLogin",
  data() {
    return {
      form: {
        username: "",
        password: "",
      },
      rules: {
        username: [
          {
            required: true,
            message: "请输入用户名",
            trigger: "blur",
          },
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            min: 6,
            max: 32,
            message: "密码长度在6-32个字符之间",
            trigger: ["blur", "change"],
          },
        ],
      },
    };
  },
  methods: {
    submitForm(){
      this.$refs.LoginForm.validate(valid=>{
        // 如果表单校验成功
        if(valid){
          login(this.form.username,this.form.password).then((response)=>{
            const resp = response.data
            console.log(resp,resp.flag,resp.data,resp.data.token)
            if(resp.flag){
              // 验证成功会返回一个token,通过token去获取用户信息
              getUserInfo(resp.data.token).then((response)=>{
                const respUser = response.data
                if(respUser.flag){//用户信息获取成功
                  console.log("@!",respUser.data)
                  localStorage.setItem("xdz-manager-user",JSON.stringify(respUser.data))//不转JSON格式不方便后面的读取
                  localStorage.setItem("xdz-manager-token",resp.data.token)
                  this.$router.push("./home")
                }
                else{
                  this.$message({
                    message:respUser.message,
                    type:"warning"
                  })
                }
              })
            }
            else{
              // 认证不通过
              this.$message({
                message:resp.message,
                type:'warning'
              })
            }
          })
        }
        else{
          console.log("校验失败")
          return false
        }
      })
    }
  }
}
</script>

<style lang="less">
#login-container {
  width: 100%;
  height: 100%;
  background-color: #eee;
  position: absolute;
}
.login-form {
  width: 396px;
  height: 320px;
  padding: 10px;
  background-color: #fff;
  border-radius: 16px;
  position: absolute;
  left: 50%;
  top: 50%;
  margin-left: -198px;
  margin-top: -160px;
}
.login-title {
  text-align: center;
  margin-bottom: 40px;
}
</style>