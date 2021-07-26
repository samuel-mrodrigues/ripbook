<template>
  <div class="post">
    <div v-if="carregando">
      <span>Carregando...</span>
    </div>

    <div v-else>
      <Conteudo />
      <Curtidas />
      <Comentarios />
    </div>
    <br />
  </div>
</template>

<script>
import Curtidas from "./componentes/Curtidas.vue";
import Conteudo from "./componentes/Conteudo.vue";
import Comentarios from "./componentes/Comentarios.vue";

import axios from "axios";
export default {
  components: {
    Curtidas,
    Conteudo,
    Comentarios,
  },
  props: {
    post: {
      type: Object,
    },
  },
  data() {
    return {
      postagemDados: {},
      carregando: true,
    };
  },
  beforeMount() {
    this.carregando = true;
    this.carregarPost();
  },
  methods: {
    async carregarPost() {
      let postId = this.post.id_post;

      let request = await axios.get(
        `${this.$store.state.api.url}/posts/${postId}`,
        {
          withCredentials: true,
        }
      );
      
      if (request.data.status == 0) {
        let postServidor = request.data.dados.post;

        this.postagemDados = postServidor;

        this.carregando = false;
      } else {
        console.log("Falha ao carregar post");
      }
    },
  },
  computed: {
    curtidas() {
      return Object.keys(this.postagemDados.curtidas).length;
    },
  },
};
</script>

<style>
.post {
  border: 1px solid blue;
}
</style>