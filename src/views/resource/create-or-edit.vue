<template>
  <el-dialog :title="title" :visible.sync="dialogFormVisible">
    <el-form :model="resourceData" v-loading="isLoading">
      <el-form-item label="资源名称" :label-width="formLabelWidth">
        <el-input v-model="resourceData.name" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="资源路径" :label-width="formLabelWidth">
        <el-input v-model="resourceData.url" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="资源分类" :label-width="formLabelWidth">
        <el-select
          v-model="resourceData.categoryId"
          placeholder="请选择活动区域"
        >
          <el-option
            v-for="item in categorys"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="描述" :label-width="formLabelWidth">
        <el-input type="textarea" v-model="resourceData.description"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="onSubmit" :disabled="isLoading"
        >确 定</el-button
      >
    </div>
  </el-dialog>
</template>

<script>
import { getAllResourceCategory } from '@/api/resouce-category'
import { getResource, resourceSaveOrUpdate } from '@/api/resource'
export default {
  name: 'ResourceCreateOrEdit',
  data() {
    return {
      isCreate: true,
      dialogFormVisible: false,
      resourceData: {
        id: undefined,
        name: '',
        url: '',
        categoryId: 1,
        description: '',
      },
      formLabelWidth: '120px',
      categorys: [],
      isLoading: false,
    }
  },
  methods: {
    showAndInit(resourceId = 0) {
      this.dialogFormVisible = true
      this.isCreate = !resourceId
      getAllResourceCategory().then((res) => {
        if (res.data.code === '000000') {
          this.categorys = res.data.data
        }
      })
      if (this.isCreate) {
        // 新建
        this.resourceData = {
          id: undefined,
          name: '',
          url: '',
          categoryId: 1,
          description: '',
        }
      } else {
        this.isLoading = true
        // 编辑
        getResource(resourceId)
          .then((res) => {
            if (res.data.code === '000000') {
              this.resourceData = res.data.data
            }
          })
          .finally(() => {
            this.isLoading = false
          })
      }
    },
    onSubmit() {
      resourceSaveOrUpdate(this.resourceData)
        .then((res) => {
          if (res.data.code === '000000') {
            this.$message.success(`${this.title}资源成功`)
            this.$emit('resource-change')
          } else {
            this.$message.error(`${this.title}资源失败`)
          }
        })
        .finally(() => {
          this.dialogFormVisible = false
        })
    },
  },
  computed: {
    title() {
      return this.isCreate ? '创建' : '编辑'
    },
  },
}
</script>

<style lang="scss" scoped>
</style>