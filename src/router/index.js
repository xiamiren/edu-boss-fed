import Vue from "vue";
import VueRouter from "vue-router";
import Layout from "@/views/layout";
import Home from "@/views/home";
import About from "@/views/about";
import Error from "@/views/error";
import Login from "@/views/Login";
import store from "@/store";
import MenuIndex from "@/views/menu";
import MenuCreateOrEdit from "@/views/menu/create-or-edit";
import ResourceCategoryIndex from "@/views/resource-category";
import ResourceIndex from "@/views/resource";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "",
    component: Layout,
    meta: { requireAuth: true },
    children: [
      {
        path: "home",
        name: "home",
        component: Home,
        meta: { requireAuth: true },
      },
      {
        path: "about",
        name: "about",
        component: About,
        meta: { requireAuth: true },
      },
      {
        path: "/menus",
        name: "menus",
        component: MenuIndex,
      },
      {
        path: "/menu/create",
        name: "menu-create",
        component: MenuCreateOrEdit,
      },
      {
        path: "/menu/:id/edit",
        name: "menu-edit",
        component: MenuCreateOrEdit,
      },
      {
        path: "/resources",
        name: "resources",
        component: ResourceIndex,
      },
      {
        path: "/resource-category",
        name: "resource-category",
        component: ResourceCategoryIndex,
      },
      {
        path: "/roles",
        name: "roles",
        component: () => import("@/views/role"),
      },
      {
        path: "/role/:roleId/alloc-menu",
        name: "alloc-menu",
        component: () => import("@/views/role/alloc-menu"),
        props: true, //添加props可以把路由参数当做属性传递给组件
      },
    ],
  },
  {
    path: "/login",
    name: "login",
    component: Login,
    beforeEnter: (to, from, next) => {
      if (!store.state.tokenInfo) router.back();
      next();
    },
  },

  {
    path: "*", //之前的路由匹配不成功则显示这个错误页面
    name: "ErrorPage",
    component: Error,
  },
];
const router = new VueRouter({
  routes,
});

router.beforeEach((to, from, next) => {
  console.log(to, from);
  if (to.matched.some((r) => r.meta.requireAuth)) {
    if (!store.state.tokenInfo) {
      next({
        name: "login",
        query: {
          redirect: to.fullPath,
        },
      });
      return;
    }
  }
  next();
});
export default router;
