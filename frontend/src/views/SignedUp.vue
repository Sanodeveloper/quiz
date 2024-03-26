<script setup lang="ts">
import { RouterLink } from 'vue-router';

</script>

<template>
    <main class="main">
        <div class="inner">
            <h2>登録できました。</h2>
            <p>以下のボタンからログインページに移動できます。</p>
            <div class="btn_outer">
                <RouterLink v-bind:to="{ name: 'Login' }" class="btn">ログインページへ</RouterLink>
            </div>
        </div>
    </main>
</template>

<style scoped>
.main {
    background: linear-gradient(-135deg, #EA28DC, #E41BCB, #8C05F2, #9839B4);
    color: white;
    height: 70vh;
    padding: 100px;
}

h2 {
    font-size: 1.5rem;
    text-align: center;
    margin-bottom: 20px;
}

p {
    font-size: 1rem;
    text-align: center;
    margin-bottom: 70px;
}

.btn {
    display: inline-block;
    border: 1px solid #fff;
    border-radius: 10px;
    padding: 10px;
}

.btn:hover {
    opacity: .8;
}

.btn_outer {
    text-align: center;
}

@media screen and (max-width: 417px) {
    .main {
        padding: 20px;
    }

    h2 {
        margin-top: 100px;
        font-size: 2rem;
    }
}
</style>