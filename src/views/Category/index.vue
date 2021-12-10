<template>
    <div class="container">
        <div class="header">
            分类
            <!--<img src="../images/search.png" alt="" />-->
        </div>
        <div class="content">
            <div class="left">
                <ul class="list-main">
                    <li v-for="item in listMain" :key="item.id"
                        :class="{ active : item.id === activeId }" @click="activeId = item.id">
                        <span v-text="item.name"></span>
                    </li>
                </ul>
            </div>
            <div class="right">
                <img :src="avatar" class="avatar"/>
                <ul v-if="listSub.length > 0">
                    <li v-for="item in listSub" :key="item.id">
                        <router-link :to="`/list/${item.id}/${item.name}/${item.fid}`">
                            <img :src="item.avatar" alt="">
                            <span v-text="item.name"></span>
                        </router-link>
                    </li>
                </ul>
                <div v-else class="right-tontent">
                    <p class="tip">暂无相关商品，敬请期待..</p>
                    <ul class="list-sub"></ul>
                </div>
            </div>
        </div>
        <div class="footer">
            <MiNav></MiNav>
        </div>
    </div>
</template>

<script>
// 导入
import MiNav from "@/components/MiNav";

export default {
    name: "Category",
    components: {MiNav},
    data() {
        return {
            activeId: 0,    // 当前激活的一级分类的id
            listMain: [],    // 放一级分类数据
            listSub: [],
        };
    },
    // 计算属性
    computed: {
        avatar: function() {
            return this.activeId ? this.listMain.find(item => item.id === this.activeId).avatar : "";
        }
    },
    watch: {
        activeId: function(newValue, oldValue) {
            this.$http({url: "/category/list/" + newValue})
                .then(data => this.listSub = data)
                .catch(() => {
                });
        }
        
    },
    created() {
        //发送ajax，请求页面的初始数据
        this.$http({url: '/category/list/0'})
            .then(data => {
                this.listMain = data;
                this.activeId = data[0].id;
            })
            .catch(() => {
            });
    }
};
</script>

<style scoped>

.container {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
}

.header {
    position: relative;
    height: 12vw;
    line-height: 12vw;
    flex-shrink: 0;
    text-align: center;
    font-size: 18px;
}

.header img {
    position: absolute;
    top: 2.3vw;
    right: 2.3vw;
    width: 8vw;
}

.content {
    display: flex;
    flex-grow: 1;
    border-top: 1px solid #f0f0f0;
    overflow: hidden;
}

.left {
    flex-shrink: 0;
    width: 24.8vw;
    overflow: auto;
}

ul.list-main {
}

ul.list-main li {
    text-align: center;
    padding-bottom: 13px;
    padding-top: 13px;
    font-size: 16px;
    color: rgb(119, 119, 119);
}

ul.list-main li.active span {
    background-color: rgb(208, 139, 48);
    padding: 3px 8px;
    color: #fff;
    border-radius: 15px;
}

.left::-webkit-scrollbar,
.right::-webkit-scrollbar {
    display: none;
}

.right {
    flex-grow: 1;
    background-color: rgb(246, 246, 246);
    overflow-y: auto;
}

.right-avatar {
    text-align: center;
    padding-top: 2.5vw;
}

.right-avatar img {
    width: 70.048309vw;
    height: 31.400966vw;
    border-radius: 10px;
}

.right-tontent {
    margin-top: 1.5vw;
}

ul.list-sub {
    margin-left: 2.5vw;
    padding: 0 2.5vw 2vw;
    box-sizing: border-box;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    width: 70.048309vw;
    background-color: #fff;
    border-radius: 10px;
}

ul.list-sub li {
    display: inline-block;
    font-size: 14px;
    text-align: center;
    padding: 2vw 0;
}

ul.list-sub li a {
    color: rgb(119, 119, 119);
}

ul.list-sub li a img {
    width: 17.63285vw;
}

ul.list-sub li a p {
}

p.tip {
    color: rgb(119, 119, 119);
    font-size: 14px;
    padding: 4vw;
}

.footer {
    height: 13.333333vw;
    flex-shrink: 0;
    background-color: #FFFFFF;
}

</style>