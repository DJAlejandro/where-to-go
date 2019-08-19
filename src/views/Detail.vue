<template>
    <div>
        <detail-banner
            :sightName="sightName"
            :bannerImg="bannerImg"
            :gallaryImgs="gallaryImgs"
            @open-gallary="openGallary"
        ></detail-banner>
        <transition name="fade">
            <gallary
                :isGalShow="isGalShow"
                @close-gallary="closeGallary"
                :gallaryImgs="gallaryImgs"
            ></gallary>
        </transition>
        <detail-header></detail-header>
        <detail-list :list="list"></detail-list>
    </div>
</template>

<script>
import DetailBanner from "../components/detail/Banner";
import DetailHeader from "../components/detail/Header";
import DetailList from "../components/detail/List";
import Gallary from "../components/detail/Gallary";
import Swiper from "../components/home/Swiper";

import axios from "axios";
export default {
    name: "Detail",
    components: {
        DetailBanner,
        DetailHeader,
        DetailList,
        Gallary
    },
    data() {
        return {
            sightName: "",
            bannerImg: "",
            gallaryImgs: [],
            list: [],
            isGalShow: false
        };
    },
    methods: {
        openGallary() {
            this.isGalShow = true;
        },
        closeGallary() {
            this.isGalShow = false;
        },
        getDetailInfo() {
            axios
                .get("/api/detail.json", {
                    params: {
                        id: this.$route.params.id
                    }
                })
                .then(this.handleGetDataSucc);
        },
        handleGetDataSucc(res) {
            res = res.data;
            if (res.ret && res.data) {
                const data = res.data;
                this.sightName = data.sightName;
                this.bannerImg = data.bannerImg;
                this.gallaryImgs = data.gallaryImgs;
                this.list = data.categoryList;
            }
        }
    },
    mounted() {
        this.getDetailInfo();
    },
    activated() {
        this.getDetailInfo();
    }
};
</script>

<style lang="stylus" scoped>
.fade-enter, .fade-leave-to {
    opacity: 0;
}

.fade-enter-active, .fade-leave-active {
    transition: opacity 1s;
}
</style>
