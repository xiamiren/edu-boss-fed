<template>
  <div id="app">
    <!-- 添加的一个显示区域,根据不同的路由地址,显示不同的组件 -->
    <router-view></router-view>
  </div>
</template>
<script>
export default {
  name: 'App',
  data() {
    return {}
  },
}
</script>

<style lang="scss">
</style>
