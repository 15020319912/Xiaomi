import Vue from 'vue';
import MiConfirm from "./MiConfirm.vue";

let MiConfirmConstructor = Vue.extend(MiConfirm);

export default {
	install: function(Vue) {
		Vue.prototype.$confirm = function(text) {
			return new Promise((resolve, reject) => {
				let instance = new MiConfirmConstructor({ data: { text, resolve, reject } }).$mount();
				document.body.appendChild(instance.$el);
			});
		}
	}
}