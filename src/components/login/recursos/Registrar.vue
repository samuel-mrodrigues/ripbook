<template>
  <div class="registrar">
    <Campo
      id="nome"
      nomelabel="Seu primeiro nome"
      tipo="text"
      placeholder="Xablau"
      v-on:digito="atualizarDados('nome', $event)"
      :desativar="desativarCampos"
      :erroCampo="erros.nome"
    />

    <Campo
      id="sobrenome"
      nomelabel="Sobrenome"
      tipo="text"
      placeholder="Da Silva"
      v-on:digito="atualizarDados('sobrenome', $event)"
      :desativar="desativarCampos"
      :erroCampo="erros.sobrenome"
    />

    <Campo
      id="email"
      nomelabel="Seu e-mail"
      tipo="email"
      placeholder="xablau@gmail.com"
      v-on:digito="atualizarDados('email', $event)"
      :desativar="desativarCampos"
      :erroCampo="erros.email"
    />

    <Campo
      id="senha"
      nomelabel="Senha"
      tipo="password"
      placeholder="*****"
      v-on:digito="atualizarDados('senha', $event)"
      :desativar="desativarCampos"
      :erroCampo="erros.senha"
    />

    <div class="acoes">
      <button
        class="btn btn-success"
        @click="fazerRegistro()"
        :disabled="desativarCampos"
      >
        Registrar
      </button>
    </div>
  </div>
</template>

<style scoped>
.registrar {
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
      typeof: Boolean,
      default: false,
    },
    ultimosErros: {
      type: Object,
    },
  },
  data() {
    return {
      dadosRegistro: {
        nome: "",
        sobrenome: "",
        email: "",
        senha: "",
      },
      erros: {
        nome: "",
        sobrenome: "",
        email: "",
        senha: "",
      },
    };
  },
  watch: {
    ultimosErros() {
      for (let erro in this.ultimosErros.erros) {

        switch (erro) {
          case "1":
            this.erros.nome = "Nome invalido";
            break;
          case "2":
            this.erros.sobrenome = "Sobrenome invalido";
            break;
          case "3": {
            this.erros.email = "E-mail invalido";
            break;
          }
          case "4": {
            this.erros.senha = "Senha invalida";
            break;
          }
          case "5": {
            this.erros.senha = "Senha muito curta";
            break;
          }
          case "6": {
            this.erros.email = "E-mail já existe";
            break;
          }
        }
      }
    },
  },
  methods: {
    fazerRegistro() {
      console.log("Iniciando registro...");
      this.$emit("realizar-cadastro", { ...this.dadosRegistro });
    },
    atualizarDados(key, dado) {
      this.dadosRegistro[key] = dado;
      this.erros[key] = "";
    },
  },
};
</script>