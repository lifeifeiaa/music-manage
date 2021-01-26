<template>
    <div class="login-wrap">
      <div class="ms-title">music 后台管理系统</div>
      <div class="ms-login">
        <el-form :model="ruleForm" :rules="rules" ref="ruleFrom">
          <el-form-item prop="username">
            <el-input v-model="ruleForm.username" placeholder="用户名"></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input type="password" v-model="ruleForm.password" placeholder="密码"></el-input>
          </el-form-item>
          <div class="login-btn">
            <el-button type="primary" @click="submitForm">登录</el-button>
          </div>
        </el-form>
      </div>
    </div>
</template>

<script>
  import {getLoginStatus} from "../api";

  export default {
        name: "Login",
      data: function () {
          return {
            ruleForm: {
              username: 'admin',
              password: '123456'
            },
            rules: {
              username: [
                {required:true,message:"请输入用户名",trigger:"blur"}
              ],
              password: [
                {required:true,message:"请输入密码",trigger:"blur"}
              ]
            }
          };
      },
      methods: {
          submitForm(){
            let params = new URLSearchParams();
            params.append("name",this.ruleForm.username);
            params.append("password",this.ruleForm.password);
            getLoginStatus(params)
              .then((res) => {
                if (res.code == 1){
                  //this.notify("登录成功","success");
                  localStorage.setItem('username',this.ruleForm.username);
                  this.$router.push("/Info");
                  this.$message.success("登录成功")
                }else{
                  //this.notify("登录失败","error");
                  this.$message.error("登录失败")
                }
              });
          }
      }
    }
</script>

<style scoped>
  .login-wrap {
    position: fixed;
    background: url("../assets/img/bg.jpg");
    background-attachment: fixed;
    background-position: center;
    background-size: cover;
    z-index: -1;
    width: 100%;
    height: 100%;
    top: 0px; /*这里是设置与顶部的距离*/
    left: 0px; /*这里是设置与左边的距离*/
    bottom: 0px;
    right: 0px;
  }
  .ms-title {
    position: absolute;
    top: 50%;
    width: 100%;
    margin-top: -230px;
    text-align: center;
    font-size: 30px;
    font-weight: 600;
    color: #fff;
  }
  .ms-login {
    position: absolute;
    left: 50%;
    top: 50%;
    width: 300px;
    height: 180px;
    margin-left: -200px;
    margin-top: -150px;
    padding: 40px;
    border-radius: 5px;
    background: #00000090;
  }
  .login-btn {
    text-align: center;
  }
  .login-btn button {
    width: 100%;
    height: 36px;
  }
</style>
