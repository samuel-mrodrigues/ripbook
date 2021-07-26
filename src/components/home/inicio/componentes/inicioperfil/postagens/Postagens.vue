<template>
  <div id="postagens">
    <span>Eu sou as postagens :)</span>
    <br />

    <Postagem
      v-for="post in postagens"
      v-bind:key="post.id_post"
      :post="post"
    />
  </div>
</template>

<script>
import axios from "axios";

import Postagem from "./componentes/postagem/Postagem.vue";
export default {
  components: {
    Postagem,
  },
  data() {
    return {
      postagens: [],
      carregando: true,
    };
  },
  beforeMount() {
    this.carregando = true;
    console.log("Recuperando lista de posts...");

    this.carregarPostagens();
  },
  methods: {
    async carregarPostagens() {
      let posts = await axios.get(this.$store.state.api.url + "/posts", {
        withCredentials: true,
      });
      this.postagens = posts.data.dados.posts;

      if (this.carregando) this.carregando = false;
    },
  },
};
</script>

<style>
#postagens {
  border: 2px solid darkgoldenrod;
  width: 500px;
  height: 500px;
}
</style>