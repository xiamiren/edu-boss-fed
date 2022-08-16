<template>
  <el-container style="height: 100vh">
    <el-aside width="auto" style="background-color: rgb(238, 241, 246)">
      <app-aside :isCollapse="isCollapse"></app-aside>
    </el-aside>

    <el-container>
      <el-header style="">
        <app-header
          :isCollapse="isCollapse"
          :toggleCollapse="toggleCollapse"
        ></app-header>
      </el-header>

      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import './components/AppAside.vue'
import AppAside from './components/AppAside.vue'
import AppHeader from './components/AppHeader.vue'
export default {
  name: 'LayoutIndex',
  components: {
    AppAside,
    AppHeader,
  },
  data() {
    return {
      isCollapse: false,
    }
  },
  methods: {
    toggleCollapse() {
      this.isCollapse = !this.isCollapse
    },
  },
}
</script>

<style>
  .el-container {
    height: 100vh;
  }
  .el-header {
    background-color: #d0e0f5;
    color: #333;
    line-height: 60px;
  }

  .el-aside {
    color: #333;
  }
</style>
