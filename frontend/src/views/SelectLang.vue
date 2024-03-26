<script setup lang="ts">
    import { RouterLink } from 'vue-router';
    import router from '@/router';
    import { ref } from 'vue';
    import { useDatabaseStore } from '@/stores/database';

    const databaseStore = useDatabaseStore();

    if(!databaseStore.isLogin) {
        router.push('/login');
    }

    const sel = ref('html5');
    const colorhtml = ref('#FAF8DD');
    const colorcss = ref('#fff');

    const selecthtml5 = ():void => {
        sel.value = 'html5';
        colorhtml.value = '#FAF8DD';
        colorcss.value = '#fff';
    };

    const selectcss3 = ():void => {
        sel.value = 'css3';
        colorhtml.value = '#fff';
        colorcss.value = '#FAF8DD';
    };

</script>

<template>
    <main class="main">
        <div class="main_inner wrapper">
            <h2 class="main_title">使用言語を選択してください。</h2>
            <div class="main_contents">
                <div v-on:click="selecthtml5" v-bind:style="{ backgroundColor: colorhtml }" class="main_content main_html">
                    <p>HTML5</p>
                </div>
                <div v-on:click="selectcss3" v-bind:style="{ backgroundColor: colorcss  }" class="main_content main_css">
                    <p>CSS3</p>
                </div>
            </div>
            <ul class="main_pagination">
                <li><RouterLink v-bind:to="{ name: 'Home' }" class="btn back">戻る</RouterLink></li>
                <li><RouterLink v-bind:to="{ name: 'Level', params: { lang: sel } }" class="btn next">次へ</RouterLink></li>
            </ul>
        </div>
    </main>
</template>

<style scoped>
    .main {
        background: linear-gradient(-135deg, #EA28DC, #E41BCB, #8C05F2, #9839B4);
        color: white;
    }

    .main_inner {
        padding-top: 100px;
    }

    .main_title {
        text-align: center;
        font-size: 1.5rem;
        margin-bottom: 3rem;
    }

    .main_contents {
        display: flex;
        justify-content: space-around;
        color: #333333;
        margin-bottom: 60px;
    }

    .main_content {
        position: relative;
        background-color: #fff;
        width: 250px;
        aspect-ratio: 1;
        border-radius: 15px;
        box-shadow: 6px 6px 15px 0px rgba(0, 0, 0, 0.4);
        top: 0;
        transition: all 0.4s;
    }

    .main_content:hover {
        top: -10px;
        box-shadow: 15px 15px 15px 0px rgba(0, 0, 0, 0.4);
    }

    .main_html::before {
        content: '\f13b';
        font-family: "Font Awesome 6 Brands";
        font-size: 8rem;
        position: absolute;
        top: 37%;
        left: 50%;
        transform: translate(-50%, -50%);
    }

    .main_css::before {
        content: '\f38b';
        font-family: "Font Awesome 6 Brands";
        font-size: 8rem;
        position: absolute;
        top: 37%;
        left: 50%;
        transform: translate(-50%, -50%);
    }

    .main_content > p {
        font-size: 2rem;
        text-align: center;
        position: absolute;
        bottom: 15%;
        left: 50%;
        transform: translateX(-50%);
    }

    /** pagination */
    .main_pagination {
        display: flex;
        justify-content: space-around;
        padding-bottom: 100px;
    }

    .main_pagination > li {
        width: 15%;
    }

    .btn {
        display: inline-block;
        border: 1px solid rgba(255, 255, 255, .5);
        padding: 10px 20px;
        border-radius: 10px;
        width: 100%;
        text-align: center;
    }

    .btn:hover {
        opacity: .8;
    }

    .back::before {
        content: '\f359';
        font-family: "Font Awesome 6 Free";
        font-weight: 400;
        position: relative;
        right: 5px;
        transition: all 0.3s;
    }

    .next::after {
        content: '\f35a';
        font-family: "Font Awesome 6 Free";
        font-weight: 400;
        position: relative;
        left: 5px;
        transition: all 0.3s;
    }

    .back:hover::before {
        right: 15px;
    }

    .next:hover::after {
        left: 15px;
    }

    @media screen and (max-width: 417px) {
        .main_content {
            width: 40%;
        }
        .main_html::before {
            font-size: 5rem;
        }

        .main_css::before {
            font-size: 5rem;
        }

        .main_content > p {
            font-size: 1.5rem;
        }

        .main_pagination > li {
            width: 40%;
        }
    }

</style>