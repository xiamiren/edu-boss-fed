import request from "@/utils/request";

// 获取所有菜单的信息
export const getAllMenus = () => {
  return request({
    method: "GET",
    url: "/boss/menu/getAll",
  });
};

// 新增菜单 向服务器的菜单列表中添加一个数据
export const createOrUpdateMenu = (data) => {
  return request({
    method: "POST",
    url: "/boss/menu/saveOrUpdate",
    data,
  });
};

// 删除菜单
export const deleteMenu = (menuId = 0) => {
  return request({
    method: "DELETE",
    url: `/boss/menu/${menuId}`,
  });
};

// 获取编辑页面的信息
export const getEditMenuInfo = (MenuId) => {
  return request({
    method: "GET",
    url: "/boss/menu/getEditMenuInfo",
    params: {
      id: MenuId,
    },
  });
};
