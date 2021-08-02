<template>
  <div class="inicio">
    <div class="cabecalho">
      <h1>Boas-Vindas ao RiPBooK</h1>
    </div>

    <div class="login">
      <Registro
        v-if="estaRegistrando"
        v-on:realizar-cadastro="solicitarCadastro"
        :desativarCampos="desativarCampos"
        :ultimosErros="statusLogin"
      />

      <Login
        v-else
        v-on:realizar-login="solicitarLogin"
        :desativarCampos="desativarCampos"
        :ultimosErros="statusLogin"
      />

      <div class="acoes">
        <button
          class="btn btn-dark"
          @click="alterarLogin()"
          :disabled="desativarCampos"
        >
          {{ estaRegistrando ? "Voltar ao login" : "Novo? Registre-se" }}
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.inicio {
  height: 100%;
  border: 2px solid black;
  background-image: url("./assets/fundologin.jpg");
}
.cabecalho {
  margin: 0px auto;
  text-align: center;
  color: white;
  margin: 5% 0 10% 0
}
.login {
  width: 600px;
  display: flex;
  flex-direction: column;

  background-color: rgba(0, 0, 0, 0.836);
  border-radius: 6px;

  margin: 0px auto;
}

.acoes {
  align-self: flex-start;
}

.bloqueado {
  opacity: 50%;
}
</style>

<script>
import Login from "./recursos/Logar.vue";
import Registro from "./recursos/Registrar.vue";

import axios from "axios";
import { getCookie } from "../../utilidades/cookie";
import $ from "jquery";

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
      statusLogin: {},
    };
  },
  watch: {
    esperandoResposta() {
      this.desativarCampos = this.esperandoResposta;

      if (this.esperandoResposta) {
        $(".login").fadeTo(500, 0.5);
      } else {
        $(".login").fadeTo(500, 1);
      }
    },
  },
  methods: {
    async alterarLogin() {
      this.desativarCampos = true;
      $(".login").fadeTo(500, 0, () => {
        this.setRegistrando(!this.estaRegistrando);
        this.desativarCampos = false;
        $(".login").fadeTo(500, 1);
      });
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
        this.setRegistrando(false);
        this.setEsperandoResposta(false);
      } else {
        this.setEsperandoResposta(false);
        this.statusLogin = resposta.data;
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
        let cookie = getCookie("sessaoID", document.cookie)[1];

        this.$store.commit("setSessao", cookie);
        this.$router.push("/inicio");
      } else {
        console.log("Login recusado");

        this.setEsperandoResposta(false);
        this.statusLogin = resposta.data;
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