<template>
  <div class="registrar">
    <Campo
      id="nome"
      nomelabel="Nome"
      tipo="text"
      placeholder="Xablau"
      v-on:digito="atualizarDados('nome', $event)"
      :desativar="desativarCampos"
      :erroCampo="erros.nome"
      :tamanhoDivisor="63"
      textoDica="Digite somente seu primeiro nome"
      :textoRegras="['- Minimo 2 letras']"
    />

    <Campo
      id="sobrenome"
      nomelabel="Sobrenome"
      tipo="text"
      placeholder="Da Silva"
      v-on:digito="atualizarDados('sobrenome', $event)"
      :desativar="desativarCampos"
      :erroCampo="erros.sobrenome"
      :tamanhoDivisor="72"
      textoDica="Digite o restante do seu sobrenome"
      :textoRegras="['- Minimo 3 letras']"
    />

    <Campo
      id="email"
      nomelabel="E-mail"
      tipo="email"
      placeholder="xablau@gmail.com"
      v-on:digito="atualizarDados('email', $event)"
      :desativar="desativarCampos"
      :erroCampo="erros.email"
      :tamanhoDivisor="63"
      textoDica="Digite um endereço de e-mail valido"
      :textoRegras="[
        'Este e-mail será utilizado para efetuar seu login',
        '- É obrigatorio um @',
      ]"
    />

    <Campo
      id="senha"
      nomelabel="Senha"
      tipo="password"
      placeholder="*****"
      v-on:digito="atualizarDados('senha', $event)"
      :desativar="desativarCampos"
      :erroCampo="erros.senha"
      :mostrarDivisor="false"
      textoDica="Digite sua senha"
            :textoRegras="
      [
        '- Senha precisa ter no mínimo 6 caracteres.',
      ]"
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
  margin-top: 20px;
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