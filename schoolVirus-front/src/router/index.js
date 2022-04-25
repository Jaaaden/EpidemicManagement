import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

import Layout from "@/layout";

export const constantRoutes = [
    {
        path: "/login",
        name: "Login",
        meta: { title: "Campus Epidemic Prevention and Control Management Project - Login" },
        component: () => import("@/views/login/index"),
        hidden: true,
    },
    {
        
        path: "/",
        component: Layout,
        redirect: "/home",
    },
    {
        path: "/home",
        name: "Home",
        meta: { title: "Background Home", icon: "home" },
        component: Layout,
        redirect: "/home/roleLoginInfo",
        children: [
            {
                path: "roleLoginInfo",
                name: "RoleLoginInfo",
                meta: { title: "Role login information", icon: "function" },
                component: () => import("@/views/home/roleLoginInfo"),
            },
            {
                path: "informationInform",
                name: "InformationInform",
                meta: { title: "Epidemic news notification", icon: "function" },
                component: () => import("@/views/home/informationInform"),
            },
        ],
    },
    {
        path: "/personal",
        name: "Personal",
        meta: { title: "Personal Center", icon: "personal" },
        component: Layout,
        redirect: "/personal/personalInfo",
        children: [
            {
                path: "personalInfo",
                name: "PersonalInfo",
                meta: { title: "Personal Information", icon: "function" },
                component: () => import("@/views/personal/personalInfo"),
            },
            {
                path: "tree",
                name: "Tree",
                meta: { title: "Change Password", icon: "function" },
                component: () => import("@/views/personal/alterPassword"),
            },
        ],
    },
    
    {
        path: "/health",
        name: "Health",
        meta: { title: "My Health", icon: "health" },
        component: Layout,
        redirect: "/health/healthInput",
        children: [
            {
                path: "healthInput",
                name: "HealthInput",
                meta: { title: "Health Information Entry", icon: "function" },
                component: () => import("@/views/health/healthInput"),
            },
            {
                path: "journeyInput",
                name: "JourneyInput",
                meta: { title: "Itinerary Entry", icon: "function" },
                component: () => import("@/views/health/journeyInput"),
            },
        ],
    },
    {
        path: "/data",
        name: "Data",
        meta: { title: "Epidemic Data", icon: "data", role: [3] },
        component: Layout,
        redirect: "/data/healthManage",
        children: [
            {
                path: "healthManage",
                name: "HealthManage",
                meta: { title: "Health Information Management", icon: "function" },
                component: () => import("@/views/data/healthManage"),
            },
            {
                path: "journeyManage",
                name: "JourneyManage",
                meta: { title: "Trip Data Management", icon: "function" },
                component: () => import("@/views/data/journeyManage"),
            },
        ],
    },
    {
        path: "/manage",
        name: "Manage",
        meta: { title: "Epidemic Management", icon: "manage", role: [3] },
        component: Layout,
        redirect: "/manage/confirmManage",
        children: [
            {
                path: "confirmManage",
                name: "ConfirmManage",
                meta: { title: "Diagnosis Management", icon: "function" },
                component: () => import("@/views/manage/confirmManage"),
            },
            {
                path: "contactsManage",
                name: "ContactsManage",
                meta: { title: "Management of Close Contact Information", icon: "function" },
                component: () => import("@/views/manage/contactsManage"),
            },
        ],
    },
    {
        path: "/other",
        name: "Other",
        meta: { title: "Other Management", icon: "other", role: [3] },
        component: Layout,
        redirect: "/other/roleDataManage",
        children: [
            {
                path: "roleDataManage",
                name: "RoleDataManage",
                meta: { title: "Character Data Management", icon: "function" },
                component: () => import("@/views/other/roleDataManage"),
            },
            {
                path: "informationManage",
                name: "InformationManage",
                meta: { title: "Epidemic News Management", icon: "function" },
                component: () => import("@/views/other/informationManage"),
            },
            {
                path: "loginJournal",
                name: "LoginJournal",
                meta: { title: "Login Log", icon: "function" },
                component: () => import("@/views/other/loginJournal"),
            },
        ],
    },
    // 404 pages must be placed at the end
    {
        // Access other routing paths, redirect to 404
        path: "*",
        redirect: "/404",
        hidden: true,
    },
    {
        path: "/404",
        name: "Four zero Four",
        meta: { title: "Campus Epidemic Prevention and Control Management Project-404" },
        component: () => import("@/views/404"),
        hidden: true,
    },
];

// dynamic routing
export const asyncRoutes = [];

const createRouter = () =>
    new Router({
        
        scrollBehavior: () => ({ y: 0 }),

        routes: constantRoutes,
    });

const router = createRouter();

router.beforeEach((to, form, next) => {
    if (to.path == "/login") {
        next();
    } else {
        const isToken = localStorage.getItem("campusToken") ? true : false;
        if (!isToken) {
            next("/login");
        } else {
            next();
        }
    }
});

//reset route
export function resetRouter() {
    const newRouter = createRouter();
    router.matcher = newRouter.matcher;
}

export default router;
