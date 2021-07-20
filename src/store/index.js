import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        api: {
            url: "http://192.168.1.98:8081/api"
        },
        sessaoID: ""
    },
    mutations: {
        setSessao(state, novaSessao) {
            if (state.sessaoID == "") {
                console.log("Setando nova sessão para " + novaSessao);
                state.sessaoID = novaSessao
            } else {
                console.log("Já existe uma sessão, ignorando o set...");
            }
        }
    },
    actions: {},
    modules: {}
})