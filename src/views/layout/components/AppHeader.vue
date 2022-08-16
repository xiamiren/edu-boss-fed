<template>
  <div class="app-header">
    <i :class="iconClsName" @click="toggleCollapse"></i>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item><a href="/">活动管理</a></el-breadcrumb-item>
      <el-breadcrumb-item>活动列表</el-breadcrumb-item>
      <el-breadcrumb-item>活动详情</el-breadcrumb-item>
    </el-breadcrumb>
    <el-dropdown>
      <span class="el-dropdown-link">
        <el-avatar :size="36" :src="userInfo.portrait"></el-avatar>
        <i class="el-icon-arrow-down el-icon--right"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item>{{ userInfo.userName }}</el-dropdown-item>
        <el-dropdown-item divided @click.native="handleLogout"
          >退出</el-dropdown-item
        >
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
import { getUserInfo, logout } from '@/api/user.js'
export default {
  name: 'AppHeader',
  props: {
    isCollapse: {
      type: Boolean,
      default: false,
    },
    toggleCollapse: {
      type: Function,
      require: true,
    },
  },
  data() {
    return {
      userInfo: {},
    }
  },
  computed: {
    iconClsName() {
      return this.isCollapse ? 'el-icon-s-unfold' : 'el-icon-s-fold'
    },
  },
  // 组件挂载之后获取用户的信息
  created() {
    getUserInfo().then((res) => {
      this.userInfo = res.data.content
    })
  },
  methods: {
    handleLogout() {
      this.$confirm('确定要退出吗', '退出提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          logout()
        })
        .then(() => {
          this.$store.commit('saveTokenInfo', null)
          this.$message.success('成功退出')
          this.$router.push('/login')
        })
        .catch(() => {
          this.$message.info('已取消退出')
        })
    },
  },
}
</script>

<style lang="scss" scoped>
  .app-header {
    display: flex;
    align-items: center;
    height: 100%;
    .el-breadcrumb {
      margin-left: 10px;
    }
    .el-dropdown {
      margin-left: auto;
      .el-dropdown-link {
        display: flex;
        align-items: center;
      }
    }
  }
</style>