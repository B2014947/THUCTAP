import { createStore } from 'vuex';

const store = createStore({
    state: {
        isLoggedIn: false,
        token: null,
    },
    mutations: {
        setLoggedIn(state, isLoggedIn) {
            state.isLoggedIn = isLoggedIn;
        },
        setToken(state, token) {
            state.token = token;
        },
    },
    actions: {
        login({ commit }, { token }) {
            commit('setLoggedIn', true);
            commit('setToken', token);
        },
        logout({ commit }) {
            commit('setLoggedIn', false);
            commit('setToken', null);
        }
    },
    getters: {
        isLoggedIn: state => state.isLoggedIn,
        token: state => state.token,
    }
});

export default store;
