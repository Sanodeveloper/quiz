<script setup lang="ts">
import { RouterView, RouterLink, }  from "vue-router";
import { computed, ref } from "vue";
import router from "./router";
import { useDatabaseStore } from "./stores/database";

const databaseStore = useDatabaseStore();

databaseStore.insertquiz('quizhtml5');
databaseStore.insertquiz('quizcss3');
databaseStore.insertquiz('queshtml5');
databaseStore.insertquiz('quescss3');

async function isLogined() {
    if(document.cookie) {
        const sessionId = document.cookie.split('=');
        if(sessionId[0] === 'id') {
            const data = await fetch('https://looquiz.net/api/session', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify({ sessionId: sessionId[1] })
            }).then(res => {
                return res.json();
            }).then( data => {
                return data;
            }).catch(()=>{
                return undefined;
            });

            if(data.length !== 0) {
                databaseStore.updataUser(data[0]);
                databaseStore.Logined();
            } else {
                router.push('/login');
            }
        }
    } else {
        router.push('/login');
    }
}

const isLogin = computed(():boolean=>{
    return databaseStore.isLogin;
});

isLogined();

//humbargerMenu-------------------------------------------
const c = ref(false);
const l = ref('100%');
const changeHum = ()=>{
    if(c.value) {
        l.value = '100%';
        c.value = false;
    } else {
        l.value = '0%';
        c.value = true;
    }
}

const changeBtn = ()=>{
    console.log("aaaaaaaa")
    c.value = false;
    l.value ='100%';
}
</script>

<template>
   <header class="header">
        <div class="humbarger" v-bind:style="{ left: l }" v-on:click="changeBtn">
            <ul class="hum_head_lists">
                <li><RouterLink v-bind:to="{ name: 'Select' }">クイズ一覧</RouterLink></li>
                <template v-if="isLogin">
                    <li><RouterLink v-bind:to="{ name: 'Mypage' }">マイページ</RouterLink></li>
                </template>
                <template v-else>
                    <li><RouterLink v-bind:to="{ name: 'Login' }">ログイン</RouterLink></li>
                </template>
                <li><RouterLink v-bind:to="{ name: 'Sign' }">無料新規登録</RouterLink></li>
                <template v-if="isLogin">
                    <li><RouterLink v-bind:to="{ name: 'Delete' }">登録解除</RouterLink></li>
                </template>
            </ul>
        </div>
        <div class="wrapper header_layout">
            <h1 class="logo"><RouterLink v-bind:to="{ name: 'Home' }"><img src="./assets/logo.png" alt="logo"></RouterLink></h1>
            <nav class="head_nav">
                <div class="hum_btn" id="hum_btn" v-on:click="changeHum" v-bind:class="{ hum_change_btn: c }"><span></span><span></span><span></span></div>
                <ul class="head_lists">
                    <li><RouterLink v-bind:to="{ name: 'Select' }">クイズ一覧</RouterLink></li>
                    <template v-if="isLogin">
                        <li><RouterLink v-bind:to="{ name: 'Mypage' }">マイページ</RouterLink></li>
                    </template>
                    <template v-else>
                        <li><RouterLink v-bind:to="{ name: 'Login' }">ログイン</RouterLink></li>
                    </template>
                    <li><RouterLink v-bind:to="{ name: 'Sign' }">無料新規登録</RouterLink></li>
                    <template v-if="isLogin">
                        <li><RouterLink v-bind:to="{ name: 'Delete' }">登録解除</RouterLink></li>
                    </template>
                </ul>
            </nav>
        </div>
    </header>
    <RouterView />
    <footer class="footer">
        <div class="wrapper">
            <ul class="footer_lists">
                <li><h3><RouterLink v-bind:to="{ name: 'Home' }"><img src="./assets/logo.png" alt="logo"></RouterLink></h3></li>
                <li>
                    <p>Service</p>
                    <p><RouterLink v-bind:to="{ name: 'Sign' }">無料新規登録</RouterLink></p>
                    <template v-if="isLogin">
                        <p><RouterLink v-bind:to="{ name: 'Mypage' }">マイページ</RouterLink></p>
                    </template>
                    <template v-else>
                        <p><RouterLink v-bind:to="{ name: 'Login' }">ログイン</RouterLink></p>
                    </template>
                    <p><RouterLink v-bind:to="{ name: 'Select' }">クイズ一覧</RouterLink></p>
                </li>
                <li>
                    <p>Support</p>
                    <p><RouterLink v-bind:to="{ name: 'Privacy' }">プライバシーポリシー</RouterLink></p>
                    <p><RouterLink v-bind:to="{ name: 'Terms' }">ご利用規約</RouterLink></p>
                </li>
                <li>
                    <p>SNS</p>
                    <a class="footer_btn sns_btn" href="https://twitter.com/sanoworks">X</a>
                </li>
            </ul>
        </div>
        <small>&copy; 2023 LOOQUIZ</small>
    </footer>
</template>

<style>
   /*base*/

    body {
        font-family: serif;
        background-color: #333333;
    }

   img {
        width: 100%;
        vertical-align: bottom;
    }

    .footer_btn {
        width: 70%;
        border: 1px solid white;
        border-radius: 15px;
        text-align: center;
        padding: 10px 0;
    }

    /** humbargerMenu  */

    .humbarger {
        position: fixed;
        z-index: 1;
        background-color: #333333;
        width: 100%;
        height: 100vh;
        top: 0;
        left: 100%;
        transition: all .3s;
    }

    .hum_head_lists {
        display: flex;
        flex-direction: column;
        color: #fff;
        text-align: center;
        margin-top: 50px;
    }

    .hum_head_lists > li {
        margin-right: 0;
        margin-bottom: 50px;
        font-size: 2rem;
    }

    .hum_btn {
        display: none;
        z-index: 2;
        position: relative;
        width: 50px;
        height: 50px;
        background-color: #D13DE2;
        border-radius: 10px;
    }

    .hum_btn > span:nth-child(1) {
        display: block;
        position: absolute;
        width: 70%;
        height: 2px;
        background-color: #fff;
        top: 20%;
        left: 50%;
        transform: translateX(-50%);
        transition: all .5s;
    }

    .hum_btn > span:nth-child(2) {
        display: block;
        position: absolute;
        width: 70%;
        height: 2px;
        background-color: #fff;
        top: 45%;
        left: 50%;
        transform: translateX(-50%);
        transition: all .5s;
    }

    .hum_btn > span:nth-child(3) {
        display: block;
        position: absolute;
        width: 70%;
        height: 2px;
        background-color: #fff;
        top: 70%;
        left: 50%;
        transform: translateX(-50%);
        transition: all .5s;
    }

    .hum_change_btn > span:nth-child(1) {
        display: block;
        position: absolute;
        width: 70%;
        height: 2px;
        background-color: #fff;
        top: 20%;
        left: 25%;
        transform: translateX(-50%);
        transform-origin: left;
        transform: rotate(45deg);
    }

    .hum_change_btn > span:nth-child(2) {
        opacity: 0;
    }

    .hum_change_btn > span:nth-child(3) {
        display: block;
        position: absolute;
        width: 70%;
        height: 2px;
        background-color: #fff;
        top: 70%;
        left: 25%;
        transform: translateX(-50%);
        transform-origin: left;
        transform: rotate(-45deg);
    }

    /* header */
    .wrapper {
        max-width: 1000px;
        margin: 0 auto;
        padding: 0 20px;
    }

    .header {
        background-color: #333333;
        padding: 10px 0;
    }

    .header_layout {
        display: flex;
        justify-content: space-between;
    }

    .logo {
        width: 62px;
        height: 75px;
    }

    .head_nav {
        color: white;
        margin: auto 0;
    }

    .head_lists {
        display: flex;
    }

    .head_lists > li {
        margin-right: 40px;
    }

    .head_lists > li > a {
        position: relative;
    }

    .head_lists > li > a::after {
        position: absolute;
        content: '';
        width: 100%;
        height: 1px;
        background-color: #fff;
        left: 0;
        bottom: -1px;
        transform: scale(0, 1);
        transform-origin: left top;
        transition: 0.5s;
    }

    .head_lists > li > a:hover::after {
        transform: scale(1, 1);
    }

    .head_lists > li > a:hover {
        opacity: .8;
    }

    /** footer */
    .footer {
        background: #333333;
        color: white;
        padding: 20px 0 20px 0;
    }

    .footer_lists {
        display: flex;
        justify-content: space-between;
        margin-bottom: 40px;
    }

    .footer_lists h3 > a {
       display: inline-block;
       width: 85px;
    }

    .footer_lists > li > p:not(:first-child) {
        font-size: 12px;
        margin-top: 10px;
        padding-left: 15px;
    }

    .footer_lists > li > p:nth-child(2) {
        margin-top: 15px;
    }

    .sns_btn {
        display: inline-block;
        margin-top: 15px;
        width: 150px;
        border-color: #B511E7;
        margin-left: 15px;
        transition: all 3s;
    }

    .footer_lists > li > p > a:hover {
        opacity: .8;
    }

    .sns_btn:hover {
        background: linear-gradient(45deg, #683AE6, #D13DE2);
        border: none;
    }

    small {
        display: block;
        text-align: center;
    }

    @media screen and (max-width: 417px) {

        .head_lists {
            display: none;
        }

        .hum_btn {
            display: block;
        }

        .footer_lists {
            flex-direction: column;
            text-align: center;
        }

        .footer_lists > li {
            margin-bottom: 60px;
        }

        .footer_lists li p:first-child {
            font-size: 2rem;
        }

        .footer_lists li p:not(:first-child) {
            font-size: 1rem;
        }
    }
</style>
