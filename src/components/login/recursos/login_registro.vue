<template>
  <div class="formulario">
    <Campo
      pid="nome"
      pnomelabel="Seu primeiro nome"
      ptipo="text"
      pplaceholder="Xablau"
      v-model="dadosRegistro.nome"
    />

    <Campo
      pid="sobrenome"
      pnomelabel="Sobrenome"
      ptipo="text"
      pplaceholder="Da Silva"
      v-model="dadosRegistro.sobrenome"
    />

    <Campo
      pid="email"
      pnomelabel="Seu e-mail"
      ptipo="email"
      pplaceholder="xablau@gmail.com"
      v-model="dadosRegistro.email"
    />

    <Campo
      pid="senha"
      pnomelabel="Senha"
      ptipo="password"
      pplaceholder="*****"
      v-model="dadosRegistro.senha"
    />

    <button @click="fazerRegistro()">Registrar</button>
  </div>
</template>

<script>
import Campo from "../componentes/Campo.vue";
export default {
  components: {
    Campo,
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
      console.log(this.dadosRegistro);
    },
  },
};
</script>

<style>
.formulario {
}
</style>