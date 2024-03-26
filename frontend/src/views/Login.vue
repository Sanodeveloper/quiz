<script setup lang="ts">
import { ref, watch } from 'vue';
import router from '@/router';
import { useDatabaseStore } from '@/stores/database';

const databeseStore = useDatabaseStore();

//----------- Login ------------------------------------
let name = ref('');
let pass = ref('');
let isError = ref(false);
let isLoading = ref(false);
let enptyMsg = '';
let errorMsg = '';

watch([name, pass], ()=>{
    if(name.value === '' || pass.value === '') {
        isError.value = true;
        enptyMsg = '空白の欄があります。';
    } else {
        isError.value = false;
        enptyMsg = '';
    }
});

const checklogin = async (name:string, pass:string) => {
    if(name !== '' && pass !== '') {
        isLoading.value = true;
        const data = await fetch('https://looquiz.net/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify({name: name, pass: pass})
        }).then(res => {
            isLoading.value = false;
            return res.json();
        }).then(data => {
            return data;
        });

        if(data.length !== 0) {
            databeseStore.updataUser(data[0]);
            databeseStore.Logined();
            router.push('/logined');
        } else {
            isError.value = true;
            errorMsg = "名前かパスワードが違います。";
        }
    }
}

</script>

<template>
    <main class="main">
        <div class="inner wrapper">
            <h2 class="title">ログイン画面</h2>
            <div class="form">
                <label for="name">ユーザーネーム</label>
                <input type="text" v-model="name" class="name" id="name" name="name" placeholder="UserName">
                <label for="password">パスワード</label>
                <input type="password" v-model="pass" class="password" id="password" name="password" placeholder="Password">
                <template v-if="isLoading">
                    <p>ログイン中...</p>
                </template>
                <template v-else-if="isError">
                    <div class="error">
                        <p>{{ enptyMsg }}</p>
                        <p>{{ errorMsg }}</p>
                    </div>
                </template>
                <input type="submit" v-on:click="checklogin(name, pass)" class="btn" value="ログイン">
            </div>
        </div>
    </main>
</template>

<style scoped>
    .main {
        background: linear-gradient(-135deg, #EA28DC, #E41BCB, #8C05F2, #9839B4);
        color: white;
        padding-top: 60px;
        padding-bottom: 60px;
        font-family: sans-serif;
    }

    .inner {
        background-color: #FAF8DD;
        color: #333333;
        max-width: 400px;
        border-radius: 10px;
        padding: 40px;
        box-shadow: 6px 6px 10px 0px rgba(0, 0, 0, .3);
    }

    .title {
        font-size: 1.5rem;
        text-align: center;
        margin-bottom: 40px;
    }

    .form > label, .form > input {
        display: block;
    }

    .name, .mail, .password {
        background-color: #fff;
        border: 1px solid #333333;
        border-radius: 5px;
        width: 100%;
        padding: 5px 10px;
    }

    .form > label {
        margin-bottom: 5px;
    }

    .form > input {
        margin-bottom: 30px;
    }

    .btn {
        position: relative;
        top: 0;
        background-color: #fff;
        border: 1px solid #333333;
        border-radius: 5px;
        width: 30%;
        text-align: center;
        padding: 5px 10px;
        margin: 30px auto 0 auto;
        transition: all 0.2s;
    }

    .btn:hover {
        top: -2px;
    }

    .error {
        text-align: center;
        color: #f22323;
        border: 1px solid #e80f0f;
        border-radius: 6px;
        padding: 10px;
        margin-left: auto;
        background-color: #fabfbf;
    }

    .error::before {
        content: '\f071';
        font-family: 'Font Awesome 6 Free';
        font-weight: 900;
        margin-right: 10px;
    }
</style>