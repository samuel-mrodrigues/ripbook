<template>
  <div id="inicioperfil">

    <div class="comprimentos">
      <p>Olá {{ $store.state.dadosBasicos.nome }}</p>
    </div>
    <Foto />
    <Postar v-on:atualizar-postagens="atualizarPostagens()" />
    <Postagens ref="postagens" />
  </div>
</template>

<style>
#inicioperfil {
  display: flex;
  flex-direction: column;
}

.comprimentos {

}

.comprimentos p {
  padding: 0;
  margin: 0;
  font-size: 2.0em;
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
  methods: {
    atualizarPostagens() {
      console.log("InicioPerfil: Chamando novas atualização de postagens...");
      this.$refs.postagens.carregarPostagens();
    },
  },
};
</script>

