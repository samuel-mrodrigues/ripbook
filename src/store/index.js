import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        api: {
<<<<<<< HEAD
            url: "http://192.168.1.98:8081/api"
=======
            url: "http://192.168.0.103:8081/api"
>>>>>>> de09481584886b8fa01ee9ad7731ebbe5f310c64
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