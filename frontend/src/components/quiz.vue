<script setup lang="ts">
import { computed } from 'vue';
import { RouterLink } from 'vue-router';
import { useDatabaseStore } from "@/stores/database";
import GoldImage from '@/assets/gold_b.png';
import SilverImage from '@/assets/silver_b.png';
import CopperImage from '@/assets/copper_b.png';

interface Props {
    lang: string;
    active: string;
    lec: string;
}

const props = defineProps<Props>();

//----database------------------------------------
const databaseStore = useDatabaseStore();

const correct_num = computed(
    ():number => {
        return databaseStore.getUserCorrectNum(props.lang, props.active, props.lec);
    }
)

//---------- medal --------------------------------------------------------------
let url:string;
let ratio:string;
let w:string;
let t:string;
if(correct_num.value === 5) {
    url = GoldImage;
    ratio = '4/5';
    w = '55px';
    t = '-15px';
} else if(correct_num.value === 4) {
    url = SilverImage;
    ratio = '4/6';
    w = '50px';
    t = '-20px';
} else if(correct_num.value === 3) {
    url = CopperImage;
    ratio = '4/6';
    w = '50px';
    t = '-20px';
}
</script>

<template>
    <div class="content">
        <RouterLink  class="quiz" v-bind:to="{ name: 'Answer', params: { lang: lang, diff: active, lec: lec } }">
            <span class="title">{{ lec }}</span>
            <p><span class="answer">{{ correct_num }}</span>/5</p>
        </RouterLink>
        <div v-bind:style="{ 'background-image': 'url(' + url + ')', 'aspect-ratio': ratio, 'width': w, 'top': t }" class="medal"></div>
    </div>
</template>

<style scoped>
    .content {
        position: relative;
        background: #fff;
        aspect-ratio: 1;
        border-radius: 15px;
        top: 0;
        box-shadow: 6px 6px 10px 0px rgba(0, 0, 0, .3);
        transition: all 0.5s;
    }

    .content:hover {
        top: -10px;
        box-shadow: 15px 15px 10px 0px rgba(0, 0, 0, .3);
    }

    .content > a {
        position: relative;
        display: inline-block;
        width: 100%;
        height: 100%;
    }

    .title {
        position: absolute;
        font-size: 2rem;
        top: 45%;
        left: 50%;
        transform: translate(-50%, -50%);
    }

    .content > a > p {
        position: absolute;
        left: 50%;
        bottom: 20%;
        transform: translateX(-50%);
    }

    .answer {
        font-size: 1.5rem;
    }

    .medal {
        content: '';
        display: inline-block;
        position: absolute;
        width: 50px;
        background-size: cover;
        top: -20px;
        right: -15px;
    }

    @media screen and (max-width: 417px) {
        .title, .answer {
            font-size: 2.4rem;
        }
    }
</style>