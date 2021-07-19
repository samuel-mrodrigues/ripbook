<template>
  <div id="acoes">
    Acoes :)
    <button>Inicio</button>
    <button>Meu perfil</button>
    <button @click="sair">Sair</button>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  methods: {
    inicio() {
      console.log("Voltando ao inicio...");
      this.$router.push("./inicio")
    },
    meuperfil() {},
    async sair() {
      let sessao = this.$store.state.sessaoID;
      console.log("Realizando logout de " + sessao);

      let resultado = await axios.post(this.$store.state.api.url + "/login/logout", {
        sessao: sessao
      })

      if (resultado.data.status == 0) {
        this.$router.push("./login")
      }

      console.log(resultado);
    },
  },
};
</script>

<style>
#acoes {
  border: 2px solid blue;
}
</style>