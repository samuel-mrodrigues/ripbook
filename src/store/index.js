import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        api: {
            url: "http://localhost:8081/api"
        }
    },
    mutations: {},
    actions: {},
    modules: {}
})