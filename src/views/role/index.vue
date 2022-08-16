<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <h2>筛选搜索</h2>
      <el-form
        :inline="true"
        :model="queryParams"
        class="demo-form-inline"
        ref="queryForm"
      >
        <el-form-item label="输入搜索" prop="name">
          <el-input
            v-model="queryParams.name"
            placeholder="角色名称"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="handleReset">重置</el-button>
        </el-form-item>
        <el-form-item>
          <el-button @click="loadRoles" type="primary">查询搜索</el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-button @click="handleDlg(0)">添加角色</el-button>
    <el-table :data="queryResult.records" border style="width: 100%">
      <el-table-column type="index" label="序号" align="center" width="180">
      </el-table-column>
      <el-table-column prop="name" label="角色名称" align="center">
      </el-table-column>
      <el-table-column prop="description" label="描述" align="center">
      </el-table-column>
      <el-table-column
        prop="createdTime"
        label="添加时间"
        :formatter="timeFormatter"
        align="center"
      >
      </el-table-column>
      <el-table-column label="操作" width="150" align="center">
        <template v-slot="scope">
          <el-button
            size="mini"
            type="text"
            @click="
              $router.push({
                name: 'alloc-menu',
                params: { roleId: scope.row.id },
              })
            "
            >分配菜单</el-button
          >
          <el-button size="mini" type="text">分配资源</el-button>
          <el-button size="mini" type="text" @click="handleDlg(scope.row.id)"
            >编辑</el-button
          >
          <el-button size="mini" type="text" @click="handleDelete(scope.row.id)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <!-- 改变大小 改变当前页 当前页 页码 当前选中的页码 总页 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="queryParams.current"
      :page-sizes="[3, 6, 10]"
      :page-size="3"
      layout="total, sizes, prev, pager, next, jumper"
      :total="queryResult.total"
    >
    </el-pagination>
    <role-create-or-edit
      ref="roleDlg"
      @role-change="loadRoles"
    ></role-create-or-edit>
  </el-card>
</template>

<script>
import RoleCreateOrEdit from './create-or-edit.vue'
import { queryRoles, deleteRole } from '@/api/role'
import dayjs from 'dayjs'
export default {
  name: 'RoleIndex',
  components: {
    RoleCreateOrEdit,
  },
  data() {
    return {
      // 查询条件
      queryParams: {
        code: undefined,
        id: undefined,
        name: undefined,
        current: 1,
        size: 3,
      },
      // 查询结果
      queryResult: {},
    }
  },
  created() {
    this.loadRoles()
  },
  methods: {
    // 当前页的大小改变
    handleSizeChange(val) {
      this.queryParams.size = val
      this.queryParams.current = 1
      this.loadRoles()
    },
    // 当前页发生改变
    handleCurrentChange(val) {
      this.queryParams.current = val
      this.loadRoles()
    },
    // 加载角色信息
    loadRoles() {
      queryRoles(this.queryParams).then((res) => {
        console.log(res)
        if (res.data.code === '000000') {
          const { current, pages, records, size, total } = res.data.data
          Object.assign(this.queryParams, { current, size })
          this.queryResult = { pages, records, total }
        } else {
          this.$message.error('加载角色列表信息失败~')
        }
      })
    },
    // 日期格式化
    timeFormatter(row, column, value, index) {
      return dayjs(value).format('YYYY-MM-DD')
    },
    // 重置表单项
    handleReset() {
      this.$refs.queryForm.resetFields()
    },
    handleDlg(id) {
      this.$refs.roleDlg.showAndInit(id)
    },
    handleDelete(roleId) {
      this.$confirm('确定删除吗?', '删除提示')
        .then(() => {
          deleteRole(roleId).then((res) => {
            if (res.data.code === '000000') {
              this.$message.success('删除成功')
              this.loadRoles()
            } else {
              this.$message.error('删除失败~~')
            }
          })
        })
        .catch(() => {
          this.$message.info('已取消删除操作......')
        })
    },
  },
}
</script>

<style lang="scss" scoped>
  .el-form {
    margin-left: 130px;
  }
  .el-table {
    margin-top: 20px;
  }
</style>