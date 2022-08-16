import request from "@/utils/request";

// 获取所有资源类别
export const getAllResourceCategory = () => {
  return request({
    method: "GET",
    url: "/boss/resource/category/getAll",
  });
};

// 新建或更新资源类别信息
export const categoryCreateOrUpdate = (data) => {
  return request({
    method: "POST",
    url: "/boss/resource/category/saveOrderUpdate",
    data,
  });
};

// 删除某条资源信息
export const deleteCategory = (categoryId) => {
  return request({
    method: "DELETE",
    url: `/boss/resource/category/${categoryId}`,
  });
};
