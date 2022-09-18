<template>
  <div class="header">
    <a href="/">
      <img class="logo" src="../../assets/another_widget.png" alt="" />
      <span class="title">小豆子图书管理系统</span>
    </a>
    <!-- 密码修改弹窗 start -->
    <el-dialog title="修改密码" :visible.sync="dialogFormVisible" width="500px">
      <el-form
        :model="ruleForm"
        status-icon
        :rules="rules"
        ref="pwdForm"
        label-width="100px"
        style="width: 400px"
      >
        <el-form-item label="旧密码" prop="oldpass">
          <el-input
            type="password"
            v-model="ruleForm.oldpass"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="pass">
          <el-input
            type="password"
            v-model="ruleForm.pass"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPass">
          <el-input
            type="password"
            v-model="ruleForm.checkPass"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="changePwd('pwdForm')"
            >提交</el-button
          >
          <el-button @click="resetForm('pwdForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <!-- 密码修改弹窗 end -->
    <el-dropdown @command="handleCommand">
      <span class="el-dropdown-link">
        欢迎你，{{ user.name }}
        <i class="el-icon-arrow-down el-icon--right"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item icon="el-icon-edit" command="a"
          >修改密码</el-dropdown-item
        >
        <el-dropdown-item icon="el-icon-user" command="b"
          >退出登录</el-dropdown-item
        >
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
// 这里是按需导入
import { logout } from "@/api/login";
import pwdApi from "@/api/password";
import { nextTick } from 'vue';
export default {
  name: "AppHeader",
  data() {
    var validateOldPass = (rule, value, callback) => {
      // rule指需要校验的字段
      // value指传递过来的值
      pwdApi.checkPwd(this.user.id, value).then((response) => {
        const resp = response.data;
        if (resp.flag) {
          callback();
        } else {
          callback(new Error(resp.message));
        }
      });
    };
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.ruleForm.checkPass !== "") {
          this.$refs.pwdForm.validateField("checkPass");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm.pass) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      dialogFormVisible: false,
      user: JSON.parse(localStorage.getItem("xdz-manager-user")),
      ruleForm: {
        pass: "",
        oldpass: "",
        checkPass: "",
      },
      rules: {
        oldpass: [
          { required: true, message: "旧密码不能为空", trigger: "blur" },
          { validator: validateOldPass, trigger: "blur" },
        ],
        pass: [{ validator: validatePass, trigger: "blur" }],
        checkPass: [{ validator: validatePass2, trigger: "blur" }],
      },
    };
  },
  methods: {
    handleCommand(command) {
      switch (command) {
        case "a":
          this.dialogFormVisible = true;
          break;
        case "b":
          this.logoutSystem();
          break;
        default:
          break;
      }
    },
    // 退出系统
    logoutSystem() {
      const token = localStorage.getItem("xdz-manager-token");
      logout(token).then((response) => {
        const resp = response.data;
        if (resp.flag == true) {
          // 清除本地浏览器的token和用户数据
          localStorage.removeItem("xdz-manager-token");
          localStorage.removeItem("xdz-manager-user");
          // 跳转到登录页面
          this.$router.push("/login");
        } else {
          this.$message({
            type: "warning",
            message: resp.message, //获取接口返回的message
            duration: 1000, //停留一秒钟
          });
        }
      });
    },
    // 修改密码
    changePwd(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          pwdApi
            .updatePwd(this.user.id, this.ruleForm.pass)
            .then((response) => {
              const resp = response.data;
              // 不论失败成功都给出提示
              this.$message({
                type: resp.flag ? "success" : "warning",
                message: resp.message,
              });
              console.log(resp);
              if (resp.flag) {
                this.logoutSystem();
                this.dialogFormVisible = false;
              }
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
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
.el-dropdown {
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