<template>
  <el-dialog :title="title" :visible.sync="dialogFormVisible">
    <el-form :model="categoryData">
      <el-form-item label="名称" :label-width="formLabelWidth">
        <el-input v-model="categoryData.name" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="排序" :label-width="formLabelWidth">
        <el-input v-model="categoryData.sort" autocomplete="off"></el-input>
      </el-form-item>
    </el-form>

    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="onSubmit">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import {
  categoryCreateOrUpdate,
  getAllResourceCategory,
} from '@/api/resouce-category'
export default {
  name: 'ResouceCategoryCreateOrEdit',
  data() {
    return {
      dialogFormVisible: false,
      isCreate: true,
      categoryData: { id: undefined, name: '', sort: 0 },
      formLabelWidth: '120px',
    }
  },
  computed: {
    title() {
      return this.isCreate ? '创建' : '编辑'
    },
  },
  methods: {
    showAndInit(categoryId = 0) {
      this.isCreate = categoryId < 1 //如果id小于1则是创建
      this.dialogFormVisible = true
      if (this.isCreate) {
        this.categoryData = { id: undefined, name: '', sort: 0 }
      } else {
        getAllResourceCategory().then((res) => {
          if (res.data.code === '000000') {
            const categoryData = res.data.data.find(
              (item) => item.id === categoryId
            )
            this.categoryData = categoryData
          }
        })
      }
    },
    onSubmit() {
      categoryCreateOrUpdate(this.categoryData).then((res) => {
        if (res.data.data) {
          this.$message.success(`${this.title}资源成功!`)
          this.$emit('changeCategory') //通知父组件需要刷新数据
        } else {
          this.$message.error(`${this.title}资源失败~`)
        }
        this.dialogFormVisible = false
      })
    },
  },
}
</script>

<style lang="scss" scoped>
</style>