<template>
  <div class="inicio">
    <div class="cabecalho">
      <img src="./assets/hamster.gif" />
      <h1>RIPBook</h1>
      <div class="divisor"></div>
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
  padding: 15px;
  background-image: url("./assets/fundologin.jpg");
  font-family: "FontePadrao1";
  font-size: 1.2em;
}

.cabecalho {
  margin: 0px auto;
  text-align: center;
  color: white;
  margin: 5% 0 5% 0;
}

.cabecalho h1 {
  font-size: 4em;
  font-family: "FonteLogo";
}
.cabecalho img {
  border-radius: 40%;
  opacity: 90%;
}

.cabecalho .divisor {
  width: 20%;
  border: 2px solid white;
  margin: 10px auto 20px auto;
}

.login {
  width: 630px;
  display: flex;
  flex-direction: column;
  background-color: rgba(0, 0, 0, 0.829);

  border-top: 1px solid white;
  border-radius: 4px;

  margin: 0px auto;
  padding: 25px 25px;
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
    },
  },
  methods: {
    async alterarLogin() {
      this.desativarCampos = true;
      this.setRegistrando(!this.estaRegistrando);
      this.desativarCampos = false;
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