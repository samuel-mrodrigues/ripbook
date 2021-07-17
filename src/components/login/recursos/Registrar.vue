<template>
  <div class="formulario">
    <Campo
      pid="nome"
      pnomelabel="Seu primeiro nome"
      ptipo="text"
      pplaceholder="Xablau"
      v-model="dadosRegistro.nome"
      :pdesativar="pdesativarCampos"
    />

    <Campo
      pid="sobrenome"
      pnomelabel="Sobrenome"
      ptipo="text"
      pplaceholder="Da Silva"
      v-model="dadosRegistro.sobrenome"
      :pdesativar="pdesativarCampos"
    />

    <Campo
      pid="email"
      pnomelabel="Seu e-mail"
      ptipo="email"
      pplaceholder="xablau@gmail.com"
      v-model="dadosRegistro.email"
      :pdesativar="pdesativarCampos"
    />

    <Campo
      pid="senha"
      pnomelabel="Senha"
      ptipo="password"
      pplaceholder="*****"
      v-model="dadosRegistro.senha"
      :pdesativar="pdesativarCampos"
    />

    <button @click="fazerRegistro()" :disabled="pdesativarCampos">Registrar</button>
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
      dadosRegistro: {
        nome: "",
        sobrenome: "",
        email: "",
        senha: "",
      },
    };
  },
  methods: {
    fazerRegistro() {
      console.log("Iniciando registro...");
      this.$emit("realizar-cadastro", {...this.dadosRegistro})
    },
  },
};
</script>

<style>
.formulario {
}
</style>