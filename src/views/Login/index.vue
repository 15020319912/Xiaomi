<template>
	<div>
		<input type="text" v-model.trim="name"/>
		<input type="password" v-model="pwd"/>
		<button @click="login">登录</button>
	</div>
</template>

<script>
    import axios from "axios";

    export default {
        name: "Login",
        data(){
            return {
                name: "",
                pwd: "",
            };
        },
        methods: {
            login(){
                this.$http({
                    method: "post",
                    url: "/user/login_pwd",
                    data: {
                        name: this.name,
                        pwd: this.pwd
                    }
                }).then(data => {
                    sessionStorage.setItem("token", data);
                    sessionStorage.setItem("user", this.name);
                    this.$router.replace("/cart");
                }).catch(() => {});


            }
        },
    }
</script>

<style scoped>

</style>
