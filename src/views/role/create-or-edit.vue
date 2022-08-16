<template>
  <el-dialog :title="currentTitle" :visible.sync="dialogFormVisible">
    <el-form :model="formData" v-loading="isLoading">
      <el-form-item label="角色名称" :label-width="formLabelWidth">
        <el-input v-model="formData.name" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="角色编码" :label-width="formLabelWidth">
        <el-input v-model="formData.code" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="描述" :label-width="formLabelWidth">
        <el-input type="textarea" v-model="formData.description"></el-input>
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
import { getRole, saveOrUpdate } from '@/api/role'
export default {
  name: 'RoleCreateOrEdit',
  data() {
    return {
      dialogFormVisible: false,
      formData: {
        code: '',
        id: undefined,
        name: '',
        description: '',
      },
      formLabelWidth: '120px',
      isCreate: true,
      isLoading: false,
    }
  },
  computed: {
    currentTitle() {
      return this.isCreate ? '添加角色' : '编辑角色'
    },
  },
  methods: {
    showAndInit(roleId) {
      this.isCreate = !roleId
      this.dialogFormVisible = true
      this.isLoading = true

      if (this.isCreate) {
        // 添加,把表单数据清空
        this.formData = {}
        this.isLoading = false
      } else {
        // 编辑,显示要编辑角色的信息
        getRole(roleId)
          .then((res) => {
            if (res.data.code === '000000') {
              let { code, name, id, description } = res.data.data
              this.formData = { code, name, id, description }
            }
          })
          .finally(() => {
            this.isLoading = false
          })
      }
    },
    onSubmit() {
      saveOrUpdate(this.formData).then((res) => {
        console.log(res)
        if (res.data.code === '000000') {
          this.$message.success(`${this.currentTitle}成功`)
          this.dialogFormVisible = false
          this.$emit('role-change')
        } else {
          this.$message.error(`${this.currentTitle}失败....`)
        }
      })
    },
  },
}
</script>

<style lang="scss" scoped>
</style>