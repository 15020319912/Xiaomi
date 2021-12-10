import Vue from "vue";
import VueRouter from "vue-router";


Vue.use(VueRouter);

// 自定义配置路由地图
// 动态监听url的变化，动态渲染指定组件
let router = new VueRouter({
	linkActiveClass: "active",
	routes: [
		// 如果是/则跳到home
		{path: "/", redirect: "/home"},
		
		{path: "/category", component: () => import('../views/Category')},
		{path: "/home", component: () => import('../views/Home')},
		{path: "/cart", component: () => import('../views/cart')},
		{path: "/profile", component: () => import('../views/Profile')},
		{path: "/login", component: () => import('../views/Login')},
		{path: "/list/:cid/:title/:fid", component: () => import('../views/List')},
		{path: "/address", meta: { needAuth: true }, component: ()=> import("../views/Address")},
		// 所以的路由都带meta， needAuth表示需不需要验证
	]
});

// 全局路由守卫,使用beforeEach进行token登陆验证
router.beforeEach(function(to, from, next) {
	// 判断跳转的需不需要验证，并且判断登没登陆
	if(to.meta.needAuth && !sessionStorage.getItem('token')) {
		// 调用验证组件
		Vue.prototype.$loginAlert();
	} else next();
});

export default router;




