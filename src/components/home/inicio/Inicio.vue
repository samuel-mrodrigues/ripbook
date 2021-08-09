<template>
  <div id="inicio" v-if="estaAutorizado">
    <div class="notificacao" v-if="mostrarNotificacao">
      <div class="titulo">
        <p>{{ notificacaoData.titulo }}</p>
      </div>
      <div class="conteudo">
        <p>{{ notificacaoData.conteudo }}</p>
      </div>
    </div>

    <Acoes />
    <InicioPerfil />
  </div>
</template>

<style scoped>
#inicio {
  /* background-color: white; */
}

.notificacao {
  position: fixed;
  background-color: rgb(50, 50, 197);
  border-radius: 10px;
  width: 400px;
  height: 90px;

  bottom: 2%;
  right: 2%;
}

.notificacao .titulo {
  border-bottom: 2px solid rgb(100, 100, 204);
}

.notificacao .conteudo p {
  font-weight: 200;
}

.notificacao p {
  color: white;
}
</style>

<script>
import { getCookie } from "../../../utilidades/cookie";
import axios from "axios";

import Acoes from "../componentes/Acoes.vue";

import InicioPerfil from "./componentes/inicioperfil/InicioPerfil.vue";

export default {
  components: {
    InicioPerfil,
    Acoes,
  },
  data() {
    return {
      estaAutorizado: false,
      mostrarNotificacao: false,
      notificacaoData: {
        titulo: "",
        conteudo: ""
      },
      timerId: 0,
    };
  },
  created() {
    this.registrarNotificacoes();
  },
  methods: {
    registrarNotificacoes() {
      let novaNotificação = (msgNotificar) => {
        let jsonDados = JSON.parse(msgNotificar.data);

        if (jsonDados.tipo == "notificacao") {
          console.log(`Nova notificação recebida!`);
          this.notificacaoData.titulo = jsonDados.titulo;
          this.notificacaoData.conteudo = jsonDados.conteudo;

          this.mostrarNotificacao = true;

          clearTimeout(this.timerId);
          this.timerId = setTimeout(() => {
            this.mostrarNotificacao = false;
          }, 5000);
        }
      };

      this.$store.commit("setHandler", novaNotificação);
    },
  },
  async beforeCreate() {
    console.log("Carregando pagina de inicio..");
    console.log("Checando se o usuario tem uma sessão valida");

    let sessaoUsuario = getCookie("sessaoID", document.cookie);

    if (sessaoUsuario.length != 0) {
      console.log("Usuario tem uma sessão! Buscando ela no servidor..");
      console.log(sessaoUsuario);

      let resposta = await axios.post(
        `${this.$store.state.api.url}/login/logar/cookie`,
        {},
        {
          withCredentials: true,
        }
      );

      console.log(resposta);

      if (resposta.data.status != 0) {
        console.log("Sessão invalida. Redirecionado a pagina de login...");
        this.$router.push("./login");
      } else {
        console.log("Sessão valida!");
        this.$store.commit("setSessao", sessaoUsuario[1]);
        this.$store.commit("setDadosBasicos", resposta.data.dados.info_usuario);
        this.estaAutorizado = true;
      }
    } else {
      console.log(
        "Usuario não possui sessão. Redirecionando a pagina de login..."
      );
      this.$router.push("./login");
    }
  },
};
</script>
