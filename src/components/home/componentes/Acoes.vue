<template>
  <div id="acoes">
    <button>Inicio</button>
    <!-- <button>Meu perfil</button> -->
    <button @click="sair">Sair</button>
  </div>
</template>

<style scoped>
#acoes {
  width: 100%;
  display: flex;
  justify-content: flex-end;
}

#acoes button {
  border: none;
  outline: 1px solid white;
  background-color: black;
  color: white;
}
</style>

<script>
import axios from "axios";
export default {
  methods: {
    inicio() {
      console.log("Voltando ao inicio...");
      this.$router.push("./inicio");
    },
    meuperfil() {},
    async sair() {
      let sessao = this.$store.state.sessaoID;
      console.log("Realizando logout de " + sessao);

      let resultado = await axios.post(
        this.$store.state.api.url + "/login/logout",
        {},
        {
          withCredentials: true,
        }
      );

      if (resultado.data.status == 0) {
        this.$router.push("./login");
      }

      console.log(resultado);
    },
  },
};
</script>

