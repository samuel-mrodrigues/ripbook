<template>
  <div id="postagens">
    <span>Eu sou as postagens :)</span>

    <br />

    <Postagem
      v-for="post in postagens"
      v-bind:key="post.id_post"
      :postagemData="post"
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
    };
  },
  async mounted() {
    console.log("Recuperando lista de posts...");

    let posts = await axios.get(this.$store.state.api.url + "/post", {
      withCredentials: true,
    });

    console.log(posts);
    this.postagens = { ...posts.data };
    console.log(this.postagens);
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