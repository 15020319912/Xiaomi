<template>
    <div>
        <template v-if="list.length > 0">
            <span v-show="mode ? '完成' :  '编辑' " @click="mode = !mode"></span>
            <ul @click="countChange">
                <li v-for="item in list" :key="item.id">
                    <input v-show="!mode" v-model="item.checked1" type="checkbox">       <!--普通状态-->
                    <input v-show="mode" v-model="item.checked2" type="checkbox">        <!--编辑状态-->
                    <h6 v-text="item.name"></h6>
                    <p>￥<span v-text="item.price"></span>.00</p>
<!--                    <button :data-id="item.id" :disabled="item.count === 1" class="btn-decrease">- -->
<!--                    </button>-->
<!--                    <span v-text="item.count"></span>-->
<!--                    <button :data-id="item.id" :disabled="item.count === 5" class="btn-increase">+-->
<!--                    </button>-->
<!--                    <MiCount :count="item.count" :max-count="5"></MiCount>-->
                    <p>合计：￥<span v-text="item.count * item.price"></span>.00</p>
                </li>
            </ul>
            <!--普通状态-->
            <div v-show="!mode">
                <input v-model="isCheckedAll" type="checkbox"> 全选
                <p>合计：￥<span v-text="total"></span>.00</p>
                <button :disabled="amount === 0">
                    结算 <span v-show="amount !== 0" v-text="`(${amount})`"></span>
                </button>
            </div>
            <!-- 编辑状态 -->
            <div v-show="mode">
                <input v-model="isCheckedAll" type="checkbox">全选
                <button>删除</button>
            </div>
        </template>
        <div v-else>
            <p>
                您的购物车为空，
                <router-link to="/home">去购物</router-link>
            </p>
        </div>
    
    </div>
</template>

<script>
import MiCount from '@/components/MiCount';

export default {
    name: "Cart",
    components: { MiCount },
    data() {
        return {
            mode: false,
            list: [],
        }
    },
    computed: {
        total() {
            var total = 0;
            this.list.forEach(item => {
                if (item.checked1) total += item.count * item.price;
            });
            return total;
        },
        amount() {
            var amount = 0;
            this.list.forEach(item => {
                if (item.checked1) amount += item.count;
            });
            return amount;
        },
        isCheckedAll: {
            get() {
                return this.list.every(item => item[this.mode ? "checked2" : "checked1"]);
            },
            set(value) {
                this.list.forEach(item => item[this.mode ? "checked2" : "checked1"] = value);
            }
        }
    },
    created() {
        this.$http({
            method: "post",
            url: "/cart/list",
        })
            .then(data => {
                data.forEach(item => {
                    item.checked1 = false;
                    item.checked2 = false;
                });
                this.list = data;
            })
            .catch(() => {
            });
        
        
    },
    methods: {
        countChange(e) {
            var id = parseInt(e.target.dataset.id);
            var url = `/cart/${e.target.classList.contains("btn-decrease") ? "decrease" : "increase"}/${id}`;
            this.$http({method: "post", url})
                .then(data => {
                    var target = this.list.find(item => item.id === id);
                    e.target.classList.contains("btn-decrease") ? target.count-- : target.count++;
                }).catch(() => {
            });
            
        }
    }
    
}
</script>

<style scoped>

</style>
