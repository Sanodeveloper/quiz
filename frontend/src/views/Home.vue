<script setup lang="ts">
    import { RouterLink } from "vue-router";
</script>

<template>
    <main class="main">
        <section class="mainvisual">
            <div class="main_text wrapper">
                <div class="main_title">
                    <p>クイズ<span>で</span></p>
                    <p>分<span>かる</span></p>
                    <p>自分<span>の</span>レベル</p>
                </div>
                <div class="main_sub-title">
                    <p>いつでもどこでも<br>好きな場所好きな時間に<br>できるクイズです。</p>
                    <p>In your place, In your time</p>
                    <div class="btn main_btn">
                        <RouterLink v-bind:to="{ name: 'Select' }">はじめる</RouterLink>
                    </div>
                </div>
            </div>
        </section>
        <section class="quiz">
            <div class="wrapper">
                <h2 class="title">Quiz</h2>
                <p>このクイズは3つの選択肢の中から一つ選ぶ</p>
                <p>いわゆる3択クイズになっています。</p>
                <p>難易度は初級・中級・上級となっています。</p>
                <p>また、これらのクイズはすべて<span>無料</span>でご利用できます。</p>
                <p>ご自身の力試しとしてお使いください。</p>
                <div class="btn quiz_btn">
                    <RouterLink v-bind:to="{ name: 'Select' }">はじめる</RouterLink>
                </div>
            </div>
        </section>
        <section class="lang">
            <div class="wrapper lang_outer">
                <h2 class="title">Language</h2>
                <p>HTML CSS</p>
                <p>クイズで扱う言語はこの2つです。</p>
                <p>Webサイトを作るうえでなくてはならない言語です。</p>
                <div class="btn lang_btn">
                    <RouterLink v-bind:to="{ name: 'Select' }">はじめる</RouterLink>
                </div>
            </div>
        </section>
    </main>
</template>

<style scoped>
    /*base*/
    img {
        width: 100%;
        vertical-align: bottom;
    }

    /** main */
    .mainvisual {
        background: linear-gradient(90deg, #683AE6, #D13DE2);
        color: white;
        width: 100%;
        height: 100vh;
    }

    .main_text {
        display: flex;
        justify-content: space-between;
        height: 100%;
        align-items: center;
    }

    .main_title {
        font-size: 60px;
    }

    .main_title p {
        margin-bottom: 100px;
    }

    .main_title span {
        font-size: 30px;
    }

    .main_sub-title {
        font-size: 24px;
    }

    .main_sub-title p:nth-child(1) {
        font-family: serif;
    }

    .main_sub-title p:nth-child(2) {
        font-family: serif;
        margin-top: 40px;
        border-bottom: 1px solid white;
        padding-bottom: 5px;
    }

    .btn {
        width: 70%;
        border: 1px solid white;
        border-radius: 15px;
        text-align: center;
    }

    .btn > a {
        display: inline-block;
        width: 100%;
        padding: 10px 0;
    }

    .btn:hover {
        opacity: .8;
    }

    .btn > a::after {
        content: '\f061';
        font-family: 'Font Awesome 6 Free';
        font-weight: 900;
        font-size: 1.2rem;
        position: relative;
        top: 1px;
        left: 5px;
        transition: all 0.5s;
    }

    .btn > a:hover::after {
        left: 15px;
    }

    .main_btn {
        margin: 0 auto;
        margin-top: 80px;
    }

    .main_btn:hover {
        opacity: .8;
    }

    .main_btn > a::after {
        content: '\f061';
        font-family: 'Font Awesome 6 Free';
        font-weight: 900;
        font-size: 1.2rem;
        position: relative;
        top: 0;
        left: 5px;
    }

    .quiz {
        background-color: #fff;
        padding-top: 75px;
        text-align: center;
        padding-bottom: 60px;
    }

    .title {
        display: inline-block;
        font-size: 50px;
        font-family: serif;
        color: #333333;
        border-bottom: 1px solid #333333;
        padding-bottom: 5px;
        margin-bottom: 30px;
    }

    .quiz p, .lang p {
        font-size: 1rem;
        font-family: serif;
        margin-bottom: 30px;
    }

    .quiz span {
        font-size: 2rem;
    }

    .quiz_btn {
        margin: 0 auto;
        width: 15%;
        border-color: #B511E7;
        color: #B511E7;
    }

    .lang {
        background: linear-gradient(90deg, #683AE6, #D13DE2);
        padding: 75px 0px 60px 0px;
        text-align: center;
    }

    .lang h2, .lang p {
        color: white;
    }

    .lang h2 {
        border-bottom: 1px solid white;
    }

    .lang_btn {
        margin: 0 auto;
        width: 15%;
        color: white;
    }

    @media screen and (max-width:417px) {

        .main_text {
            flex-direction: column;
            justify-content: left;
            height: auto;
        }

        .main_title {
            font-size: 3rem;
        }

        .main_title p:first-child {
            margin-top: 60px;
        }

        .main_title p {
            margin-bottom: 50px;
        }

        .main_sub-title {
            font-size: 1.4rem;
        }

        .btn {
            width: 70%;
            border: 1px solid white;
            border-radius: 15px;
            text-align: center;
        }

        .btn > a {
            display: inline-block;
            width: 100%;
            padding: 10px 0;
        }

        .btn:hover {
            opacity: .8;
        }

        .btn > a::after {
            content: '\f061';
            font-family: 'Font Awesome 6 Free';
            font-weight: 900;
            font-size: 1.2rem;
            position: relative;
            top: 1px;
            left: 5px;
            transition: all 0.5s;
        }

        .btn > a:hover::after {
            left: 15px;
        }


        .quiz_btn {
            margin: 0 auto;
            width: 80%;
            border-color: #B511E7;
            color: #B511E7;
        }

        .lang_btn {
            margin: 0 auto;
            width: 80%;
            color: white;
        }
    }




</style>