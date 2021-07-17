<template>
  <div class="formulario">
    <Campo
      pid="email"
      pnomelabel="Seu e-mail"
      ptipo="email"
      pplaceholder="xablau@gmail.com"
      v-model="dadoslogin.email"
      pvalor="samuel@"
      :pdesativar="pdesativarCampos"
    />

    <Campo
      pid="senha"
      pnomelabel="Senha"
      ptipo="password"
      pplaceholder="*****"
      v-model="dadoslogin.senha"
      pvalor="123456"
      :pdesativar="pdesativarCampos"
    />

    <Campo
      class="lembrarlogin"
      pid="lembrarlogin"
      pnomelabel="Lembrar login"
      ptipo="checkbox"
      v-model="dadoslogin.lembrarlogin"
      :pdesativar="pdesativarCampos"
    />

    <button @click="fazerLogin()" :disabled="pdesativarCampos">Logar</button>
  </div>
</template>

<script>
import Campo from "../componentes/Campo.vue";
export default {
  components: {
    Campo,
  },
  props: {
    pdesativarCampos: {
      typeof: Boolean,
      default: false,
    },
  },
  data() {
    return {
      dadoslogin: {
        email: "",
        senha: "",
        lembrarlogin: false,
      },
    };
  },
  methods: {
    fazerLogin() {
      console.log("Iniciando login...");
      this.$emit("realizar-login", { ...this.dadoslogin });
    },
  },
};
</script>

<style>
.formulario {
}

.lembrarlogin input[type="checkbox"] {
  padding: 5px;
}
</style>