<script setup lang="ts">
    import { ref, computed } from 'vue';
    import { RouterLink } from 'vue-router';
    import { useDatabaseStore } from "@/stores/database";
    import QuizText_component from "@/components/quiz_text.vue";
    import type { Question } from '@/interfaces';

    //------------scrollTop-------------------
    window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
    });

    //-----props---------------------------------------
    interface Props {
        lang: string;
        diff: string;
        lec: string;
    }
    const props = defineProps<Props>();


    //----database-------------------------------------

    const databaseStore = useDatabaseStore();

    const questions = computed(
        (): (Array<Question> | undefined ) => {
            return databaseStore.getQues(props.lang, props.diff, props.lec);
        }
    );

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

    //-----emit-------------------------------------------------------------
    let arrayNum = ref(['0', '0', '0', '0', '0']);
    let isError:boolean = false;
    const onSelectedActive = (active:string, num:number):void => {
        switch (num) {
            case 1:
                arrayNum.value[0] = active;
                break;
            case 2:
                arrayNum.value[1] = active;
                break;
            case 3:
                arrayNum.value[2] = active;
                break;
            case 4:
                arrayNum.value[3] = active;
                break;
            case 5:
                arrayNum.value[4] = active;
                break;
            default:
                break;
        }
        if(arrayNum.value.every((value:string):boolean => { return value !== '0' })) {
            isError = true;
        }
    }
</script>

<template>
    <main class="main">
        <template v-if=" questions !== undefined && questions.length != 0" >
            <div class="main_inner wrapper">
                <h2 class="title"><span class="difficulty">{{ difftojp }}</span>&nbsp;<span class="number">{{ lec }}</span></h2>
                    <template v-for="( question, index ) in questions" v-bind:key="question.id">
                        <QuizText_component v-on:selectedActive="onSelectedActive" v-bind:num="index + 1" v-bind:text="question.text" v-bind:one="question.one" v-bind:two="question.two" v-bind:three="question.three"/>
                    </template>
            </div>
            <div class="btn">
                <RouterLink v-bind:class="{ nopointer: !isError }" v-bind:to="{ name: 'Results', params: { lang: lang, diff: diff, lec: lec, results:arrayNum.join(',') } }">結果へ</RouterLink>
            </div>
            <p v-bind:class="{ nodis: isError }" class="dis">回答していない問題があります。</p>
        </template>
        <template v-else>
            <h3 class="error">問題の取得に失敗しました。もうしばらくしてから再度アクセスをお願いします。</h3>
        </template>
    </main>
</template>

<style scoped>
    .main {
        background: linear-gradient(-135deg, #EA28DC, #E41BCB, #8C05F2, #9839B4);
        color: white;
    }

    .main_inner {
        padding-top: 60px;
        margin-bottom: -60px;
    }

    .title {
        font-size: 1.5rem;
        text-align: center;
        margin-bottom: 20px;
    }

    .error {
        font-size: 1.2rem;
        height: 500px;
        text-align: center;
        padding-top: 250px;
    }

    .btn {
        text-align: center;
        padding-bottom: 60px;
    }

    .btn > a {
        display: inline-block;
        border: 1px solid rgba(255, 255, 255, .5);
        border-radius: 10px;
        padding: 5px 25px;
    }

    .btn > a:hover {
        opacity: .8;
    }

    .btn > a::after {
        position: relative;
        content: '\f35a';
        font-family: "Font Awesome 6 Free";
        font-weight: 400;
        left: 5px;
        transition: all 0.5s;
    }

    .btn > a:hover::after {
        left: 15px;
    }

    .dis {
        display: inline-block;
        position: relative;
        top: -30px;
        left: 50%;
        color: #f22323;
        border: 1px solid #e80f0f;
        border-radius: 6px;
        padding: 10px;
        background-color: #fabfbf;
        transform: translateX(-50%);
    }

    .dis::before {
        content: '\f071';
        font-family: 'Font Awesome 6 Free';
        font-weight: 900;
        margin-right: 10px;
    }

    .nodis {
        display: none;
    }

    .nopointer {
        pointer-events: none;
    }
</style>