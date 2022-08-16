<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <el-button @click="handleDlg(0)">添加</el-button>
    </div>
    <el-table :data="resourceCategoryData" border style="width: 100%">
      <el-table-column type="index" label="编号" width="100" align="center">
      </el-table-column>
      <el-table-column prop="name" label="类别名称" width="180" align="center">
      </el-table-column>
      <el-table-column
        prop="createdTime"
        label="创建时间"
        align="center"
        :formatter="timeFormatter"
      >
      </el-table-column>
      <el-table-column prop="sort" label="排序" width="180" align="center">
      </el-table-column>
      <el-table-column label="操作" width="180" align="center">
        <template v-slot="scope">
          <el-button size="mini" @click="handleDlg(scope.row.id)"
            >编辑</el-button
          >
          <el-button size="mini" @click="handleDeleteCategory(scope.row.id)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <resouce-category-create-or-edit
      ref="categoryDlg"
      @changeCategory="loadAllResouceCategory"
    ></resouce-category-create-or-edit>
  </el-card>
</template>

<script>
import { getAllResourceCategory, deleteCategory } from '@/api/resouce-category'
import ResouceCategoryCreateOrEdit from './create-or-edit.vue'
import dayjs from 'dayjs'
export default {
  name: 'ResourceCategoryIndex',
  created() {
    this.loadAllResouceCategory()
  },
  data() {
    return {
      resourceCategoryData: [],
      tableData: [
        {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄',
        },
        {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄',
        },
        {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄',
        },
        {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄',
        },
      ],
    }
  },
  components: {
    ResouceCategoryCreateOrEdit,
  },
  methods: {
    // 封装组件内的加载资源类别方法
    loadAllResouceCategory() {
      getAllResourceCategory().then((res) => {
        if (res.data.code === '000000') {
          this.resourceCategoryData = res.data.data
        } else {
          this.$message.error('获取资源列表信息失败!')
        }
      })
    },
    timeFormatter(row, column, value, index) {
      return dayjs(value).format('YYYY-MM-DD')
    },
    handleDlg(categoryId = 0) {
      this.$refs.categoryDlg.showAndInit(categoryId)
    },
    // 删除资源类别的事件处理函数
    handleDeleteCategory(categoryId = 0) {
      this.$confirm('确定要删除这个资源类别吗?', '删除提示')
        .then(() => {
          deleteCategory(categoryId).then((res) => {
            if (res.data.data) {
              this.$message.success('删除资源类别信息成功!')
              this.loadAllResouceCategory()
            } else {
              this.$message.error('删除资源类别信息失败~')
            }
          })
        })
        .catch(() => {
          this.$message.info('删除资源类别动作取消!')
        })
    },
  },
}
</script>

<style lang="scss" scoped>
</style>