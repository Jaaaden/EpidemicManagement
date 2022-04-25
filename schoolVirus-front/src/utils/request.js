import axios from "axios";
import { MessageBox, Message } from "element-ui";
import store from "@/store";
import { getToken } from "@/utils/auth";

// create an axios instance
const service = axios.create({
    // baseURL: "http://www.smartxh88.com:8801/api/",
    baseURL: "http://ec2-52-33-146-34.us-west-2.compute.amazonaws.com/api/",
    // withCredentials: true, 
    timeout: 2000, 
});

// request interceptor
service.interceptors.request.use(
    (config) => {
        if (store.getters.token) {
            config.headers['Authorization'] = getToken()
        }
        return config;
    },
    (error) => {
        console.log(error); // for debug
        return Promise.reject(error);
    }
);

service.interceptors.response.use(
    (response) => {
        return response
    }
);

export default service;
