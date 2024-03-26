import { createRouter, createWebHistory } from "vue-router";
import type { RouteRecordRaw } from "vue-router";
import Home from "@/views/Home.vue";

const routeSettings: RouteRecordRaw[] = [
    {
        path: "/",
        name: "Home",
        component: Home
    },
    {
        path: "/mypage",
        name: "Mypage",
        component: () => {
            return import("@/views/Mypage.vue");
        }
    },
    {
        path: "/quiz",
        name: "Select",
        component: () => {
            return import("@/views/SelectLang.vue");
        }
    },
    {
        path: "/quiz/:lang",
        name: "Level",
        component: () => {
            return import("@/views/DifficultyLevel.vue");
        },
        props: (routes) => {
            return { lang: routes.params.lang };
        }
    },
    {
        path: "/quiz/:lang/:diff/:lec",
        name: "Answer",
        component: () => {
            return import("@/views/QuizAnswer.vue");
        },
        props: (routes) => {
            return { lang: routes.params.lang, diff: routes.params.diff, lec: routes.params.lec };
        }
    },
    {
        path: "/quiz/:lang/:diff/:lec/:results",
        name: "Results",
        component: () => {
            return import("@/views/QuizResults.vue");
        },
        props: (routes) => {
            return { lang: routes.params.lang, diff: routes.params.diff, lec: routes.params.lec, results: routes.params.results};
        }
    },
    {
        path: "/sign",
        name: "Sign",
        component: () => {
            return import("@/views/SignUp.vue");
        }
    },
    {
        path: "/signed",
        name: "Signed",
        component: ()=> {
            return import("@/views/SignedUp.vue");
        }
    },
    {
        path: "/login",
        name: "Login",
        component: () => {
            return import("@/views/Login.vue");
        }
    },
    {
        path: "/logined",
        name: "Lonined",
        component: () => {
            return import("@/views/Logined.vue");
        }
    },
    {
        path: "/delete",
        name: "Delete",
        component: () => {
            return import("@/views/DeleteLogin.vue");
        }
    },
    {
        path: "/deleted",
        name: "Deleted",
        component: () => {
            return import("@/views/SuccessDelete.vue");
        }
    },
    {
        path: "/privacy",
        name: "Privacy",
        component: () => {
            return import("@/views/PrivacyPolicy.vue");
        }
    },
    {
        path: "/terms",
        name: "Terms",
        component: () => {
            return import("@/views/AvailablePolicy.vue");
        }
    },
    {
        path: "/error",
        name: "Error",
        component: () => {
            return import("@/views/Error.vue");
        }
    }
];



const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: routeSettings
});

export default router;