<template>
    <div class="mi-dialog" @click.self="$emit('close')">
        <div class="content">
            <slot></slot>
        </div>
    </div>
</template>

<script>
export default {
    name: "MiDialog",
}
</script>

<style scoped>
    .mi-dialog {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0,0,0, .3);
    }
    .mi-dialog>div {
        background-color: #f5f5f5;
        width: 50%;
        position: absolute;
        top: 40%;
        left: 50%;
        transform: translate(-50%, -50%);
        display: flex;
        flex-direction: column;
        align-items: center;
        border-radius: 5px;
    }
</style>