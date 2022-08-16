<template>
  <el-menu router unique-opened :collapse="isCollapse">
    <a href="" class="logo">
      <img src="@/assets/logo.jpg" />
      <h1>清晨的虾米</h1>
    </a>
    <el-submenu index="1">
      <template slot="title"
        ><i class="el-icon-lock"></i><span>权限管理</span></template
      >
      <el-menu-item index="/roles"
        ><i class="el-icon-setting"></i>角色管理</el-menu-item
      >
      <el-menu-item index="/menus"
        ><i class="el-icon-setting"></i>菜单列表</el-menu-item
      >
      <el-menu-item index="/resources"
        ><i class="el-icon-setting"></i>资源列表</el-menu-item
      >
    </el-submenu>
    <el-menu-item index="/cources"
      ><i class="el-icon-film"></i><span>课程管理</span></el-menu-item
    >
    <el-menu-item index="/users"
      ><i class="el-icon-user"></i><span>用户管理</span></el-menu-item
    >

    <el-submenu index="2">
      <template slot="title"
        ><i class="el-icon-setting"></i><span>广告管理</span></template
      >
      <el-menu-item index="/advertise"
        ><i class="el-icon-setting"></i>广告列表</el-menu-item
      >
      <el-menu-item index="/advertise-space"
        ><i class="el-icon-setting"></i>广告位列表</el-menu-item
      >
    </el-submenu>
  </el-menu>
</template>

<script>
export default {
  name: 'AppAside',
  props: {
    isCollapse: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {}
  },
}
</script>

<style lang="scss" scoped>
  // 设置logo
  .logo {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 60px;
    text-decoration: none;
    color: black;

    img {
      width: 45px;
      height: 43px;
    }
  }
  // 设置侧边栏
  .el-menu {
    height: 100%;
    width: 200px;
  }

  .el-menu.el-menu--collapse {
    width: 65px;
    h1 {
      display: none;
    }
  }
</style>