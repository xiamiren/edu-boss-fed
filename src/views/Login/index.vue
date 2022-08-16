<template>
  <div class="login">
    <el-form
      label-position="top"
      ref="loginForm"
      :model="formData"
      label-width="80px"
      :rules="myRules"
    >
      <h2>登录</h2>
      <el-form-item label="手机号" prop="phone">
        <el-input v-model="formData.phone"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="password" v-model="formData.password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit" :loading="isLoading"
          >立即登录</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { login } from '@/api/user'
export default {
  name: 'LoginIndex',
  data() {
    return {
      isLoading: false,
      formData: {
        phone: '18201288771',
        password: '111111',
      },
      myRules: {
        phone: [
          { required: true, message: '手机号为必填项', trigger: blur },
          { pattern: /^1\d{10}$/, message: '手机号不合法', trigger: blur },
        ],
        password: [
          { required: true, message: '密码为必填项', trigger: blur },
          { min: 3, max: 6, message: '密码长度在3-6位', trigger: blur },
        ],
      },
    }
  },
  methods: {
    // 光标blur的时候验证了一次,点击登录按钮的时候再使用validate验证一次,验证是否通过后进行一些操作
    onSubmit() {
      this.isLoading = true
      this.$refs.loginForm
        .validate()
        .then(() => login(this.formData))
        .then((res) => {
          const { data } = res
          if (data.success) {
            this.$store.commit('saveTokenInfo', data.content)
            this.$message.success('登录成功!')
            this.$router.push(this.$route.query.redirect)
          } else {
            this.$message.error('登录失败')
          }
        })
        .catch(() => {
          this.$message.error('验证失败')
        })
        .finally(() => {
          this.isLoading = false
        })
    },
  },
}
</script>

<style lang="scss" scoped>
  .login {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
  }
  .el-form {
    width: 300px;
    padding: 30px;
    background-color: #fff;
    .el-button {
      width: 100%;
    }
  }
</style>