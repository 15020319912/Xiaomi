<template>
    <div class="list">
        <div class="list-wrapper">
            <div class="header">
                <div class="header-title">
                    <a @click="$router.back()"><img class="title-prev" src="" /></a>
                    <h3 v-text="title"></h3>
                    <img class="title-search" src="" />
                </div>
                <div class="header-list-wrapper" ref="category">
                    <ul class="header-list" ref="categoryScroll">
                        <li v-for="item in categoryList" :key="item.id" :class="{active: item.id === ajaxData.cid}">
                            <a @click="toggleCategory(item)">
                                <img :src="item.avatar" />
                                <p class="ellipsis" v-text="item.name"></p>
                            </a>
                        </li>
                    </ul>
                </div>
                <ul class="list-nav">
                    <li data-col="price" @click="changeOrder" :class="`${ajaxData.orderDir} ${ajaxData.orderCol === 'price' ? 'active' : ''}`" class="sort-price asc">价格</li>
                    <li data-col="sale" @click="changeOrder" :class="`${ajaxData.orderDir} ${ajaxData.orderCol === 'sale' ? 'active' : ''}`" class="sort-sale asc">销量</li>
                    <li data-col="rate" @click="changeOrder" :class="`${ajaxData.orderDir} ${ajaxData.orderCol === 'rate' ? 'active' : ''}`" class="sort-rate asc">评价</li>
                </ul>
            </div>
            <div class="content-wrapper" ref="scroll">
                <div class="content">
                    <ul class="list">
                        <li v-for="item in list" :key="item.id">
                            <router-link to="/detail">
                                <div class="item-left">
                                    <img :src="item.avatar" />
                                </div>
                                <div class="item-right">
                                    <div class="item-name" v-text="item.name"></div>
                                    <div class="item-introduce" v-text="item.brief"></div>
                                    <div class="item-price">
                                        ￥<span v-text="item.price"></span>
                                    </div>
                                    <div class="item-number">
                                        <span class="item-rate" v-text="`${item.rate}条评论`"></span>
                                        <span class="item-sale" v-text="`已售出${item.sale}宝贝`"></span>
                                    </div>
                                </div>
                            </router-link>
                        </li>
                    </ul>
                    <p class="tip" v-text="tip"></p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import IScroll from "iscroll/build/iscroll-probe.js";
    import imagesLoaded from "imagesloaded";
    export default {
        name: "List",
        data() {
            return {
                fid: 0,
                title: "",
                ajaxData: {
                    cid: 0,
                    name: "",
                    orderCol: "price",
                    orderDir: "asc",
                    pageSize: 6,
                },
                isLoading: false,
                hasMore: true,
                isTriggerLoadMore: false,
                categoryList: [],
                list: [],
            };
        },
        computed: {
            tip() {
                if(this.isLoading) return "--- 加载中 ---";
                else if(this.isTriggerLoadMore) return "--- 放手立即加载 ---";
                else if(this.hasMore) return "--- 上拉加载更多 ---";
                else if(this.list.length === 0) return "--- 暂无相关商品敬请期待 ---";
                else return "--- 没有更多商品 ---";
            }
        },
        methods: {
            _initOrRefreshCategoryScroll() {
                let fid = parseInt(this.$route.params.fid) || 1, cid = parseInt(this.$route.params.cid) || 17;
                if(this.fid !== fid) {
                    this.fid = fid;
                    this.ajaxData.cid = cid;
                    this.$http({ url: "/category/list/" + fid })
                        .then(data => {
                            this.categoryList = data;
                            this.$nextTick(() => {
                                let lis = this.$refs.categoryScroll.querySelectorAll('li'),
                                    lastLi = lis[lis.length - 1],
                                    left = lastLi.offsetLeft,
                                    width = lastLi.getBoundingClientRect().width;
                                this.$refs.categoryScroll.style.width = (left + width) + 'px';
                                if(this.categoryScroll) this.categoryScroll.refresh();
                                else {
                                    this.categoryScroll = new IScroll(this.$refs.category, {
                                        scrollX: true,
                                        scrollY: false,
                                        deceleration: 0.003,    // 阻尼系数
                                        snap: "li",
                                        click: true,        // 开启点击
                                    });
                                }
                                this.categoryScroll.scrollToElement('.active', 200);
                            });
                        });
                } else if(this.ajaxData.cid !== cid) {
                    this.ajaxData.cid = cid;
                    this.$nextTick(() =>  this.categoryScroll.scrollToElement('.active', 200) );
                }
            },
            changeOrder(e) {
                if(this.isLoading) { alert('您的操作太频繁了！'); return; }
                if(e.target.dataset.col === this.ajaxData.orderCol) {
                    this.ajaxData.orderDir = this.ajaxData.orderDir === "asc" ? "desc" : "asc";
                } else {
                    this.ajaxData.orderCol = e.target.dataset.col;
                }
            },
            _getData(isLoadMore = false) {
                this.isLoading = true;
                if (!isLoadMore) {
                    this.list = [];     // 清除
                    this.scroll && this.scroll.scrollTo(0, 0, 0);
                }
                this.$http({
                    method: "post",
                    url: "/product/list",
                    data: {...this.ajaxData, begin: this.list.length}
                })
                    .then(data => {
                        this.hasMore = data.length === this.ajaxData.pageSize;
                        setTimeout(() => {
                            this.list = [...this.list, ...data];
                            this.isLoading = false;
                            this._initOrRefreshScroll();
                        }, 1000)
                    });
            },
            _initOrRefreshScroll() {
                this.$nextTick(() => {
                    // 一定要等滚动区域加载完毕 高/宽 确定之后再托管给imagesLoaded
                    imagesLoaded(this.$refs.scroll, () => {
                        if(this.scroll !== null) {
                            this.scroll.refresh(); // 没new执行下面，new更新就可以了
                            return;
                        }
                        this.scroll = new IScroll(this.$refs.scroll, {
                            deceleration: 0.006, // 滑动阻力 设置阻尼系数
                            bounce: false, // 关闭边界会弹
                            probeType: 2, // 开启滚动监听
                            click: true
                        });
                        this.scroll.on("scroll", () => {
                            if (this.isLoading || !this.hasMore) return;
                            this.isTriggerLoadMore = this.scroll.maxScrollY - scroll.y === 0;
                        });
                        this.scroll.on("scrollEnd", () => {
                            if (this.isTriggerLoadMore) {
                                this.isTriggerLoadMore = false;
                                this.getDate(true);
                            }
                        });
                    });
                })
            },
            toggleCategory(category) {
                if(this.isLoading) { alert("您的操作太频繁了！"); return; }
                this.$router.replace(`/list/${category.id}/${category.name}/${category.fid}`);
            }
        },
        created() {
            this.scroll = null;
            this.categoryScroll = null;
        },
        activated() {
            this.title = this.$route.params.title || "电视机";
            this._initOrRefreshCategoryScroll();
        },
        // 组件内路由守卫
        beforeRouteUpdate(to, from, next) {
            this.title = to.params.title || "电视机";     // 切换title
            this.ajaxData.cid = parseInt(to.params.cid) || 17;  // 切换cid
            next();
        },
        beforeDestroy() {
            if(this.scroll) {
                this.scroll.destroy();
                this.scroll = null;
            }
            if(this.categoryScroll) {
                this.categoryScroll.destroy();
                // this.categoryScroll = null;
                this.categoryScroll();
            }
        },
        watch: {
            ajaxData: {
                deep: true,
                handler(newValue, oldValue) {
                    this._getData();
                }
            }
        }
    }
</script>

<style scoped>
    .list {
        height: 100%;
        width: 100%;
        position: relative;
    }
    .list-wrapper {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
    }
    .header {
        height: 46vw;
        flex-shrink: 0;
    }   
    .header-title {
        position: relative;
        height: 12vw;
        line-height: 12vw;
        text-align: center;
    }
    .header-title img {
        position: absolute;
        width: 8.2vw;
        height: 8.2vw;
    }
    img.title-prev {
        left: 2.5vw;
        top: 2vw;
    }
    img.title-search {
        right: 2.5vw;
        top: 2vw;
    }
    .header-title h6 {
        font-size: 18px;
        font-weight: 400;
    }
    .header-list-wrapper {
        overflow: hidden;
        touch-action: pan-x;
        flex-shrink: 0;
    }
    ul.header-list {
        display: flex;
    }
    ul.header-list li {
        flex-shrink: 0;
        width: 15.4vw;
        height: 21vw;
    }
    ul.header-list li a {
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
    }
    ul.header-list li.active img {
        border: 1px solid rgb(180, 115, 31);
    }
    ul.header-list img {
        width: 14.4vw;
        height: 14.4vw;
    }
    ul.header-list li.active p {
        color: rgb(180, 115, 31);
    }
    ul.header-list p {
        font-size: 12px;
        color: #777;
        margin-top: 1vw;
        width: 100%;
        text-align: center;
    }
    ul.list-nav {
        height: 10vw;
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 0;
    }
    ul.list-nav li {
        text-align: center;
        width: 33.3333%;
        font-size: 16px;
    }
    ul.list-nav li.active {
        color: rgb(180, 115, 31);
        font-weight: bold;
    }
    ul.list-nav li.asc {}
    .content-wrapper {
        flex-grow: 1;
        overflow: hidden;
        touch-action: pan-y;
    }
    ul.list {}
    ul.list li {
        padding: 2.5vw;
    }
    ul.list li a {
        display: flex;
    }

    .item-left {
        width: 33.5748vw;
        height: 150px;
    }

    .item-left img {
        width: 33.5748vw;
    }

    .item-right {
        flex-grow: 1;
    }

    .item-name {
        height: 8vw;
        line-height: 8vw;
        font-size: 16px;
        color: #333;
    }

    .item-introduce {
        padding: 1.5vw 0;
        font-size: 12px;
        color: #B0B0B0;
    }

    .item-price {
        font-size: 12px;
        color: red;
        padding-bottom: 1.5vw;
    }

    .item-price span {
        font-size: 16px;
    }

    .item-number {
        font-size: 12px;
        color: #B0B0B0;
    }

    .item-rate {
        padding-right: 1vw;
        border-right: 1px solid #B0B0B0;
    }
    p.tip {
        height: 15vw;
        line-height: 15vw;
        text-align: center;
        font-size: 14px;
        color: #B0B0B0;
    }

</style>
