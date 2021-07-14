<template>
  <div class="painel">

    <div v-if="estaRegistrando">
      <Registro
      v-on:realizar-cadastro="solicitarCadastro" />
      <button @click="alterarLogin()">Voltar ao login</button>
    </div>

    <div v-else>
      <Login
      v-on:realizar-login="solicitarLogin" />
      <button @click="alterarLogin() ">Não tem conta? Crie uma!</button>
    </div>
    
  </div>
</template>

<script>
import Login from "./recursos/Logar.vue";
import Registro from "./recursos/Registrar.vue";

import axios from "axios"

export default {
  components: {
    Login,
    Registro,
  },
  data() {
    return {
      estaRegistrando: true,
    };
  },
  methods: {
    alterarLogin() {
      this.estaRegistrando = !this.estaRegistrando;
    },
    solicitarCadastro(dados) {
      console.log(dados);
      axios.post("http://localhost:8081/api/login/cadastro", dados)
    },
    solicitarLogin(dados) {
      console.log(dados);
       axios.post("http://localhost:8081/api/login/logar", dados)
    }
  },
};
</script>

<style>
.painel {
  border: 1px solid black;
}
</style>