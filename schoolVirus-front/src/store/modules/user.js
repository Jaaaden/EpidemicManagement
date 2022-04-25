import { login, queryAllRole } from "@/api/home";
import { getToken, setToken, removeToken } from "@/utils/auth";
import { resetRouter } from "@/router";

const state = {
    // token: getToken(),
    token: localStorage.getItem('campusToken') || '',
    rolesData: JSON.parse(localStorage.getItem('rolesData')) || []
};

const mutations = {
    SET_TOKEN: (state, token) => {
        state.token = token;
    },
    SET_ROLES_DATA: (state, rolesData) => {
        state.rolesData = rolesData;
    }
};

const actions = {
    login({ commit }, userInfo) {
        return new Promise((resolve, reject) => {
            login(userInfo).then((response) => {
                const { token, data:roleData } = response.data;
                commit("SET_TOKEN", token);
                commit("SET_ROLES_DATA", roleData);
                localStorage.setItem('campusToken',token);
                localStorage.setItem('rolesData',JSON.stringify(roleData));
                setToken(token);
                resolve(roleData);
            }).catch((error) => {
                reject(1111);
            });
        });
    },

    getInfo({ commit, state }) {
        return new Promise((resolve, reject) => {
            queryAllRole()
                .then((response) => {
                    const { data } = response;
                    resolve();
                })
                .catch((error) => {
                    reject(error);
                });
        });
    },
    
    logout({ commit }) {
        return new Promise((resolve) => {
            localStorage.clear();
            commit("SET_TOKEN", "");
            commit("SET_ROLES_DATA", []);
            removeToken();
            resolve();
        });
    },
};

export default {
    namespaced: true,
    state,
    mutations,
    actions,
};
