<template>
  <div id="perfilhome">
    <span>Eu sou o perfil home, apos o inicio</span>
    <Foto />
    <Postar v-on:atualizar-postagens="atualizarPostagens()"/>
    <Postagens ref="postagens" />
  </div>
</template>

<script>
import Foto from "./componentes/Foto.vue";
import Postar from "./componentes/postar/Postar.vue";
import Postagens from "./postagens/Postagens.vue"

export default {
  components: {
    Foto,
    Postar,
    Postagens
  },
  methods: {
    atualizarPostagens() {
      console.log("InicioPerfil: Chamando novas atualização de postagens...");
      this.$refs.postagens.carregarPostagens()
    }
  }
};
</script>

<style>
#perfilhome {
  border: 2px solid red;
}
</style>