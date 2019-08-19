<template>
    <div>
        <div class="banner" @click="showGallary">
            <img class="banner-img" :src="bannerImg" />
            <div class="banner-info">
                <div class="banner-title">{{this.sightName}}</div>
                <div class="banner-number">
                    <div class="banner-icon">
                        <span class="iconfont banner-icon">&#xe692;</span>
                        {{this.gallaryImgs.length}}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "DetailBanner",
    props: ["bannerImg", "sightName", "gallaryImgs"],
    data() {
        return {
            isShow: false
        };
    },
    methods: {
        showGallary() {
            this.$emit("open-gallary");
        }
    }
};
</script>

<style lang="stylus" scoped>
.banner {
    position: relative;
    overflow: hidden;
    height: 0;
    padding-bottom: 55%;

    .banner-img {
        width: 100%;
    }

    .banner-info {
        display: flex;
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0;
        line-height: 0.6rem;
        color: #fff;
        background-image: linear-gradient(to top, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.8));

        .banner-title {
            flex: 1;
            font-size: 0.32rem;
            padding: 0 0.2rem;
        }

        .banner-number {
            height: 0.32rem;
            line-height: 0.32rem;
            margin-top: 0.14rem;
            padding: 0 0.4rem;
            border-radius: 0.2rem;
            background: rgba(0, 0, 0, 0.8);
            font-size: 0.24rem;

            .banner-icon {
                font-size: 0.24rem;
            }
        }
    }
}
</style>
