import request from "@/utils/request";

export function allRole() {
    return request({
        url: "/role/all_role",
        method: "get",
    });
}

export function addRole(data) {
    return request({
        url: "/role/insert_role",
        method: "post",
        data,
    });
}

export function alterRole(data) {
    return request({
        url: "/role/update_role",
        method: "put",
        data,
    });
}

export function getRole(name) {
    return request({
        url: `/role/query_role?r_name=${name}`,
        method: "get",
    });
}

export function deleteRole(id) {
    return request({
        url: `/role/remove_role/${id}`,
        method: "delete",
    });
}

export function allAuthor() {
    return request({
        url: "/author/author_info",
        method: "get",
    });
}

export function alterAuthor(data) {
    return request({
        url: "/author/update_author_info",
        method: "put",
        data,
    });
}

export function allCampus() {
    return request({
        url: "/campus/all_campus",
        method: "get",
    });
}

export function addCampus(data) {
    return request({
        url: "/campus/insert_campus",
        method: "post",
        data,
    });
}

export function alterCampus(data) {
    return request({
        url: "/campus/update_campus",
        method: "put",
        data,
    });
}

export function getCampus(title) {
    return request({
        url: `/campus/query_campus?n_title=${title}`,
        method: "get",
    });
}

export function deleteCampus(id) {
    return request({
        url: `/campus/remove_campus/${id}`,
        method: "delete",
    });
}

export function allDomestic() {
    return request({
        url: "/domestic/all_domestic",
        method: "get",
    });
}

export function addDomestic(data) {
    return request({
        url: "/domestic/insert_domestic",
        method: "post",
        data,
    });
}

export function alterDomestic(data) {
    return request({
        url: "/domestic/update_domestic",
        method: "put",
        data,
    });
}

export function getDomestic(title) {
    return request({
        url: `/domestic/query_domestic?n_title=${title}`,
        method: "get",
    });
}

export function deleteDomestic(id) {
    return request({
        url: `/domestic/remove_domestic/${id}`,
        method: "delete",
    });
}

export function allJournal() {
    return request({
        url: "/journal/all_journal",
        method: "get",
    });
}

export function getJournal(name) {
    return request({
        url: `/journal/query_journal?j_name=${name}`,
        method: "get",
    });
}

export function addJournal(data) {
    return request({
        url: "/journal/insert_journal",
        method: "post",
        data,
    });
}
