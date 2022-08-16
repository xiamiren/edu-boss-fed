import request from "@/utils/request";

// 按条件获取查询分页角色列表
export const queryRoles = (data = {}) => {
  return request({
    method: "POST",
    url: "/boss/role/getRolePages",
    data,
  });
};

// 获取指定id的角色信息
export const getRole = (id) => {
  return request({
    method: "GET",
    url: `/boss/role/${id}`,
  });
};
// 保存或更新角色
export const saveOrUpdate = (data) => {
  return request({
    method: "POST",
    url: `/boss/role/saveOrUpdate`,
    data,
  });
};

// 删除角色
export const deleteRole = (roleId) => {
  return request({
    method: "DELETE",
    url: `/boss/role/${roleId}`,
  });
};

// 获取角色所拥有的菜单信息
export const getRoleMenus = (roleId) => {
  return request({
    method: "GET",
    url: "/boss/menu/getRoleMenus",
    params: {
      roleId,
    },
  });
};
