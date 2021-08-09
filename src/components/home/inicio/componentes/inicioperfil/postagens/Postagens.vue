<template>
  <div id="postagens">
    <div class="info">
      <p>Postagens recentes</p>
    </div>

    <div class="posts" v-if="postagens.length != 0">
      <Postagem
        v-for="post in postagens"
        v-bind:key="post.id_post"
        :post="post"
      />
    </div>

    <div class="posts" v-else>
      <p>Nenhuma postagem a mostrar</p>
    </div>
  </div>
</template>

<style scoped>
#postagens {
  /* border: 2px solid rgb(16, 139, 255); */
  width: 100%;
  background-color: rgb(61, 129, 255);
  padding: 10px;
}

.posts {
  width: 50%;
  margin: 0px auto;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.info {
  text-align: center;
  margin-bottom: 20px;
  background-color: rgb(121, 150, 231);
}

.info p {
  font-size: 1.6em;
}
</style>

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
  created() {
    this.registrarHandler();
  },
  methods: {
    registrarHandler() {
      console.log(`Escutando modificações de posts `);

      let atualizarPostagens = (novoUpdate) => {
        let jsonDados = JSON.parse(novoUpdate.data);

        if (jsonDados.tipo == "atualizarPostagens") {
          console.log(`Nova solicitação de update de posts`);
          this.carregarPostagens();
        }
      };

      this.$store.commit("setHandler", atualizarPostagens);
    },
    async carregarPostagens() {
      let posts = await axios.get(this.$store.state.api.url + "/posts", {
        withCredentials: true,
      });
      this.postagens = posts.data.dados.posts.reverse();
      this.postagens.update = "";

      if (this.carregando) this.carregando = false;
      console.log(`Lista de posts recebido`);
      console.log(this.postagens);
    },
  },
};
</script>