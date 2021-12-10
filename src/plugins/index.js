// 在这里统一导入导出简化main.js
import notice from './MiNotice';
import alert from './MiAlert';
import confirm from './MiConfirm';
import loginAlert from './MiLoginAlert';

export default {
	install: function(Vue) {
		Vue.use(notice);
		Vue.use(alert);
		Vue.use(confirm);
		Vue.use(loginAlert);
	}
}

