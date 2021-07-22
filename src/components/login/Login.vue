<template>
  <div class="painel">
    <div v-if="estaRegistrando">
      <Registro
        :class="{ bloqueado: desativarCampos }"
        v-on:realizar-cadastro="solicitarCadastro"
        :pdesativarCampos="desativarCampos"
      />

      <button @click="alterarLogin()" :disabled="desativarCampos">
        Voltar ao login
      </button>
    </div>

    <div v-else>
      <Login
        :class="{ bloqueado: desativarCampos }"
        v-on:realizar-login="solicitarLogin"
        :pdesativarCampos="desativarCampos"
      />

      <button @click="alterarLogin()" :disabled="desativarCampos">
        Não tem conta? Crie uma!
      </button>
    </div>
  </div>
</template>

<script>
import Login from "./recursos/Logar.vue";
import Registro from "./recursos/Registrar.vue";

import axios from "axios";
import { getCookie } from "../../utilidades/cookie";

export default {
  components: {
    Login,
    Registro,
  },
  data() {
    return {
      estaRegistrando: false,
      esperandoResposta: false,
      desativarCampos: false,
    };
  },
  watch: {
    esperandoResposta() {
      console.log("Bloqueando campos...");
      this.desativarCampos = this.esperandoResposta;
    },
  },
  methods: {
    alterarLogin() {
      this.setRegistrando(!this.estaRegistrando);
    },
    async solicitarCadastro(dados) {
      this.setEsperandoResposta(true);
      console.log("Enviando request de cadastro..");
      console.log(dados);
      let resposta = await axios.post(
        `${this.$store.state.api.url}/login/cadastro`,
        dados
      );
      console.log(resposta);

      if (resposta.data.status == 0) {
        console.log("Cadastro aprovado!");
        setTimeout(() => {
          this.setRegistrando(false);
          this.setEsperandoResposta(false);
        }, 1000);
      } else {
        setTimeout(() => {
          this.setEsperandoResposta(false);
        }, 1000);
      }
    },
    async solicitarLogin(dados) {
      this.setEsperandoResposta(true);
      console.log("Enviando request de login..");
      console.log(dados);
      let resposta = await axios.post(
        `${this.$store.state.api.url}/login/logar`,
        dados,
        {
          withCredentials: true,
        }
      );
      console.log(resposta);

      if (resposta.data.status == 0) {
        console.log("Login aprovado!");
        setTimeout(() => {
          let cookie = getCookie("sessaoID", document.cookie)[1];

          this.$store.commit("setSessao", cookie);
          this.$router.push("/inicio");
        }, 1000);
      } else {
        setTimeout(() => {
          this.setEsperandoResposta(false);
        }, 1000);
      }
    },
    setRegistrando(bool) {
      this.estaRegistrando = bool;
    },
    setEsperandoResposta(bool) {
      this.esperandoResposta = bool;
    },
  },
};
</script>

<style>
.painel {
  border: 1px solid black;
}

.bloqueado {
  opacity: 50%;
}
</style>