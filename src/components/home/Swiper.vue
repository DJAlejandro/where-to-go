<!-- The ref attr used to find the swiper instance -->
<template>
    <div class="wrapper">
        <swiper :options="swiperOption">
            <swiper-slide v-for="item in swiperList" :key="item.id">
                <img class="swiper-img" :src="item.imgUrl" />
            </swiper-slide>
            <div class="swiper-pagination" slot="pagination"></div>
        </swiper>
    </div>
</template>

<script>
import "swiper/dist/css/swiper.css";

export default {
    name: "HomeSwiper",
    props: ["swiperList"],
    data() {
        return {
            swiperOption: {
                pagination: ".swiper-pagination",
                loop: true
            }
        };
    }
};
</script>


<style lang="stylus" scoped>
.wrapper >>> .swiper-pagination-bullet-active {
    background: #fff;
}

.wrapper {
    overflow: hidden;
    width: 100%;
    height: 0;
    padding-bottom: 31.25%;
    background: #eee;

    .swiper-img {
        width: 100%;
    }
}
</style>
