import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        api: {
            url: "http://192.168.0.103:8081/api"
        },
        sessaoID: ""
    },
    mutations: {
        setSessao(state, novaSessao) {
            console.log("Setando nova sessão para " + novaSessao);
            state.sessaoID = novaSessao
        }
    },
    actions: {},
    modules: {}
})