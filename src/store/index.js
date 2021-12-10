// 创建vuex仓库对象并导出
import Vue from "vue";
import Vuex from "vuex";
import http from '../utils/http.js'
import address from "./address.js"  // 导入子仓库配置
;

Vue.use(Vuex);
// vuex仓库编码时，不要使用this关键字
const store = new Vuex.Store({
	// modules节点可以进行仓库拆分
	modules: {
		address,      // 子仓库
	},
	// state节点的值理论上可以是任意类型，但实际上一般是对象
	// state节点就是vuex仓库仓房数据的节点
	state: {
		http,
	},
	getters: {},
	mutations: {},
	actions: {}
});

export default store;