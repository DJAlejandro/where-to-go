<template>
    <div>
        <div class="header-abs" v-show="showAbs">
            <router-link to="/">
                <div class="header-abs-back iconfont">&#xe624;</div>
            </router-link>
        </div>
        <div class="header-fixed" :style="styleObj" v-show="!showAbs">
            <router-link to="/">
                <div class="header-fixed-back iconfont">&#xe624;</div>
            </router-link>
            <p>景点详情</p>
        </div>
    </div>
</template>

<script>
export default {
    name: "DetailHeader",
    data() {
        return {
            styleObj: {
                opacity: 0
            },
            showAbs: true
        };
    },
    methods: {
        handleScroll() {
            let sctop = document.documentElement.scrollTop;
            console.log(sctop);

            this.showAbs = sctop === 0 ? true : false;
            if (sctop > 50) {
                let opacity = sctop / 150;
                if (opacity > 1) {
                    opacity = 1;
                } else if (opacity <= 0) {
                    opacity = 0;
                }
                this.styleObj = { opacity };
            }
        }
    },
    activated() {
        window.addEventListener("scroll", this.handleScroll);
    },
    deactivated() {
        window.removeEventListener("scroll", this.handleScroll);
    }
};
</script>

<style lang="stylus" scoped>
@import '~styles/varibles.styl';

.header-abs {
    position: absolute;
    left: 0.2rem;
    top: 0.2rem;
    width: 0.8rem;
    height: 0.8rem;
    line-height: 0.8rem;
    border-radius: 0.4rem;
    text-align: center;
    background: rgba(0, 0, 0, 0.8);

    .header-abs-back {
        color: #fff;
        font-size: 0.4rem;
    }
}

.header-fixed {
    z-index: 2;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: $headerHeight;
    line-height: $headerHeight;
    text-align: center;
    color: #fff;
    background: $bgColor;
    font-size: 0.32rem;

    .header-fixed-back {
        position: absolute;
        top: 0;
        left: 0;
        width: 0.64rem;
        text-align: center;
        font-size: 0.4rem;
        color: #fff;
    }
}
</style>
