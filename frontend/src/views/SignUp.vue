<script setup lang="ts">
import { ref, watch} from 'vue';
import router from '@/router';
import { useDatabaseStore } from '@/stores/database';

//-----database-----------------------------------------
const databaseStore = useDatabaseStore();

//----------- signUp ------------------------------------
let name = ref('');
let pass = ref('');
let isError = ref(false);
let isLoading = ref(false);
let isErrorLog = ref(false);
let enptyMsg = '';
let errorArray = ref([]);

watch([name, pass], ()=>{
    if(name.value === '' || pass.value === '') {
        isError.value = true;
        enptyMsg = '空白の欄があります。';
    } else {
        isError.value = false;
        enptyMsg = '';
    }
    isErrorLog.value = false;
});

const signUp = async (name:string, pass:string) => {
        isLoading.value = true;
        const data = await fetch('https://looquiz.net/api/sign', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name: name, pass: pass })
        }).then(res => {
            isLoading.value = false;
            return res.json();
        }).then(data => {
            return data;
        }).catch(()=>{
            return undefined;
        });

        if(data === undefined) {
            router.push('/error');
        }

        if(data.error) {
            if(data.array.length !== 0) {
                isError.value = true;
                errorArray.value = data.array.map((values:string):string => {
                    return values;
                });
            } else {
                isErrorLog.value = true;
            }
        } else {
            databaseStore.updataUser(data[0]);
            router.push('/signed');
        }
}
</script>

<template>
    <main class="main">
        <div class="inner wrapper">
            <h2 class="title">新規登録画面</h2>
            <div class="form">
                <label for="name">ユーザーネーム</label>
                <input v-model="name" type="text" class="name" id="name" name="name" placeholder="UserName">
                <p>半角英数字(a-z, A-Z, 0-9)だけ使えます</p>
                <template v-if="isErrorLog">
                    <p class="errorlog">その名前はすでに使われています。</p>
                </template>
                <label for="password">パスワード</label>
                <input v-model="pass" type="password" class="password" id="password" name="password" placeholder="Password">
                <p>半角英数字(a-z, A-Z, 0-9)だけ使えます</p>
                <template v-if="isLoading">
                    <p>登録中...</p>
                </template>
                <template v-else-if="isError">
                    <div class="error">
                        <p>{{ enptyMsg }}</p>
                        <template v-for="(error, index) in errorArray" v-bind:key="index">
                            <p>{{ error }}</p>
                        </template>
                    </div>
                </template>
                <input v-on:click="signUp(name, pass)" type="submit" class="btn" value="登録">
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

    .form > p {
        margin-top: 10px;
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

    .errorlog {
        margin-top: -20px;
        margin-bottom: 20px;
        color: #e80f0f;
    }
</style>