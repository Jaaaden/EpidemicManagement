import request from "@/utils/request";

export function updateBasic(data){
    return request({
        url: "/personal/update_basic",
        method: "put",
        data
    })
}

export function updateEducate(data){
    return request({
        url: "/personal/update_educate",
        method: "put",
        data
    })
}

export function updatePwd(data){
    return request({
        url: "/role/update_role_pass",
        method: "put",
        data
    })
}

export function getBasic(id){
    return request({
        url: `/personal/get_personal?i_stuid=${id}`,
        method: "get"
    })
}

export function insertBasic(data){
    return request({
        url: "/personal/insert_basic",
        method: "post",
        data
    })
}