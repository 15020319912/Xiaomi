<template>
    <MiDialog @close="close">
        <img :src="icon" />
        <p v-text="text"></p>
        <div>
            <button @click="ok">确定</button>
            <button @click="close">取消</button>
        </div>
    </MiDialog>
</template>

<script>
import MiDialog from '../MiDialog';
import icon from './icon.png';

export default {
    name: "MiConfirm",
    components: {
        MiDialog,
    },
    data() {
        return {
            icon,
            text: '',
            resolve: null,
            reject: null,
        }
    },
    methods: {
        ok() {
            this.resolve();
            this.$destroy(true);
            this.$el.parentNode.removeChild(this.$el);
        },
        close() {
            this.reject();
            this.$destroy(true);
            this.$el.parentNode.removeChild(this.$el);
        }
    }
}
</script>

<style scoped>
img {
    width: 120px;
    margin-top: 10px;
}
p {
    color: #DAA520;
}
button {
    padding: 5px 10px;
    font-size: 16px;
    color: #fff;
    background-color: royalblue;
    border: none;
    border-radius: 5px;
    margin-top: 10px;
    margin-bottom: 20px;
}
</style>