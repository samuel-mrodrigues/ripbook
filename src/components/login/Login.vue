<template>
  <div class="painel">
    <div v-if="estaRegistrando">
      <Registro />
      <button @click="alterarLogin()">Voltar ao login</button>
    </div>

    <div v-else>
      <Login />
      <button @click="alterarLogin() ">Não tem conta? Crie uma!</button>
    </div>
  </div>
</template>

<script>
import Login from "./recursos/login_login.vue";
import Registro from "./recursos/login_registro.vue";

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
  },
};
</script>

<style>
.painel {
  border: 1px solid black;
}
</style>