import Vue from "vue";
import router from "./router";
import "./assets/reset.css";
import "./assets/public.css";
import "./assets/fonts/iconfont.css";
import http from "@/utils/http.js";
import store from "./store";

// 统一导入插件
import miPlugins from './plugins/index.js';
Vue.use(miPlugins);

// 在Vue的prototype的属性上开辟一个$http属性
Vue.prototype.$http = http;

// 创建根实例
new Vue({
	el: "#app",
	router,    // router
	store,     // 引进来的仓库
	template: " <keep-alive include='List'><router-view></router-view></keep-alive> "
	
});