import {stat} from "copy-webpack-plugin/dist/utils/promisify";

export default {
	namespaced: true,   // 让子仓库独立（隔离）
	modules: {},
	state: {
		isInit: false,  // 标识是否初始化过
		list: [],       // 当前登陆的地址列表数据
	},
	getters: {},
	mutations: {
		_init(state, list) {
			state.list = list;
			state.isInit = true;
		},
		_add(state, address) {
			state.list.push(address);
		},
		_update(state, address) {
			let i = state.list.findIndex(item => item.id === address.id);
			state.list.splice(i, 1, address);
		},
		_remove(state, id) {
			let i = state.list.findIndex(item => item.id === id);
			state.list.splice(i, 1);
		},
		_setDefault(state, id) {
			state.list.forEach(item => item.isDefault = item.id === id ? 1 : 0);
		},
	},
	actions: {
		init({ commit, state, rootState: { http }}) {
			if(state.isInit) return;
			http({ url: "/address/list" })
				.then(list => {
					commit("_init", list);
				})
				.catch(() => {});
		},
		add({rootState: {http}, commit}, address) {
			return http({
				method: "post",
				url: "/address/add",
				data: address
			})
				.then(id => commit("_add", Object.assign({}, address, {id} ) ));
			//  commit提交
			// Object.assign() 浅拷贝
		},
		update({rootState: {http}, commit}, address) {
			return http({
				method: "post",
				url: "/address/update",
				data: address
			})
				.then(() => commit("_update", address))
		},
		remove({ rootState: {http}, commit}, id) {
			return http({ url: "/address/remove/" + id })
					.then(() => commit("_remove", id))
		},
		setDefault({ rootState: {http}, commit}, id) {
			return http({ url: '/address/set_default/' + id })
				.then(() => commit('_setDefault', id));
		},
	}
}