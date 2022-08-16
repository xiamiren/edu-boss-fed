<template>
  <el-form ref="form" :model="formData" label-width="80px">
    <el-form-item label="菜单名称">
      <el-input v-model="formData.name"></el-input>
    </el-form-item>

    <el-form-item label="菜单路径">
      <el-input v-model="formData.href"></el-input>
    </el-form-item>

    <el-form-item label="上级菜单">
      <el-select v-model="formData.parentId" placeholder="请选择父级菜单">
        <el-option label="顶级菜单" :value="-1"> </el-option>
        <el-option
          v-for="menu in topMenus"
          :label="menu.name"
          :value="menu.id"
          :key="menu.key"
        ></el-option>
      </el-select>
    </el-form-item>

    <el-form-item label="描述">
      <el-input v-model="formData.description"></el-input>
    </el-form-item>

    <el-form-item label="图标名称">
      <el-input v-model="formData.icon"></el-input>
    </el-form-item>

    <el-form-item label="是否显示">
      <el-radio-group v-model="formData.shown">
        <el-radio :label="true">是</el-radio>
        <el-radio :label="false">否</el-radio>
      </el-radio-group>
    </el-form-item>

    <el-form-item label="排序">
      <el-input v-model="formData.orderNum"></el-input>
    </el-form-item>

    <el-form-item>
      <el-button type="primary" @click="onSubmit">立即创建</el-button>
      <el-button>取消</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import { getAllMenus, createOrUpdateMenu, getEditMenuInfo } from '@/api/menu'
export default {
  name: 'MenuCreateOrEdit',
  data() {
    return {
      formData: {
        id: undefined,
        parentId: -1,
        name: '',
        href: '',
        icon: '',
        orderNum: 0,
        description: '',
        shown: true,
      },
      topMenus: [],
      isCreate: undefined,
    }
  },
  created() {
    // this.loadMenu() //获取顶级菜单信息
    this.isCreate = !this.$route.params.id
    this.loadEditMenuInfo() //获取要编辑的菜单信息
  },
  computed: {
    msg() {
      return this.isCreate ? '创建' : '编辑'
    },
  },
  methods: {
    // loadMenu() {
    //   getAllMenus().then((res) => {
    //     console.log(res)
    //     if ((res.data.code = '000000')) {
    //       this.topMenus = res.data.data.filter((item) => item.level === 0)
    //     } else {
    //       this.$message.error('创建菜单时,获取所有信息失败')
    //     }
    //   })
    // },
    onSubmit() {
      createOrUpdateMenu(this.formData).then((res) => {
        console.log(res)
        if (res.data.data) {
          this.$message.success(`${this.msg}菜单成功`)
          this.$router.push({ name: 'menus' })
        } else {
          this.$message.error('添加菜单失败')
        }
      })
    },
    // 获取要编辑菜单的信息,同时获取顶层菜单的信息
    loadEditMenuInfo() {
      const { id = -1 } = this.$route.params
      getEditMenuInfo(id).then((res) => {
        console.log(res)
        if (res.data.code === '000000') {
          // 如果获取数据成功则保存到FormData中
          const { menuInfo, parentMenuList } = res.data.data
          Object.assign(this.formData, menuInfo)
          this.topMenus = parentMenuList
        } else {
          this.$message.error('获取编辑菜单信息失败')
        }
      })
    },
  },
}
</script>

<style lang="scss" scoped>
  .el-form {
    padding: 70px;
  }
</style>