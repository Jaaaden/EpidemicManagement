import router from "./router";
import store from "./store";
import { Message } from "element-ui";
import NProgress from "nprogress"; // progress bar
import "nprogress/nprogress.css"; // progress bar style
import { getToken } from "@/utils/auth"; // get token from cookie

NProgress.configure({ showSpinner: false }); 

function hasPermission(roles, permissionRoles) {
    if (roles.indexOf(3) >= 0) return true; 
    if (!permissionRoles) return true;
    return roles.some((role) => permissionRoles.indexOf(role) >= 0);
}

const whiteList = ["/login"]; 

// global routing guard
router.beforeEach((to, from, next) => {
    // Route loading progress bar
    NProgress.start(); 
    // Determine whether the token exists
    if (getToken()) {
        if (to.path === "/login") {
            next({ path: "/" });
            NProgress.done(); 
        } else {
            if (store.getters.roles.length === 0) {
                store.dispatch("user/getInfo").then((res) => {
                    const roles = res[2].r_role;
                    store.dispatch("permission/GenerateRoutes", { roles }).then(() => {
                        // Generate an accessible routing table based on roles permissions
                        router.addRoutes(store.getters.addRouters); // Dynamically add accessible routing table
                        next({ ...to, replace: true }); // hack method to make sure addRoutes is done ,set the replace: true so the navigation will not leave a history record
                    });
                }).catch((err) => {
                    store.dispatch("user/logout").then(() => {
                        next({ path: "/login" });
                    });
                });
            } else {
                // Not sure  ↓
                if (hasPermission(store.getters.roles, to.meta.roles)) {
                    next(); //
                } else {
                    next({
                        path: "/401",
                        replace: true,
                        query: { noGoBack: true },
                    });
                }
                //  ↑
            }
        }
    } else {
        if (whiteList.indexOf(to.path) !== -1) {
            next();
        } else {
            next("/login");
            NProgress.done();
        }
    }
});

router.afterEach(() => {
    NProgress.done();
});
