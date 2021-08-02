<template>
  <div class="logar">
    <Campo
      id="email"
      nomelabel="E-mail"
      tipo="email"
      placeholder="xablau@gmail.com"
      :desativar="desativarCampos"
      v-on:digito="atualizarDados('email', $event)"
      :erroCampo="erros.email"
    />

    <Campo
      id="senha"
      nomelabel="Senha"
      tipo="password"
      placeholder="*****"
      :desativar="desativarCampos"
      v-on:digito="atualizarDados('senha', $event)"
      :erroCampo="erros.senha"
    />

    <Campo
      class="lembrarlogin"
      id="lembrarlogin"
      nomelabel="Continuar logado?"
      tipo="checkbox"
      :desativar="desativarCampos"
      v-on:digito="atualizarDados('lembrarlogin', $event)"
    />

    <div class="acoes">
      <button
        class="btn btn-success"
        @click="fazerLogin()"
        :disabled="desativarCampos"
      >
        Logar
      </button>
    </div>
  </div>
</template>

<style scoped>
.logar {
  width: 100%;
  display: flex;
  flex-direction: column;
}

.acoes {
  align-self: center;
}

.acoes button {
}
</style>

<script>
import Campo from "../componentes/Campo.vue";
export default {
  components: {
    Campo,
  },
  props: {
    desativarCampos: {
      type: Boolean,
      default: false,
    },
    ultimosErros: {
      type: Object,
    },
  },
  data() {
    return {
      dadosLogin: {
        email: "",
        senha: "",
        lembrarlogin: false,
      },
      erros: {
        email: "",
        senha: ""
      },
    };
  },
  watch: {
    ultimosErros() {
      for (let erro in this.ultimosErros.erros) {
        switch (erro) {
          case "1":
            this.erros.email = "E-mail não existe";
            break;
          case "2":
            this.erros.senha = "Senha incorreta";
            break;
          case "3": {
            this.erros.email = "E-mail invalido";
            break;
          }
          case "4": {
            this.erros.senha = "Senha precisa ter 6 caracteres";
            break;
          }
        }
      }
    },
  },
  methods: {
    fazerLogin() {
      console.log("Iniciando login...");
      this.$emit("realizar-login", { ...this.dadosLogin });
    },
    atualizarDados(key, dado) {
      this.dadosLogin[key] = dado;
      this.erros[key] = "";
    },
  },
};
</script>