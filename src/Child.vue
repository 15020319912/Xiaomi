<template>
    <div>
        <p v-text="msg"></p>
        <button @click="$emit('aaa', '李思思')">李思思</button>
        <p v-text="num"></p>
        <button @click="$emit('update:num', 101)">101</button>

    </div>
</template>

<script>
export default {
    name: "Child",
    props: ['msg', 'num'],
    model: {
        prop: 'msg',
        event: 'aaa'
    }

}
</script>

<style scoped>

</style>