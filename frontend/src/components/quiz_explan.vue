<script setup lang="ts">
    interface Props {
        num:number;
        quiz_text:string;
        explan_text:string;
        your_answer:string;
        correct_answer:string;
        judge:boolean;
    }

    defineProps<Props>();

</script>

<template>
    <div class="details">
        <div v-bind:class="{ corr: judge, incorr:!judge }" class="quiz">
            <p class="quiz_title">問題{{ num }}</p>
            <p class="quiz_text">{{ quiz_text }}</p>
            <p class="quiz_result">あなたの回答&nbsp;&nbsp;<span class="your_answer">{{ your_answer }}</span>&nbsp;&nbsp;&nbsp;&nbsp;正答&nbsp;&nbsp;<span class="correct_answer">{{ correct_answer }}</span></p>
        </div>
        <div class="answer_text">
            <p class="explan_title">解説</p>
            <p class="explan_text">{{ explan_text }}</p>
        </div>
    </div>
</template>

<style scoped>
    .details {
        background-color: #FAF8DD;
        color: #333333;
        border-radius: 10px;
        padding: 40px;
        box-shadow: 6px 6px 10px 0px rgba(0, 0, 0, .3);
        margin-bottom: 60px;
    }

    .quiz, .answer_text {
        background-color: #fff;
        border-radius: 10px;
        box-shadow: 6px 6px 10px 0px rgba(0, 0, 0, .3);
        padding: 20px;
        margin-bottom: 20px;
    }

    .quiz_title, .explan_title {
        display: inline-block;
        font-size: 1.2rem;
        border-bottom: 1px solid #333333;
        padding: 0 10px 5px 10px;
    }

    .quiz_text {
        padding: 20px 20px 80px 20px;
    }

    .quiz_result {
        text-align: end;
        padding-right: 20px;
    }

    .explan_text {
        padding: 20px;
    }

    .corr {
        background-color: #dffbdf;
    }

    .incorr {
        background-color: #fde6e6;
    }
</style>