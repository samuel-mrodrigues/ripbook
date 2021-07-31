<template>
  <div id="postar">
    <span>Quer compartilhar algo?</span>
    <br />

    <Campo
      pid="conteudo"
      :pmostralabel="false"
      pplaceholder="Hoje eu consegui...."
      v-model="comentario"
    />

    <button @click="RIPIT">Publicar</button>
  </div>
</template>

<script>
import Campo from "./componentes/Campo.vue";

import axios from "axios";

export default {
  components: {
    Campo,
  },
  data() {
    return {
      comentario: "",
    };
  },
  methods: {
    async RIPIT() {
      console.log("Enviando novo post...");
      console.log(this.comentario);

      let resultado = await axios.post(
        this.$store.state.api.url + "/posts",
        {
          comentario: this.comentario,
        },
        {
          withCredentials: true,
        }
      );
      if (resultado.data.status == 0) {
        console.log("Postagem realizada!");
        this.$emit("atualizar-postagens")
      }
    }
  },
};
</script>

<style>
#postar {
  border: 2px solid darkgreen;
}
</style>