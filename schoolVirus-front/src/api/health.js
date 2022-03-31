import request from "@/utils/request";

export function allInfoer() {
    return request({
        url: "/infoer/all_infoer",
        method: "get",
    });
}

export function addInfoer(data) {
    return request({
        url: "/infoer/insert_infoer",
        method: "post",
        data,
    });
}

export function alterInfoer(data) {
    return request({
        url: "/infoer/update_infoer",
        method: "put",
        data,
    });
}

export function getInfoer(name) {
    return request({
        url: `/infoer/query_infoer?i_name=${name}`,
        method: "get"
    });
}

export function deleteInfoer(id) {
    return request({
        url: `/infoer/remove_infoer/${id}`,
        method: "delete"
    });
}

export function allHealth() {
    return request({
        url: "/message/all_message",
        method: "get",
    });
}

export function addMessage(data) {
    return request({
        url: "/message/insert_message",
        method: "post",
        data,
    });
}

export function alterMessage(data) {
    return request({
        url: "/message/update_message",
        method: "put",
        data,
    });
}

export function getMessage(name) {
    return request({
        url: `/message/query_message?m_name=${name}`,
        method: "get"
    });
}

export function deleteMessage(id) {
    return request({
        url: `/message/remove_message/${id}`,
        method: "delete"
    });
}

export function allRecord() {
    return request({
        url: "/record/all_record",
        method: "get",
    });
}

export function addRecord(data) {
    return request({
        url: "/record/insert_record",
        method: "post",
        data,
    });
}

export function alterRecord(data) {
    return request({
        url: "/record/update_record",
        method: "put",
        data,
    });
}

export function getRecord(name) {
    return request({
        url: `/record/query_record?r_name=${name}`,
        method: "get"
    });
}

export function deleteRecord(id) {
    return request({
        url: `/record/remove_record/${id}`,
        method: "delete"
    });
}

export function allJourney() {
    return request({
        url: "/journey/all_journey",
        method: "get",
    });
}

export function addJourney(data) {
    return request({
        url: "/journey/insert_journey",
        method: "post",
        data,
    });
}

export function alterJourney(data) {
    return request({
        url: "/journey/update_journey",
        method: "put",
        data,
    });
}

export function getJourney(name) {
    return request({
        url: `/journey/query_journey?d_name=${name}`,
        method: "get"
    });
}

export function deleteJourney(id) {
    return request({
        url: `/journey/remove_journey/${id}`,
        method: "delete"
    });
}

