const routerAdmin = [
    {
        path: "/",
        name: "home.page",
        component: () => import("@/layouts/home.page.vue"),
        meta: {
            title: "Home page for Admin"
        },

    },

    //router children login
    {
        path: "/login",
        name: "login.admin",
        component: () => import("@/layouts/login.page.vue"),
        meta: {
            title: "Login for Admin"

        }
    }

]

export default routerAdmin

