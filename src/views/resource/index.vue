<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <el-form
        :inline="true"
        :model="queryParams"
        ref="resourceForm"
        class="demo-form-inline"
      >
        <el-form-item label="资源名称" prop="name">
          <el-input
            v-model="queryParams.name"
            placeholder="资源名称"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item label="资源路径" prop="url">
          <el-input
            v-model="queryParams.url"
            placeholder="资源路径"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item label="资源分类" prop="categoryId">
          <el-select
            v-model="queryParams.categoryId"
            placeholder="资源分类"
            clearable
          >
            <el-option label="不限" value=""></el-option>
            <el-option
              v-for="item in categorys"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item>
          <el-button @click="handleReset">重置</el-button>
          <el-button type="primary" @click="loadResources" :disabled="isLoading"
            >查询搜索</el-button
          >
        </el-form-item>
      </el-form>
    </div>
    <el-button @click="handleDlg(0)">添加</el-button>
    <el-button @click="$router.push({ name: 'resource-category' })"
      >资源分类</el-button
    >
    <el-table
      :data="queryResult.records"
      border
      style="width: 100%"
      v-loading="isLoading"
    >
      <el-table-column type="index" label="编号" width="80" align="center">
      </el-table-column>
      <el-table-column prop="name" label="资源名称" align="center">
      </el-table-column>
      <el-table-column prop="url" label="资源路径" align="center">
      </el-table-column>
      <el-table-column prop="description" label="描述" align="center">
      </el-table-column>
      <el-table-column
        prop="createdTime"
        label="添加时间"
        align="center"
        :formatter="timeFormatter"
      >
      </el-table-column>
      <el-table-column label="操作" width="180" align="center">
        <template v-slot="scope">
          <el-button size="mini" @click="handleDlg(scope.row.id)"
            >编辑</el-button
          >
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.row.id)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :page-sizes="[10, 20, 50, 100]"
      :page-size="queryParams.size"
      layout="total, sizes, prev, pager, next, jumper"
      :total="queryResult.total"
      :disabled="isLoading"
    >
    </el-pagination>
    <resource-create-or-edit
      ref="resourceDlg"
      @resource-change="loadResources"
    ></resource-create-or-edit>
  </el-card>
</template>

<script>
import ResourceCreateOrEdit from './create-or-edit.vue'
import { queryResource, deleteResource } from '@/api/resource'
import { getAllResourceCategory } from '@/api/resouce-category'
import dayjs from 'dayjs'
export default {
  name: 'ResourceIndex',
  data() {
    return {
      // 查询条件
      queryParams: {
        id: undefined,
        name: undefined,
        startCreateTime: undefined,
        url: undefined,
        categoryId: '',
        endCreateTime: undefined,
        current: 1,
        size: 10,
      },
      queryResult: {}, //查询结果
      categorys: [], //资源分类信息
      // 数据是否加载中
      isLoading: false,
    }
  },
  created() {
    this.loadResources()
    this.loadCategory()
  },
  methods: {
    // 获取所有资源
    loadResources() {
      this.isLoading = true
      queryResource(this.queryParams)
        .then((res) => {
          if (res.data.code === '000000') {
            const { current, pages, records, size, total } = res.data.data
            Object.assign(this.queryParams, { current, size })
            this.queryResult = { pages, records, total }
          } else {
            this.$message.error('获取数据失败~')
          }
        })
        .finally(() => {
          this.isLoading = false
        })
    },
    // 获取所有资源类别
    loadCategory() {
      getAllResourceCategory().then((res) => {
        if (res.data.code === '000000') {
          this.categorys = res.data.data
        } else {
          this.$message.error('获取资源类别信息失败!')
        }
      })
    },
    handleReset() {
      this.$refs.resourceForm.resetFields()
    },
    // 格式化时间
    timeFormatter(row, column, value, index) {
      return dayjs(value).format('YYYY-MM-DD')
    },
    // 改变每页的显示记录
    handleSizeChange(val) {
      this.queryParams.size = val //每页的大小
      this.queryParams.current = 1 //当前页
      this.loadResources() //重新发送请求请求数据
    },
    handleCurrentChange(val) {
      this.queryParams.current = val
      this.loadResources() //改变当前页的信息后,重新查询数据
    },
    // 添加或编辑事件的处理函数
    handleDlg(resourceId) {
      this.$refs.resourceDlg.showAndInit(resourceId)
    },
    handleDelete(resourceId) {
      this.$confirm('确定要删除该资源吗?', '删除提示')
        .then(() => {
          deleteResource(resourceId).then((res) => {
            if (res.data.code === '000000') {
              this.$message.success('删除资源成功')
              this.loadResources()
            } else {
              this.$message.error('删除资源失败')
            }
          })
        })
        .catch(() => {
          this.$message.info('取消了删除操作')
        })
    },
  },
  components: {
    ResourceCreateOrEdit,
  },
}
</script>

<style lang="scss" scoped>
  .el-table {
    margin-top: 20px;
  }
</style>