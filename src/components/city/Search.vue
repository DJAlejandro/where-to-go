<template>
    <div>
        <div class="search">
            <input v-model="cityName" class="search-input" type="text" placeholder="输入城市名或拼音" />
        </div>
        <div ref="search" class="search-content" v-show="cityName">
            <ul>
                <li
                    class="search-item border-bottom"
                    v-for="item in searchResult"
                    :key="item.id"
                    @click="changeCity(item.name)"
                >{{item.name}}</li>
                <li class="search-item border-bottom" v-show="hasData">没有找到匹配数据</li>
            </ul>
        </div>
    </div>
</template>

<script>
import Bscroll from "@better-scroll/core";
import { mapMutations } from "vuex";

export default {
    name: "CitySearch",
    props: {
        cities: Object
    },
    data() {
        return {
            searchResult: [],
            cityName: "",
            timer: null,
            hasData: false
        };
    },
    methods: {
        changeCity(data) {
            this.increment(data);
            this.$router.push("/");
            this.cityName = "";
        },
        ...mapMutations(["increment"])
    },
    created() {
        this.$nextTick(() => {
            if (!this.scroll) {
                this.scroll = new Bscroll(this.$refs.search, { click: true });
            } else {
                this.scroll.refresh();
            }
        });
    },
    watch: {
        cityName() {
            if (this.timer) {
                clearTimeout(this.timer);
            }
            if (!this.cityName) {
                this.searchResult = [];
                return;
            }

            this.timer = setTimeout(() => {
                const result = [];
                for (let key in this.cities) {
                    this.cities[key].forEach(item => {
                        if (
                            item.spell.indexOf(this.cityName) > -1 ||
                            item.name.indexOf(this.cityName) > -1
                        ) {
                            result.push(item);
                        }
                    });
                }
                this.searchResult = result;
                this.hasData = !this.searchResult.length;
            }, 10);
        }
    }
};
</script>

<style lang="stylus" scoped>
@import '~styles/varibles.styl';

.search {
    height: 0.72rem;
    padding: 0 0.1rem;
    background: $bgColor;

    .search-input {
        box-sizing: border-box;
        width: 100%;
        height: 0.62rem;
        padding: 0 0.1rem;
        line-height: 0.62rem;
        text-align: center;
        border-radius: 0.06rem;
        color: #666;
    }
}

.search-content {
    z-index: 1;
    overflow: hidden;
    position: absolute;
    top: 1.58rem;
    left: 0;
    right: 0;
    bottom: 0;
    background: #eee;

    .search-item {
        line-height: 0.62rem;
        padding-left: 0.2rem;
        background: #fff;
        color: #666;
    }
}
</style>

