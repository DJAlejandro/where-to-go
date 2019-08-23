<template>
    <div class="list" ref="wrapper">
        <div>
            <div class="title">当前城市</div>
            <div class="button-list">
                <div class="button-wrapper">
                    <div class="button">{{this.city}}</div>
                </div>
            </div>
            <div class="title">热门城市</div>
            <div class="button-list">
                <div class="button-wrapper" v-for="item in hot" :key="item.id">
                    <div class="button" @click="changeCity(item.name)">{{item.name}}</div>
                </div>
            </div>
            <template>
                <ul class="item-list" v-for="(city,key) in cities" :ref="key" :key="key">
                    <div class="title">{{key}}</div>
                    <li
                        class="item border-bottom"
                        v-for="item in city"
                        @click="changeCity(item.name)"
                        :key="item.id"
                    >{{item.name}}</li>
                </ul>
            </template>
        </div>
    </div>
</template>


<script>
import Bscroll from "@better-scroll/core";
import { mapState, mapMutations } from "vuex";
export default {
    name: "CityList",
    data() {
        return {
            activeIndex: 0
        };
    },
    props: {
        hot: Array,
        cities: Object,
        letter: String,
        cityScorllTop: Array
    },
    methods: {
        changeCity(data) {
            this.increment(data);
            this.$router.push("/");
        },
        ...mapMutations(["increment"])
    },
    computed: {
        ...mapState(["city"]),
        letters() {
            let arr = [];
            for (let item in this.cities) {
                arr.push(item);
            }
            return arr;
        }
    },
    watch: {
        cities() {
            /* 移动端因网速问题，会产生在未得到city.json的情况下，初始化Bscroll的情况。此时，cities为空数组，item-list渲染出的高度为0，无法触发页面滚动。因此将this.$nextTick设置在 cities值变化，也就是拿到city.json后，这时item-list渲染出的高度是正确的，足以滚动*/
            this.$nextTick(() => {
                if (!this.scrollList) {
                    this.scrollList = new Bscroll(this.$refs.wrapper, {
                        click: true,
                        probeType: 3
                    });
                    this.scrollList.on("scroll", pos => {
                        let scrollTop = 0;
                        scrollTop = Math.abs(Math.round(pos.y)) - 180;

                        for (
                            var i = 0;
                            i <= this.cityScorllTop.length - 1;
                            i++
                        ) {
                            if (scrollTop < this.cityScorllTop[0]) {
                                this.activeIndex = 0;
                            } else if (
                                scrollTop >
                                this.cityScorllTop[
                                    this.cityScorllTop.length - 1
                                ]
                            ) {
                                this.activeIndex =
                                    this.cityScorllTop.length - 1;
                            } else if (
                                this.cityScorllTop[i] < scrollTop &&
                                this.cityScorllTop[i + 1] > scrollTop
                            ) {
                                this.activeIndex = i + 1;
                            }
                        }

                        this.$emit("change", this.letters[this.activeIndex]);
                    });
                } else {
                    this.scrollList.refresh();
                }
            });
        },
        letter() {
            if (this.letter) {
                const element = this.$refs[this.letter][0];
                this.scrollList.scrollToElement(element);
            }
        }
    }
};
</script>

<style lang="stylus" scoped>
@import '~styles/varibles.styl';

.border-topbottom {
    &:before {
        border-color: #ccc;
    }

    &:after {
        border-color: #ccc;
    }
}

.border-bottom {
    &:before {
        border-color: #ccc;
    }
}

.list {
    overflow: hidden;
    position: absolute;
    top: 1.58rem;
    left: 0;
    right: 0;
    bottom: 0;

    .title {
        line-height: 0.54rem;
        background: #eee;
        padding-left: 0.2rem;
        color: #666;
        font-size: 0.26rem;
    }

    .button-list {
        overflow: hidden;
        padding: 0.1rem 0.6rem 0.1rem 0.1rem;

        .button-wrapper {
            float: left;
            width: 33.33%;

            .button {
                margin: 0.1rem;
                padding: 0.1rem 0;
                text-align: center;
                border: 0.02rem solid #ccc;
                border-radius: 0.06rem;
            }
        }
    }

    .item-list {
        .item {
            line-height: 0.76rem;
            padding-left: 0.2rem;
        }
    }
}
</style>

