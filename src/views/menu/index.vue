<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <el-button @click="$router.push({ name: 'menu-create' })"
        >添加菜单</el-button
      >
    </div>
    <el-table :data="menuData" border style="width: 100%">
      <el-table-column type="index" label="编号" width="180" align="center">
      </el-table-column>
      <el-table-column prop="name" label="菜单名称" width="180" align="center">
      </el-table-column>
      <el-table-column prop="level" label="菜单级数" align="center">
      </el-table-column>
      <el-table-column prop="icon" label="菜单图标" align="center">
      </el-table-column>
      <el-table-column prop="orderNum" label="排序" align="center">
      </el-table-column>
      <el-table-column prop="" label="操作" align="center">
        <template v-slot="scoped">
          <el-button
            size="mini"
            @click="
              $router.push({ name: 'menu-edit', params: { id: scoped.row.id } })
            "
            >编辑</el-button
          >
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scoped.row.id)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script>
import { getAllMenus, deleteMenu } from '@/api/menu'
export default {
  name: 'MenuIndex',
  data() {
    return {
      menuData: [],
    }
  },
  created() {
    this.loadMenus()
  },
  methods: {
    loadMenus() {
      getAllMenus().then((res) => {
        if (res.data.code === '000000') {
          this.menuData = res.data.data
        } else {
          this.$message.error('获取数据失败')
        }
      })
    },
    handleDelete(menuId) {
      this.$confirm('确定要删除信息吗?', '删除提示')
        .then(() => {
          // 确定删除执行这里
          deleteMenu(menuId).then((res) => {
            if (res.data.data) {
              this.$message.success('删除成功')
              this.loadMenus()
            } else {
              this.$message.error('删除失败')
            }
            console.log(res)
          })
        })
        // 取消操作执行,这里
        .catch(() => {
          this.$message.info('已取消删除操作')
        })
    },
  },
}
</script>

<style lang="scss" scoped>
</style>