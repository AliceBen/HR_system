<template>
  <div class="login_container">
    <div class="login_box">
      <!-- Logo区域 -->
      <div class="avatar_box">
        <img src="../assets/logo.png" alt />
      </div>
      <!-- 登录表单区域 -->
      <el-form
        :model="loginForm"
        status-icon
        :rules="loginFormRules"
        ref="loginFormRef"
        class="login_form"
      >
        <el-form-item prop="username">
          <el-input v-model.number="loginForm.username" prefix-icon="iconfont icon-user"></el-input>
        </el-form-item>
        <el-form-item prop="pwd">
          <el-input type="password" v-model="loginForm.pwd" prefix-icon="iconfont icon-3702mima"></el-input>
        </el-form-item>
        <el-form-item class="btns">
          <el-button type="primary" @click="submitForm('loginFormRef')">登录</el-button>
          <el-button @click="resetForm('loginFormRef')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  data() {
    return {
      loginForm: {
        username: '',
        pwd: ''
      },
      // 表单的验证规则对象
      loginFormRules: {
        // 验证用户名是否合法
        username: [
          { required: true, message: '请输入登录名称', trigger: 'blur' },
          { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
        ],
        // 验证密码是否合法
        pwd: [
          { required: true, message: '请输入登录密码', trigger: 'blur' },
          { min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    submitForm(formName) {
      // POST 返回的是一个 promise 为了简化 promise 操作，使用 async 进行修饰
      this.$refs[formName].validate(valid => {
        if (valid) {
          axios
            .post('/api/auth/userLogin', {
              pwd: this.loginForm.pwd,
              username: this.loginForm.username
            })
            .then(res => {
              console.log(res)
              if (res.data.code !== 'OK') {
                return this.$message.error('账号密码错误!')
              } else {
                this.$message({
                  message: '登录成功',
                  type: 'success'
                })
                this.$router.push('/home')
              }
            })
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>
<style lang="less" scoped>
.login_container {
  background: #2b4b6b;
  height: 100%;
}
.login_box {
  width: 450px;
  height: 300px;
  background: #fff;
  border-radius: 3px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.avatar_box {
  height: 130px;
  width: 130px;
  border: 1px solid #eee;
  border-radius: 50%;
  padding: 10px;
  box-shadow: 0 0 10px #ddd;
  position: absolute;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;
  img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background: #eee;
  }
}

.login_form {
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 0 20px;
  box-sizing: border-box;
}

.btns {
  display: flex;
  justify-content: flex-end;
}
</style>