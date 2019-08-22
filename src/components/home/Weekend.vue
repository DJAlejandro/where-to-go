<template>
    <div>
        <div class="title">周末去哪儿</div>
        <ul>
            <li v-for="item in weekendList" :key="item.id">
                <div class="item-img-wrapper">
                    <img class="item-img" :src="item.imgUrl" />
                </div>
                <div class="item-info">
                    <div class="item-title">{{item.title}}</div>
                    <div class="item-desc">{{item.desc}}</div>
                </div>
            </li>
        </ul>
    </div>
</template>

<script type="text/javascript">
export default {
    name: "HomeWeekend",
    props: ["weekendList"]
};
</script>
<style lang="stylus" scoped>
@import '~styles/mixins.styl';

.title {
    line-height: 0.8rem;
    background: #eee;
    text-indent: 0.2rem;
}

.item-img-wrapper {
    overflow: hidden;
    height: 0;
    padding-bottom: 37.09%;

    .item-img {
        width: 100%;
    }
}

.item-info {
    padding: 0.1rem;

    .item-title {
        line-height: 0.54rem;
        font-size: 0.32rem;
        ellipsis();
    }

    .item-desc {
        line-height: 0.4rem;
        color: #ccc;
        ellipsis();
    }
}
</style>
