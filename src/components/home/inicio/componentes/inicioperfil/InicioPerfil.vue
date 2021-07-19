<template>
  <div id="perfilhome">
    <span>Eu sou o perfil home, apos o inicio</span>
    <Foto />
    <Postar />
    <Postagens />
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
};
</script>

<style>
#perfilhome {
  border: 2px solid red;
}
</style>