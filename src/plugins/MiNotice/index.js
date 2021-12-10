import Vue from 'vue';
import MiNotice from "./MiNotice.vue";

// 导出一个函数，且函数要实现动态性黄健并挂载MiNotice组件

//将组建的配置变成可以创建组件实例的构造函数
let MiNoticeConstructor =  Vue.extend(MiNotice);

export default {
	install: function(Vue) {
		Vue.prototype.$notice = function(text) {
			let instance = new MiNoticeConstructor({ data:{text:text} }).$mount();
			document.body.appendChild(instance.$el);
		}
	}
}
