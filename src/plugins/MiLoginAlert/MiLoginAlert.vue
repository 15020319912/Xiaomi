<template>
    <MiDialog>
        <p>这里是一大堆说明</p>
        <button @click="gotoLogin">同意</button>
        <button @click="close">不同意</button>
    </MiDialog>
</template>

<script>
import MiDialog from '../MiDialog';
import router from '@/router';

export default {
    name: "MiLoginAlert",
    components: { MiDialog },
    methods: {
        gotoLogin() {
            router.replace('/login');
            this.close();
        },
        close() {
            this.$destroy(true);
            this.$el.parentNode.removeChild(this.$el);
        }
    }
}
</script>

<style scoped>

</style>