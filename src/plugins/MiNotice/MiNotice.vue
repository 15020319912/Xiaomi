<template>
    <p class="mi-notice" v-text="text"></p>
</template>

<script>
export default {
    name: "MiNotice",
    data() {
        return {
            text: "",
        };
    },
    mounted() {
        setTimeout(() => {
            this.$destroy(true);
            this.$el.parentNode.removeChild(this.$el);
        }, 1000)
    }
}
</script>

<style scoped>
    p.mi-notice {
        position: fixed;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        padding: 15px;
        background-color: #666;
        color: #fff;
        min-width: 50%;
        max-width: 80%;
    }
</style>