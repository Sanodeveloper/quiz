<script setup lang="ts">
import { computed } from 'vue';
import { useDatabaseStore } from '@/stores/database';
import router from '@/router';

const databaseStore = useDatabaseStore();
const user = computed(()=>{
    return databaseStore.getUser
});

const Delete = async () => {
    const sessionId = document.cookie.split('=');
    const del = await fetch('https://looquiz.net/api/delete', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name: user.value.name, pass: user.value.pass })
    }).then( res => {
        return res.json();
    }).then( data => {
        return data;
    }).catch( () => {
        return undefined
    });

    if(del) {
        document.cookie = "id=" + sessionId[1] + "; max-age=0";
        router.push('/deleted');
    } else {
        router.push('/error');
    }
}

</script>

<template>
    <main class="main">
        <div class="inner wrapper">
            <h2 class="title">登録解除画面</h2>
            <div class="form">
                <label for="mail">ユーザーネーム</label>
                <input type="email" class="mail" id="mail" name="mail" v-bind:value="user.name">
                <label for="password">パスワード</label>
                <input type="password" class="password" id="password" name="password" v-bind:value="user.pass">
                <input v-on:click="Delete" type="submit" class="btn" value="登録解除">
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
        margin: 60px auto 0 auto;
        transition: all 0.2s;
    }

    .btn:hover {
        top: -2px;
    }
</style>