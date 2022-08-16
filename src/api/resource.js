import request from "@/utils/request";

export const queryResource = (data = {}) => {
  return request({
    method: "POST",
    url: "/boss/resource/getResourcePages",
    data,
  });
};
// 获取指定id的资源信息
export const getResource = (id) => {
  return request({
    method: "GET",
    url: `/boss/resource/${id}`,
  });
};

// 保存资源
export const resourceSaveOrUpdate = (data) => {
  return request({
    method: "POST",
    url: `/boss/resource/saveOrUpdate`,
    data,
  });
};

// 删除指定id的资源
export const deleteResource = (id) => {
  return request({
    method: "DELETE",
    url: `/boss/resource/${id}`,
  });
};
