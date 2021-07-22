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

import Postagem from "./componentes/Postagem.vue";
export default {
  components: {
    Postagem,
  },
  data() {
    return {
      postagens: [],
      carregando: true,
      idInterval: 0,
    };
  },
  beforeMount() {
    this.carregando = true;
    console.log("Recuperando lista de posts...");

    this.carregarPostagens();
    this.iniciarObserver();
  },
  beforeDestroy() {
    console.log(
      "Postagens setado para exclusao, cancelando o timer de atualização de postagens..."
    );
    clearInterval(this.idInterval);
  },
  methods: {
    async carregarPostagens() {
      let posts = await axios.get(this.$store.state.api.url + "/posts", {
        withCredentials: true,
      });

      if (this.temDiferencaPosts(this.postagens, posts.data.dados.posts)) {
        console.log("Necessario atualizar as postagens...");
        this.postagens = posts.data.dados.posts;
        console.log(this.postagens);
      }

      if (this.carregando) this.carregando = false;
    },
    iniciarObserver() {
      this.idInterval = setInterval(() => {
        console.log("Checando por novas postagens...");
        this.carregarPostagens();
      }, 5000);
    },
    temDiferencaPosts(postsClient, postsServidor) {
      if (postsClient.length != postsServidor.length) return true;

      for (let index = 0; index < postsServidor.length; index++) {
        const postClient = postsClient[index];
        const postServer = postsServidor[index];

        if (postClient.id_post != postServer.id_post) return true;
      }
      return false;
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