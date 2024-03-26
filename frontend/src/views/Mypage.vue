<script setup lang="ts">
import { ref, computed } from 'vue';
import { useDatabaseStore } from '@/stores/database';

const databaseStore = useDatabaseStore();

const userData = computed(()=>{
    return databaseStore.getUser;
});

const quizInfo = {
    html5: {
        num: 0,
        gold: 0,
        silver: 0,
        copper: 0
    },
    css3: {
        num: 0,
        gold: 0,
        silver: 0,
        copper: 0
    }
}

for (const user1 of Object.values(userData.value.quiz.html5)) {
    for (const user2 of Object.values(user1)) {
       quizInfo.html5.num += user2;
       if(user2 === 5) {
            quizInfo.html5.gold++;
       } else if(user2 === 4) {
            quizInfo.html5.silver++;
       } else if(user2 === 3) {
            quizInfo.html5.copper++;
       }
    }
}

for (const user1 of Object.values(userData.value.quiz.css3)) {
    for (const user2 of Object.values(user1)) {
       quizInfo.css3.num += user2;
       if(user2 === 5) {
            quizInfo.css3.gold++;
       } else if(user2 === 4) {
            quizInfo.css3.silver++;
       } else if(user2 === 3) {
            quizInfo.css3.copper++;
       }
    }
}

//---------------- News  ------------------------------------------------------------
interface News {
    date: string;
    msg: string;
}
let newsData = ref([] as Array<News>)
const getNews = async () => {
    const news:Array<News> = await fetch('https://looquiz.net/api/news').then( res => {
        return res.json();
    }).then( data => {
        return data;
    }).catch(()=>{
        return undefined;
    });

    newsData.value = news.map(values => {
        return values;
    });
}
getNews();
</script>

<template>
    <main class="main">
        <p class="main_title">名前<span>{{ userData.name }}</span></p>
        <section class="news wrapper">
            <h2 class="news_title">ニュース</h2>
            <div class="news_inner">
                <template v-for="news in newsData" v-bind:key="news">
                    <div class="news_lists">
                        <dt>{{ news.date }}</dt>
                        <dd>{{ news.msg }}</dd>
                    </div>
                </template>
            </div>
        </section>
        <section class="quiz wrapper">
            <h2 class="quiz_title">クイズ</h2>
            <div class="quiz_inner">
                <div class="quiz_html">
                    <dl class="quiz_lists">
                        <dt>HTMLクイズ修了数</dt>
                        <dd>{{ quizInfo.html5.num }}/60</dd>
                    </dl>
                    <dl class="quiz_lists">
                        <dt class="gold">金メダルの数</dt>
                        <dd>{{ quizInfo.html5.gold }}</dd>
                    </dl>
                    <dl class="quiz_lists">
                        <dt class="platina">銀メダルの数</dt>
                        <dd>{{ quizInfo.html5.silver }}</dd>
                    </dl>
                    <dl class="quiz_lists">
                        <dt class="copper">銅メダルの数</dt>
                        <dd>{{ quizInfo.html5.copper }}</dd>
                    </dl>
                </div>
                <div class="quiz_css">
                    <dl class="quiz_lists">
                        <dt>CSSクイズ修了数</dt>
                        <dd>{{ quizInfo.css3.num }}/60</dd>
                    </dl>
                    <dl class="quiz_lists">
                        <dt class="gold">金メダルの数</dt>
                        <dd>{{ quizInfo.css3.gold }}</dd>
                    </dl>
                    <dl class="quiz_lists">
                        <dt class="platina">銀メダルの数</dt>
                        <dd>{{ quizInfo.css3.silver }}</dd>
                    </dl>
                    <dl class="quiz_lists">
                        <dt class="copper">銅メダルの数</dt>
                        <dd>{{ quizInfo.css3.copper }}</dd>
                    </dl>
                </div>
            </div>
        </section>
    </main>
</template>

<style scoped>
    .main {
        background: linear-gradient(-135deg, #EA28DC, #E41BCB, #8C05F2, #9839B4);
        color: white;
    }

    .main_title {
        position: relative;
        padding: 100px 20px 0px 20px;
        font-size: 1rem;
        border-bottom: 1px solid rgba(255, 255, 255, .5);
        width: 30%;
        margin: 0 auto;
    }

    .main_title > span {
        position: absolute;
        display: inline-block;
        font-size: 1.5rem;
        left: 50%;
        bottom: 1px;
        transform: translateX(-50%);
    }

    /* News */
    .news {
        margin-top: 60px;
    }

    .news_title {
        text-align: center;
        font-size: 1.5rem;
        margin-bottom: .6rem;
    }

    .news_inner {
        border: 1px solid rgba(255, 255, 255, .5);
        border-radius: 10px;
        padding: 20px;
    }

    .news_lists {
        display: flex;
        margin-top: 15px;
    }

    .news_lists:first-child {
        margin-top: 0;
    }

    .news_lists > dt {
        width: 30%;
        border-bottom: 1px solid rgba(255, 255, 255, .5);
        padding-left: 10px;
    }

    .news_lists > dd {
        width: 70%;
        border-bottom: 1px solid rgba(255, 255, 255, .5);
    }

    /** quiz */
    .quiz {
        margin-top: 60px;
        padding-bottom: 60px;
    }

    .quiz_title {
        text-align: center;
        font-size: 1.5rem;
        margin-bottom: .6rem;
    }

    .quiz_inner {
        width: 70%;
        display: flex;
        justify-content: space-around;
        border: 1px solid rgba(255, 255, 255, .5);
        border-radius: 10px;
        padding: 20px;
        margin: 0 auto;
    }

    .quiz_html,
    .quiz_css {
        width: 35%;
    }

    .quiz_lists {
        display: flex;
        margin-top: 15px;
    }

    .quiz_lists:first-child {
        margin-top: 0;
    }

    .quiz_lists > dt {
        width: 90%;
        border-bottom: 1px solid rgba(255, 255, 255, .5);
        padding-left: 10px;
    }

    .quiz_lists > dd {
        width: 15%;
        border-bottom: 1px solid rgba(255, 255, 255, .5);
    }

    /** medal */
    .gold::after {
        content: '';
        display: inline-block;
        width: 15px;
        height: 20px;
        background-image: url("../assets/gold_b.png");
        background-size: cover;
        margin-left: 15px;
        position: relative;
        bottom: -1px;
    }

    .platina::after {
        content: '';
        display: inline-block;
        width: 15px;
        height: 20px;
        background-image: url("../assets/silver_b.png");
        background-size: cover;
        margin-left: 15px;
        position: relative;
        bottom: -1px;
    }

    .copper::after {
        content: '';
        display: inline-block;
        width: 15px;
        height: 20px;
        background-image: url("../assets/copper_b.png");
        background-size: cover;
        margin-left: 15px;
        position: relative;
        bottom: -1px;
    }

    @media screen and (max-width: 417px) {

    .main_title {
        width: 80%;
        padding-bottom: 50px;
    }

    .main_title > span {
        font-size: 1.7rem;
    }

    /* News */
    .news {
        margin-top: 60px;
    }

    .news_title {
        text-align: center;
        font-size: 1.5rem;
        margin-bottom: .6rem;
    }

    .news_lists {
        flex-direction: column;
        margin-top: 30px;
    }

    .news_lists > dt {
        margin-bottom: 10px;
    }

    .news_lists > dd {
        width: 100%;
        padding-left: 15px;
    }

    /** quiz */

    .quiz_inner {
        width: 100%;
        flex-direction: column;
        padding: 30px;
    }

    .quiz_html,
    .quiz_css {
        width: 100%;
    }

    .quiz_html {
        margin-bottom: 60px;
    }

    .quiz_lists {
        display: flex;
        margin-top: 15px;
    }

    .quiz_lists:first-child {
        margin-top: 0;
    }

    .quiz_lists > dt {
        width: 90%;
        border-bottom: 1px solid rgba(255, 255, 255, .5);
        padding-left: 10px;
    }

    .quiz_lists > dd {
        width: 15%;
        border-bottom: 1px solid rgba(255, 255, 255, .5);
    }
    }
</style>