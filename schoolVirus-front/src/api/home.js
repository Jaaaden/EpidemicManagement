import request from "@/utils/request";


export function register(data) {
    return request({
        url: "/role/reg_role",
        method: "post",
        data,
    });
}


export function login(data) {
    return request({
        url: "/role/login_role",
        method: "post",
        data,
    });
}


export function campusNotices(){
    return request({
        url: "/campus/all_campus",
        method: "get"
    })
}


export function domesticNotices(){
    return request({
        url: "/domestic/all_domestic",
        method: "get"
    })
}


export function queryAllRole() {
    return request({
        url: "/role/all_role",
        method: "get",
    });
}


export function querySingleRole(data) {
    return request({
        url: "/role/query_role",
        method: "get",
        data,
    });
}


export function updateRole(data) {
    return request({
        url: "/role/update_role",
        method: "put",
        data,
    });
}


export function insertRole(data) {
    return request({
        url: "/role/insert_role",
        method: "post",
        data,
    });
}


export function removeRole(data) {
    return request({
        url: "/role/remove_role",
        method: "delete",
        data,
    });
}


export function updatePass(data) {
    return request({
        url: "/role/update_role_pass",
        method: "post",
        data,
    });
}

