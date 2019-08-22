<template>
    <div>
        <city-header></city-header>
        <city-search :cities="cities"></city-search>
        <city-list
            :cities="cities"
            :hot="hotCities"
            :letter="letter"
            :cityScorllTop="cityScorllTop"
            @change="handleLetterChange2"
        ></city-list>
        <city-alphabet :cities="cities" @change="handleLetterChange" :letter2="letter2"></city-alphabet>
    </div>
</template>

<script>
import axios from "axios";
import CityHeader from "../components/city/Header";
import CitySearch from "../components/city/Search";
import CityList from "../components/city/List";
import CityAlphabet from "../components/city/Alphabet";
export default {
    name: "City",
    components: {
        CityHeader,
        CitySearch,
        CityList,
        CityAlphabet
    },
    data() {
        return {
            cities: {},
            hotCities: [],
            letter: "",
            letter2: "",
            cityScorllTop: []
        };
    },
    methods: {
        getCityInfo() {
            axios.get("/api/city.json").then(this.handleGetCityInfoSucc);
        },
        handleGetCityInfoSucc(res) {
            res = res.data;
            if (res.ret && res.data) {
                const data = res.data;
                this.cities = data.cities;
                this.hotCities = data.hotCities;
                let len = 0;
                for (var key in this.cities) {
                    len = len + 27 + 38 * this.cities[key].length;
                    this.cityScorllTop.push(len);
                }
            }
        },
        handleLetterChange(letter) {
            this.letter = letter;
        },
        handleLetterChange2(letter2) {
            this.letter2 = letter2;
        }
    },
    mounted() {
        this.getCityInfo();
    }
};
</script>
