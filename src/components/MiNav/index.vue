<template>
    <ul class="nav">
        <li>
            <router-link to="/home">
                <p></p>
                <span>首页</span>
            </router-link>
        </li>
        <li>
            <router-link to="/category">
                <p></p>
                <span>分类</span>
            </router-link>
        </li>
        <li>
            <router-link to="/cart">
                <p></p>
                <span>购物车</span>
            </router-link>
        </li>
        <li>
            <router-link to="/profile">
                <p></p>
                <span>个人</span>
            </router-link>
        </li>
    
    
    </ul>
</template>

<script>
export default {
    name: "MiNav"
};
</script>

<style scoped>

ul.nav {
    font-size: 0;
    display: flex;
    height: 100%;
    align-items: center;
}

ul.nav li {
    width: 25%;
    height: 100%;
    
}

ul.nav li a {
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

ul.nav li p {
    width: 5.797101vw;
    height: 5.797101vw;
    background-image: url(./nav_bg.png);
    background-size: 100% auto;
}

ul.nav li span {
    font-size: 12px;
}

ul.nav li.active span {
    color: rgb(132, 95, 63);
}

ul.nav li:nth-child(1) p {
    background-position: 0 0;
}

ul.nav li:nth-child(1) a.active p {
    background-position: 0 14.2857%;
}

ul.nav li:nth-child(2) p {
    background-position: 0 28.5714%;
}

ul.nav li:nth-child(2) a.active p {
    background-position: 0 42.8571%;
}

ul.nav li:nth-child(3) p {
    background-position: 0 57.1429%;
}

ul.nav li:nth-child(3) a.active p {
    background-position: 0 71.4285%;
}

ul.nav li:nth-child(4) p {
    background-position: 0 85.7143%;
}

ul.nav li:nth-child(4) a.active p {
    background-position: 0 100%;
}

ul.nav li a.active span {
    color: rgb(132, 95, 63);
}

</style>