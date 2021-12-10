import Vue from 'vue';
import MiLoginAlert from "./MiLoginAlert";

let MiLoginAlertConstructor = Vue.extend(MiLoginAlert);

export default {
	install: function(Vue) {
		// 但凡发现没登陆就调用$loginAlert
		Vue.prototype.$loginAlert = function(text) {
			let instance = new MiLoginAlertConstructor().$mount();
			document.body.appendChild(instance.$el);
		}
	}
}