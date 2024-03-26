<script setup lang="ts">
import { computed, ref } from 'vue';
import { useDatabaseStore } from '@/stores/database';
import { RouterLink } from 'vue-router';
import Explan_component from '@/components/quiz_explan.vue';
import GoldImage from '@/assets/gold_b.png';
import SilverImage from '@/assets/silver_b.png';
import CopperImage from '@/assets/copper_b.png';
import type { Question } from '@/interfaces';

//------------scrollTop-------------------
window.scrollTo({
    top: 0,
    left: 0,
    behavior: 'smooth'
});

//-----------props------------------------
interface Props {
    lang:string;
    diff:string;
    lec:string;
    results:string;
}

const props = defineProps<Props>();

//--------correct------------------------

const databaseStore = useDatabaseStore();

const questions = computed(
    (): (Array<Question> | undefined ) => {
        return databaseStore.getQues(props.lang, props.diff, props.lec);
    }
);

const results = props.results.split(',');

let correct_num = ref(0);
const judge = results.map((values, index) => {
    if(questions.value !== undefined && values === String(questions.value[index].correctans)) {
        correct_num.value++;
        return true;
    } else {
        return false;
    }
});

//-----user-------------------------------------------------------------

const user = computed(
    (): number => {
        return databaseStore.getUserCorrectNum(props.lang, props.diff, props.lec);
    }
);

if(user.value < correct_num.value) {
    databaseStore.updata(props.lang, props.diff, props.lec, correct_num.value);
}

//-----------難易度を日本語に変換-----------------------------------------
let difftojp = ref('');
switch (props.diff) {
    case '1':
        difftojp.value = "初級編";
        break;
    case '2':
        difftojp.value = "中級編";
        break;
    case '3':
        difftojp.value = "上級編";
        break;
    default :
        difftojp.value = "初級編";
}

//---------- medal --------------------------------------------------------------
let url:string;
let ratio:string;
if(correct_num.value === 5) {
    url = GoldImage;
    ratio = '4/5';
} else if(correct_num.value === 4) {
    url = SilverImage;
    ratio = '4/6';
} else if(correct_num.value === 3) {
    url = CopperImage;
    ratio = '4/6';
}
//----------progressbar---------------------------------------------------
const bar = ref('0');
const bgProgress = ref('1');
const bgdisplay = ref('block');
setTimeout(()=>{
    bar.value = '1';
    setTimeout(()=>{
        bgProgress.value = '0';
        setTimeout(()=>{
            bgdisplay.value = 'none';
        }, 800);
    }, 1200);
}, 500);

//--------------- next_lecture -----------------------------------------------
function nextLecture(lec:string):string {
    const str = lec.split('');
    let f_i = parseInt(str[0]);
    let t_i = parseInt(str[2]);
    const array:Array<number> = [f_i, t_i];

    if(t_i === 5) {
        array[0] = f_i + 1;
        array[1] = 1;
    } else {
        array[1]++;
    }
    str[0] = String(array[0]);
    str[2] = String(array[1]);

    return str.join('');
}



</script>

<template>
    <main class="main">
        <div v-bind:style="{ opacity: bgProgress, display: bgdisplay }" id="progress"><div v-bind:style="{ transform: 'scaleX(' + bar + ')' }" id="bar"></div></div>
        <div class="main_inner wrapper">
            <div class="results">
                <h2 class="result_title">結果画面 - <span class="difficulty">{{ difftojp }}</span><span class="number">{{ lec }}</span></h2>
                <div class="result_text"><p>正答数 <span class="answer"> {{ correct_num }} </span> / 5 </p></div>
                <div v-bind:style="{ 'background-image': 'url(' + url + ')', 'aspect-ratio': ratio }" class="medal"></div>
            </div>
            <template v-for="( question, index ) in questions" v-bind:key="question.id">
                <Explan_component v-bind:num="index+1" v-bind:quiz_text="question.text" v-bind:explan_text="question.explan_text" v-bind:your_answer="results[index]" v-bind:correct_answer="String(question.correctans)" v-bind:judge="judge[index]"/>
            </template>
            <ul class="main_pagination">
                <li><RouterLink v-bind:to="{ name: 'Select' }" class="btn back">クイズ一覧へ戻る</RouterLink></li>
                <template v-if=" (diff !== '3' || lec !== '1-2') && (lec !== '1-5')">
                    <li><RouterLink v-bind:to="{ name: 'Answer', params: { lang: lang, diff: diff, lec: nextLecture(lec) } }" class="btn next">次の問題へ</RouterLink></li>
                </template>
            </ul>
        </div>
    </main>
</template>

<style scoped>
    .main {
        background: linear-gradient(-135deg, #EA28DC, #E41BCB, #8C05F2, #9839B4);
        color: white;
        padding-top: 60px;
        padding-bottom: 100px;
    }

    .results {
        position: relative;
        background-color: #FAF8DD;
        color: #333333;
        padding: 40px;
        border-radius: 10px;
        box-shadow: 6px 6px 10px 0px rgba(0, 0, 0, .3);
        margin-bottom: 60px;
    }

    .medal {
        content: '';
        display: inline-block;
        position: absolute;
        width: 120px;
        background-size: cover;
        top: -35px;
        right: -30px;
    }

    .result_title {
        text-align: center;
        font-size: 1.5rem;
        margin-bottom: 10px;
    }

    .result_text {
        background-color: #fff;
        text-align: center;
        border-radius: 10px;
        padding: 40px 80px;
        box-shadow: 6px 6px 10px 0px rgba(0, 0, 0, .3);
    }

    .result_text > p {
        border-bottom: 1px solid #333333;
        font-size: 1.2rem;
        padding: 10px 20px;
    }

    .answer {
        font-size: 2rem;
    }

    /** pagination */
    .main_pagination {
        display: flex;
        justify-content: space-around;
    }

    .btn {
        display: inline-block;
        border: 1px solid rgba(255, 255, 255, .5);
        padding: 10px 30px;
        border-radius: 10px;
        width: 100%;
        text-align: center;
    }

    .btn:hover {
        opacity: .8;
    }

    .back::before {
        content: '\f359';
        font-family: "Font Awesome 6 Free";
        font-weight: 400;
        position: relative;
        right: 5px;
        transition: all 0.3s;
    }

    .next::after {
        content: '\f35a';
        font-family: "Font Awesome 6 Free";
        font-weight: 400;
        position: relative;
        left: 5px;
        transition: all 0.3s;
    }

    .back:hover::before {
        right: 15px;
    }

    .next:hover::after {
        left: 15px;
    }

    /**progressbar */
    #progress {
        position: fixed;
        top: 0;
        width: 100vw;
        height: 100vh;
        background-color: #333333;
        z-index: 1;
        transition: all .8s;
    }

    #bar {
        display: inline-block;
        position: absolute;
        width: 100%;
        height: 8px;
        border-radius: 10px;
        background: linear-gradient(90deg, #8C05F2, #9839B4, #E41BCB);
        top: 50%;
        transform: translateY(-50%);
        transform-origin: left;
        transition: all 1s;
    }

    @media screen and (max-width:417px) {

        .main_pagination {
            flex-direction: column;
            text-align: center;
        }
        .btn {
            width: 80%;
            margin-bottom: 50px;
        }
    }

</style>