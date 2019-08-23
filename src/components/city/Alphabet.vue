<template>
    <div>
        <div class="show-banner" v-show="isShow">{{nowAlp}}</div>
        <ul class="list">
            <li
                class="item"
                :class="{active:key==nowKey}"
                v-for="(item,key) in cities"
                :ref="key"
                @click="handleLetterClick"
                @touchstart.prevent="handleTouchStart"
                @touchmove="handleTouchMove"
                @touchend="handleTouchEnd"
            >{{key}}</li>
        </ul>
    </div>
</template>

<script>
export default {
    name: "CityAlphabet",
    props: {
        letter2: String,
        cities: Object
    },
    data() {
        return {
            touchStatus: false,
            startY: 0,
            timer: null,
            nowKey: "A",
            moved: false,
            isShow: false,
            nowAlp: ""
        };
    },
    computed: {
        letters() {
            let arr = [];
            for (let item in this.cities) {
                arr.push(item);
            }
            return arr;
        }
    },
    watch: {
        letter2() {
            if (this.nowKey) {
                this.nowKey = this.letter2;
            }
        }
    },
    updated() {
        this.startY = this.$refs["A"][0].offsetTop;
    },
    methods: {
        handleLetterClick(e) {
            this.nowKey = e.target.innerText;
            this.$emit("change", this.nowKey);
        },
        handleTouchStart() {
            this.touchStatus = true;
        },
        handleTouchMove(e) {
            this.moved = true;
            this.isShow = true;
            if (this.touchStatus) {
                if (this.timer) {
                    clearTimeout(this.timer);
                }
                const touchY = e.touches[0].clientY - 79;
                const index = Math.floor((touchY - this.startY) / 20);
                if (index >= 0 && index < this.letters.length) {
                    this.nowAlp = this.nowKey = this.letters[index];
                }

                this.timer = setTimeout(() => {
                    this.$emit("change", this.nowKey);
                }, 16);
            }
        },
        handleTouchEnd(e) {
            this.touchStatus = false;
            this.isShow = false;
            if (!this.moved) {
                this.$emit("change", e.target.innerText);
            }
            this.moved = false;
        }
    }
};
</script>

<style lang="stylus" scoped>
@import '~styles/varibles.styl';

.show-banner {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 50px;
    height: 50px;
    transform: translate(-50%, -50%);
    line-height: 50px;
    border-radius: 10px;
    text-align: center;
    color: #fff;
    z-index: 1;
    background-color: #333;
}

.list {
    display: flex;
    flex-direction: column;
    justify-content: center;
    position: absolute;
    top: 1.58rem;
    right: 0;
    bottom: 0;
    width: 0.5rem;
    z-index: 2;

    .item {
        line-height: 0.4rem;
        text-align: center;
        color: $bgColor;

        &.active {
            color: red;
        }
    }
}
</style>

