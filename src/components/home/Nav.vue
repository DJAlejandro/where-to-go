<template>
    <div class="navs">
        <swiper :options="swiperOption">
            <swiper-slide v-for="(page, index) in pages" :key="index">
                <div class="nav" v-for="item of page" :key="item.id">
                    <div class="nav-img">
                        <img class="nav-img-content" :src="item.imgUrl" />
                    </div>
                    <p class="nav-desc">{{item.desc}}</p>
                </div>
            </swiper-slide>
        </swiper>
    </div>
</template>



<script>
export default {
    name: "HomeNav",
    props: ["navList"],
    data() {
        return {
            swiperOption: {
                autoplay: false
            }
        };
    },
    computed: {
        pages() {
            const pages = [];
            this.navList.forEach((item, index) => {
                const page = Math.floor(index / 8);
                if (!pages[page]) {
                    pages[page] = [];
                }
                pages[page].push(item);
            });
            return pages;
        }
    }
};
</script>


<style lang="stylus" scoped>
@import '~styles/varibles.styl';
@import '~styles/mixins.styl';

.navs >>> .swiper-container {
    height: 0;
    padding-bottom: 50%;
}

.navs {
    margin-top: 0.1rem;

    .nav {
        position: relative;
        overflow: hidden;
        float: left;
        width: 25%;
        height: 0;
        padding-bottom: 25%;

        .nav-img {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0.44rem;
            box-sizing: border-box;
            padding: 0.1rem;

            .nav-img-content {
                display: block;
                margin: 0 auto;
                height: 100%;
            }
        }

        .nav-desc {
            position: absolute;
            left: 0;
            right: 0;
            bottom: 0;
            height: 0.44rem;
            line-height: 0.44rem;
            text-align: center;
            color: $darkTextColor;
            ellipsis();
        }
    }
}
</style>
