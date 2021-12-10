<template>
    <div>
        <transition-group name="fade" tag="ul">
            <li v-for="item in list" :key="item.id">
                <h5 v-text="item.receiveName"></h5>
                <span v-text="item.receivePhone"></span>
                <p v-text="`${item.receiveRegion} ${item.receiveDetail}`"></p>
                <span v-if="item.isDefault === 1">默认地址</span>
                <span v-else @click="setDefault(item.id).then(() => {})">设为默认</span>
                <button class="btn-update" @click="beginUpdate(item)">修改</button>
                <button class="btn-remove" @click="removeHandler(item.id)">删除</button>
            </li>
        </transition-group>

        <button @click="beginAdd">新增</button>
        <div class="edit-dialog" v-show="isEdit">
            <div>
                <span>姓名：</span>
                <input v-model.trim="model.receiveName" class="name" type="text"/>
            </div>
            <div>
                <span>电话：</span>
                <input v-model.trim="model.receivePhone" class="phone" type="text"/>
            </div>
            <div>
                <span>地址：</span>
                <input v-model.trim="model.receiveRegion" class="region" type="text"/>
            </div>
            <div>
                <span>详细地址：</span>
                <input v-model.trim="model.receiveDetail" class="detail" type="text"/>
            </div>
            <div>
                <button class="btn-ok" @click="save">保存</button>
                <button class="" @click="isEdit = false">取消</button>
            </div>
        </div>

    </div>
</template>

<script>
import {mapState, mapActions} from 'vuex';

export default {
    name: "Address",
    data() {
        return {
            isEdit: false,   //标识是否进入编辑状态
            model: {
                id: 0,
                receiveName: '',
                receivePhone: '',
                receiveRegion: '',
                receiveDetail: '',
                isDefault: false
            },
        };
    },
    computed: {
        ...mapState("address", ["list"]),     // 映射，拿到子仓库的数据
    },
    mounted() {
        this.init();    // 通知仓库初始化数据
    },
    methods: {
        // 映射仓库里的方法
        ...mapActions("address", ["init", "remove", "add", "update", "setDefault"]),
        removeHandler(id) {
            this.$confirm('真删？')
                .then(() => this.remove(id))
                .then(() => this.$notice('删除成功'))
                .cache(() => {});
        },
        beginAdd() {
            this.model = {
                id: 0,
                receiveName: '',
                receivePhone: '',
                receiveRegion: '',
                receiveDetail: '',
                isDefault: false
            };
            this.isEdit = true;
        },
        beginUpdate(address) {
            this.model = { ...address };  //必须去壳 脱钩 不然没保存就修改了
            this.isEdit = true;
        },
        save() {
            this[this.model.id === 0 ? "add" : "update"](this.model)
                .then(() => {
                    this.$alert('编辑成功！');
                    this.isEdit = false;
                });
        }
    },
};
</script>

<style scoped>
/*  从没有到有  */
.fade-enter {
    opacity: 0;
}

.fade-enter-active {
    transition: all 3s;
}

.fade-enter-to {
    opacity: 1;
}

/*  从有到没有  */
.fade-leave {
    opacity: 1;
}

.fade-leave-active {
    transition: all 3s;
}

.fade-leave-to {
    opacity: 0;
}

.edit-dialog {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: #fff;
}
.edit-dialog div {
    display: flex;
    align-items: center;
    padding: 10px 20px;
}
.edit-dialog input {
    border: 1px solid #333;
    outline: none;
}



</style>