<template>
    <div>
        <my-header></my-header>
        <swiper :swiperList="swiperList"></swiper>
        <my-nav :navList="navList"></my-nav>
        <recommend :recommendList="recommendList"></recommend>
        <weekend :weekendList="weekendList"></weekend>
    </div>
</template>

<script>
// @ is an alias to /src
import Header from "../components/home/Header";
import Swiper from "../components/home/Swiper";
import Nav from "../components/home/Nav";
import Recommend from "../components/home/Recommend";
import Weekend from "../components/home/Weekend";
import axios from "axios";
import { mapState } from "vuex";
export default {
    name: "home",
    components: {
        MyHeader: Header,
        Swiper,
        MyNav: Nav,
        Recommend,
        Weekend
    },
    data() {
        return {
            swiperList: [],
            navList: [],
            recommendList: [],
            weekendList: [],
            lastCity: ""
        };
    },
    methods: {
        getHomeInfo() {
            axios
                .get("/api/index.json?city=" + this.city)
                .then(this.getHomeInfoSucc);
        },
        getHomeInfoSucc(res) {
            res = res.data;
            if (res.ret && res.data) {
                const data = res.data;
                this.swiperList = data.swiperList;
                this.navList = data.iconList;
                this.recommendList = data.recommendList;
                this.weekendList = data.weekendList;
            }
        }
    },
    computed: {
        ...mapState(["city"])
    },
    mounted() {
        this.lastCity = this.city;

        this.getHomeInfo();
    },
    activated() {
        if (this.lastCity !== this.city) {
            this.lastCity = this.city;

            this.getHomeInfo();
        }
    }
};
</script>
