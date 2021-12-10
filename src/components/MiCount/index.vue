<template>
    <div class="aaa">
        <button @click="$emit('change', count - 1)" :disabled="count === 1">-
        </button>
        <input type="text" :value="count" @change="inputChange">
        <button @click="$emit('change', count + 1)" :disabled="count === 10">+
        </button>
        <button @click="changeMsg('95588')">调用inject</button>
        <span v-text="postData.msg"></span>
    </div>
</template>

<script>
    export default {
        name: "MiCount",
        // 组件对外公开的属性，如果属性名是多个单词应采用骆驼命名法
        // props中对外公开的属性名不能和data以及computed中的键名同名冲突
        // props: ["count","maxCount"],
        props: {
            count: {
                required: true,
                type: Number
            },
            maxCount: {
                required: true,
                type: Number
            },
        },
        model: {
            prop:'count',
            event: 'change',
        },
        methods: {
            inputChange(e) {
                this.$emit('change', parseInt(e.target.value));
            }
        },
        inject: ["postData", "changeMsg"]
    }
</script>

<style scoped>

</style>