import request from "@/utils/request";

export function allInfection() {
    return request({
        url: "/infection/all_infection",
        method: "get",
    });
}

export function addInfection(data) {
    return request({
        url: "/infection/insert_infection",
        method: "post",
        data,
    });
}

export function alterInfection(data) {
    return request({
        url: "/infection/update_infection",
        method: "put",
        data,
    });
}

export function getInfection(name) {
    return request({
        url: `/infection/query_infection?m_name=${name}`,
        method: "get"
    });
}

export function deleteInfection(id) {
    return request({
        url: `/infection/remove_infection/${id}`,
        method: "delete"
    });
}


export function allHighRick() {
    return request({
        url: "/highrick/all_highrick",
        method: "get",
    });
}

export function addHighRick(data) {
    return request({
        url: "/highrick/insert_highrick",
        method: "post",
        data,
    });
}

export function alterHighRick(data) {
    return request({
        url: "/highrick/update_highrick",
        method: "put",
        data,
    });
}

export function getHighRick(name) {
    return request({
        url: `/highrick/query_highrick?m_name=${name}`,
        method: "get"
    });
}

export function deleteHighRick(id) {
    return request({
        url: `/highrick/remove_highrick/${id}`,
        method: "delete"
    });
}

export function allClose() {
    return request({
        url: "/close/all_close",
        method: "get",
    });
}

export function addClose(data) {
    return request({
        url: "/close/insert_close",
        method: "post",
        data,
    });
}

export function alterClose(data) {
    return request({
        url: "/close/update_close",
        method: "put",
        data,
    });
}

export function getClose(name) {
    return request({
        url: `/close/query_close?m_name=${name}`,
        method: "get"
    });
}

export function deleteClose(id) {
    return request({
        url: `/close/remove_close/${id}`,
        method: "delete"
    });
}