<script setup lang="ts">
    import { ref, computed } from 'vue';
    import { RouterLink } from 'vue-router';
    import Quiz_component from '@/components/quiz.vue';
    import { useDatabaseStore } from "@/stores/database";

    interface Quiz {
        id: number;
        diff: string;
        lec: string;
    }

    //----database------------------------------------
    const databaseStore = useDatabaseStore();

    const quizes = computed(
        (): (Array<Quiz> | undefined) => {
            return databaseStore.getQuiz(props.lang);
        }
    )


    //-----props---------------------------------------
    interface Props {
        lang: string;
    }
    const props = defineProps<Props>();

    //-------tabs--------------------------------------
    let active = ref('1');

    const changClass = ( num:string ):void => {
        active.value = num;
    };

    //--------quiz------------------------------------


</script>

<template>
    <main class="main">
        <div class="main_inner wrapper">
            <section class="tabs">
                <ul class="tab">
                    <li v-on:click="changClass('1')" v-bind:class="{ selected: active === '1' }" class="noactive">初級編</li>
                    <li v-on:click="changClass('2')" v-bind:class="{ selected: active === '2' }" class="noactive">中級編</li>
                    <li v-on:click="changClass('3')" v-bind:class="{ selected: active === '3' }" class="noactive">上級編</li>
                </ul>
            </section>
            <div class="contents">
                <template v-if="quizes != undefined" >
                    <template v-for="quiz in quizes" v-bind:key="quiz.id">
                        <Quiz_component v-if="quiz.diff === active" v-bind:lang="props.lang" v-bind:active="active" v-bind:lec="quiz.lec" />
                    </template>
                </template>
                <template v-else-if="quizes == undefined">
                    <h2>申し訳ございませんが、サーバーの不具合です。もうしばらくしてから再度アクセスをお願いします。</h2>
                </template>
            </div>
            <div class="btn">
                <RouterLink v-bind:to="{ name: 'Select' }">言語選択へ</RouterLink>
            </div>
        </div>
    </main>
</template>

<style scoped>

    /** main */
    .main {
        background: linear-gradient(-135deg, #EA28DC, #E41BCB, #8C05F2, #9839B4);
        color: white;
    }

    .main_inner {
        padding-top: 100px;
    }

    .tab {
        display: flex;
    }

    .tab > li {
        border-radius: 15px;
        padding: 10px 20px 20px 20px;
    }

    .noactive {
        background-color: #333333;
        color: #fff;
    }

    .selected {
        background-color: #FAF8DD;
        color: #333333;
    }

    .contents {
        display: grid;
        gap: 60px;
        grid-template-columns: repeat(5, 1fr);
        position: relative;
        background-color: #FAF8DD;
        color: #333333;
        margin-top: -15px;
        padding: 40px;
        margin-bottom: 60px;
        box-shadow: 6px 6px 10px 0px rgba(0, 0, 0, .3);
        border-radius: 5px;
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

    .btn > a::before {
        position: relative;
        content: '\f359';
        font-family: "Font Awesome 6 Free";
        font-weight: 400;
        right: 5px;
        transition: all 0.5s;
    }

    .btn > a:hover::before {
        right: 15px;
    }

    @media screen and (max-width: 417px) {
        .contents {
            grid-template-columns: repeat(1, 1fr);
            padding: 80px;
        }
    }
</style>