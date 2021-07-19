<template>
  <div>
    <h1>Inicio Logado</h1>
  </div>
</template>

<script>
import { getCookie } from "../../utilidades/cookie";
import axios from "axios";

export default {
  data() {
    return {};
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
        this.$router.push("./login")
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
</style>