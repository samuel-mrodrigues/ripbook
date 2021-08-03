<template>
  <div id="inicio" v-if="estaAutorizado">
    <Acoes />
    <InicioPerfil />
  </div>
</template>

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

      let resposta = await axios.get(
        `${this.$store.state.api.url}/login/logar/cookie`,
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

<style>
#inicio {
  border: 2px solid black;
  margin: 10px;
}
</style>