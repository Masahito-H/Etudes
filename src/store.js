//import "babel-polyfill";
import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        isLoading: true,
        clearCanvasEvent: false,
        saveCanvasEvent: false
    },
    getters: {
        isLoading: (state) => {
            return state.isLoading;
        },
        clearCanvasEvent: (state) => {
            return state.clearCanvasEvent;
        },
        saveCanvasEvent: (state) => {
            return state.saveCanvasEvent;
        }
    },
    mutations: {
        setIsLoading: (state, payload) => {
            state.isLoading = payload;
        },
        setClearCanvasEvent: (state, payload) => {
            state.clearCanvasEvent = payload;
        },
        setSaveCanvasEvent: (state, payload) => {
            state.saveCanvasEvent = payload;
        }
    },
    actions: {
        clear({ commit }){
            commit("setClearCanvasEvent", true);
        },
        clearFinish({ commit }){
            commit("setClearCanvasEvent", false);
        },
        save({ commit }){
            commit("setSaveCanvasEvent", true);
        },
        saveFinish({ commit }){
            commit("setSaveCanvasEvent", false);
        },
        setStateLoading({ commit }, payload){
            commit("setIsLoading", payload);
        }
    }
});

export default store;
