<template>
  <el-tree
    :data="data"
    :props="defaultProps"
    @node-click="handleNodeClick"
    ref="menu-tree"
    show-checkbox
    default-expand-all
    :default-checked-keys="[]"
  ></el-tree>
</template>

<script>
import { getRoleMenus } from '@/api/role'
export default {
  name: 'RoleAllocMenu',
  props: {
    // 接受路由的属性
    roleId: {
      type: [String, Number],
      required: true,
    },
  },
  data() {
    return {
      roleMenu: '',
      data: [
        {
          label: '一级 1',
          children: [
            {
              label: '二级 1-1',
              children: [
                {
                  label: '三级 1-1-1',
                },
              ],
            },
          ],
        },
        {
          label: '一级 2',
          children: [
            {
              label: '二级 2-1',
              children: [
                {
                  label: '三级 2-1-1',
                },
              ],
            },
            {
              label: '二级 2-2',
              children: [
                {
                  label: '三级 2-2-1',
                },
              ],
            },
          ],
        },
        {
          label: '一级 3',
          children: [
            {
              label: '二级 3-1',
              children: [
                {
                  label: '三级 3-1-1',
                },
              ],
            },
            {
              label: '二级 3-2',
              children: [
                {
                  label: '三级 3-2-1',
                },
              ],
            },
          ],
        },
      ],
      defaultProps: {
        children: 'children',
        label: 'label',
      },
    }
  },
  created() {
    this.loadRoleMenus()
  },
  methods: {
    loadRoleMenus() {
      getRoleMenus(this.roleId).then((res) => {
        console.log(res)
        if (res.data.code === '000000') {
          this.roleMenu = res.data.data
          // 过滤数组中selected为true的id
          const checkedIds = this.getSelectedIds(res.data.data)
        } else {
          this.$message.error('获取角色分配的菜单失败~~~')
        }
      })
    },
    // 过滤数组中selected为true的id, 将符合条件的id以数组形式返回
    getSelectedIds(menuArr) {
      let ids = []
      menuArr.forEach((menu) => {
        // 判断是否有子菜单
        if (menu.subMenuList) {
          const tempArr = this.getSelectedIds(menu.subMenuList)
          ids = ids.concat(tempArr)
          // 子菜单不存在,并且menu为true的情况
        } else if (menu.selected) {
          ids.push(menu.id)
        }
      })
      return ids
    },
    handleNodeClick(data) {
      console.log(data)
    },
  },
}
</script>

<style>
</style>