<template>
  <div id="inicioperfil">
    <div class="comprimentos">
      <p>Olá {{ $store.state.dadosBasicos.nome }}</p>
    </div>
    <Foto />
    <Postar/>
    <Postagens/>
  </div>
</template>

<style>
#inicioperfil {
  display: flex;
  flex-direction: column;

  border-radius: 15px;
  background-color: rgba(14, 203, 209, 0.904);
}

.comprimentos p {
  padding: 0;
  margin: 0;
  font-size: 2em;
  font-weight: 500;
  text-align: center;
}
</style>

<script>
import Foto from "./componentes/Foto.vue";
import Postar from "./componentes/postar/Postar.vue";
import Postagens from "./postagens/Postagens.vue";

export default {
  components: {
    Foto,
    Postar,
    Postagens,
  },
  data() {
    return {};
  },
  created() {
    this.iniciarWebSocket();
  },
  methods: {
    iniciarWebSocket() {
      this.$store.commit("iniciarWS");
    },
  },
};
</script>

