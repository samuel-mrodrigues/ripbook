import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        api: {
            // url: "http://192.168.1.98:8081/api"
            url: "http://192.168.0.102:8081/api",
            wsUrl: "192.168.0.102:8082",
            wsConexao: ""
        },
        handlers: [],
        sessaoID: "",
        dadosBasicos: {},
    },
    mutations: {
        setSessao(state, novaSessao) {
            if (state.sessaoID == "") {
                console.log("Setando nova sessão para " + novaSessao);
                state.sessaoID = novaSessao
            } else {
                console.log("Já existe uma sessão, ignorando o set...");
            }
        },
        setDadosBasicos(state, dadosUsuario) {
            state.dadosBasicos = dadosUsuario
        },
        iniciarWS(state) {
            console.log("Iniciando conexão com o WebSocket...");

            let url = state.api.wsUrl;
            console.log(`IP: ${url}`);

            let conexao = new WebSocket(`ws://${url}`);

            conexao.onopen = () => {
                console.log("WebSocket: Conectado ao WebSocket!");
            };

            conexao.onerror = () => {
                console.log(`WebSocket: Erro ao conectar-se em ${state.api.wsUrl}`);
            }

            conexao.onmessage = (novaMensagem) => {
                console.log("Nova mensagem do WebSocket:");
                console.log(novaMensagem);

                state.handlers.forEach(handler => {
                    handler(novaMensagem)
                });
            }

            state.api.wsConexao = conexao
        },
        setHandler(state, handlerPage) {
            state.handlers.push(handlerPage)
        }
    },
    actions: {},
    modules: {}
})