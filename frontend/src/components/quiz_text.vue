<script setup lang="ts">
    import { ref } from 'vue';

    //-----------------------------------------------------------
    interface Props {
        num: number
        text:string;
        one: string;
        two: String;
        three: string;
    }

    const props = defineProps<Props>();

    //-------------------------------------------------------
    interface Emits {
        (event: "selectedActive", active:string, num:number):void;
    }

    const emit = defineEmits<Emits>();

    //--------------------------------------------------------
    let active = ref('0');
    const changeselect = (num: string) => {
        active.value = num;
        emit("selectedActive", active.value, props.num);
    }
</script>

<template>
    <div class="quizes">
        <div class="quiz">
            <p class="quiz_title">問題{{ num }}</p>
            <p class="quiz_text">{{ text }}</p>
        </div>
        <div class="selects">
            <div v-on:click="changeselect('1')" v-bind:class="{ selected: active === '1' }" class="select">
                <p class="select_number">1</p>
                <p class="select_text">{{ one }}</p>
            </div>
            <div v-on:click="changeselect('2')" v-bind:class="{ selected: active === '2' }" class="select">
                <p class="select_number">2</p>
                <p class="select_text">{{ two }}</p>
            </div>
            <div v-on:click="changeselect('3')" v-bind:class="{ selected: active === '3' }" class="select">
                <p class="select_number">3</p>
                <p class="select_text">{{ three }}</p>
            </div>
        </div>
    </div>
</template>

<style scoped>
    .quizes {
        margin-bottom: 70px;
    }

    .quiz {
        background-color: #fff;
        border-radius: 15px;
        width: 80%;
        aspect-ratio: 4;
        color: #333;
        padding: 20px;
        margin: 0 auto;
        box-shadow: 6px 6px 10px 0px rgba(0, 0, 0, .3);
    }

    .quiz_title {
        display: inline-block;
        font-size: 1.3rem;
        border-bottom: 1px solid rgba(0, 0, 0, .5);
        padding: 0 5px 5px 5px;
    }

    .quiz_text {
        padding: 10px;
    }

    .selects {
        display: flex;
        justify-content: space-between;
        width: 80%;
        margin: 0 auto;
        padding-top: 30px;
        padding-bottom: 40px;
    }

    .select {
        position: relative;
        width: 23%;
        color: #333;
        background-color: #fff;
        border-radius: 15px;
        aspect-ratio: 1;
        padding: 20px;
        top: 0;
        box-shadow: 6px 6px 10px 0px rgba(0, 0, 0, .3);
        transition: all 0.5s;
    }

    .selected {
        background-color: #f7f4ca;
        top: -10px;
        box-shadow: 15px 15px 10px 0px rgba(0, 0, 0, .3);
    }

    .select:hover {
        top: -10px;
        box-shadow: 15px 15px 10px 0px rgba(0, 0, 0, .3);
    }

    .select_number {
        font-size: 1.5rem;
        text-align: center;
        margin-bottom: 5px;
    }

    @media screen and (max-width: 417px) {
        .selects {
            flex-direction: column;
            align-items: center;
        }

        .select {
            width: 50%;
           margin-bottom: 20px;
        }
    }
</style>