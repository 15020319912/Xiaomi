<template>
    <div>
        这是主页
        <button @click="$notice('弹出了')">点击弹出</button>
        <br>
        <button @click="$alert('对话框')">点击弹出对话框</button>
        <br>
        <button @click="$confirm('对话框???').then(() => $alert('你带你了确定')).catch(() => {});">弹出</button>

        <Child v-model="msg" :num.sync="a"></Child>

        <MiNav></MiNav>
    </div>
</template>

<script type="text/ecmascript-6">
    import MiNav from "@/components/MiNav";
    import Child from "../../Child.vue";

    export default {
        name: "Home",
        data() {
            return {
                msg: '张三',
                a: 100,
            }
        },
        components: {MiNav, Child},
        // 创建
        beforeCreate() {
            // 这里虽然有this，但是还不能通过this访问组件中的data，computed中的数据
            // 这里可以访问路由及路由携带的相关数据

        },
        created() {
            // 从路由中读取路由携带的数据保存起来后续使用
            // 注意：不要进行和dom相关的操作，因为这时候还没有dom
        },
        // 挂载
        beforeMount() {
            // 很少用
        },
        mounted() {
            // 发送ajax请求页面需要的初始数据
            // 可以进行dom操作
        },
        // 更新
        beforeUpdate() {
            // 可以在更新前，更具需要修改的data中的数据，再更新；
            // 不用担心在这里修改数据就，会导致更新死循环，vue承诺
            // 在这里修改data中的数据，会在本次更新生效，不会发生循环
        },
        updated() {
            //  可以做dom相关的操作，慎重做数据更新，控制不好会更新死循环
        },
        // 销毁
        beforeDestroy() {
            // 释放组件占用的资源和内存空间
            // 比如清除计时器
        },
        destroyed() {}

    };
</script>

<style scoped>

</style>