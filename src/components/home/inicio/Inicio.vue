<template>
  <div id="inicio" v-if="estaAutorizado">
    <Acoes />
    <InicioPerfil />
  </div>
</template>

<style>
#inicio {
  background-color: white;
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
    };
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
