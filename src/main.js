import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ElementUI from "element-ui";
// import 'element-ui/lib/theme-chalk/index.css'
// 引入自定义的scss,已经包含了上面的内容
import "./styles/index.scss";

Vue.config.productionTip = false;
Vue.use(ElementUI);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
