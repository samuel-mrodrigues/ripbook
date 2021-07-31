<template>
  <div class="post">
    <div v-if="carregando">
      <span>Carregando...</span>
    </div>

    <div v-else>
      <div>
        {{ postagemDados.autor.nome }} postou >>
        <br />
        <br />
        <Conteudo :conteudoData="postagemDados.conteudo_post" />
        <br />
        <Curtidas :curtidas="postagemDados.curtidas" />
        <br />
        <Comentarios :comentarios="postagemDados.comentarios" />
        <br />
      </div>

      <button v-if="postCurtido == false" @click="curtir()">Curtir</button>
      <button v-else @click="descurtir()">Descurtir</button>

      <div>
        <input
          type="text"
          placeholder="Digite um comentario..."
          v-model="comentarioAtual"
        />
        <button @click="comentar()">Comentar</button>
      </div>
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
      postCurtido: false,
      comentarioAtual: "",
    };
  },
  beforeMount() {
    this.carregando = true;
    this.carregarPost();
  },
  methods: {
    async carregarPost() {
      console.log(`Carregando post ${this.post.id_post}`);
      let postId = this.post.id_post;

      let request = await axios.get(
        `${this.$store.state.api.url}/posts/${postId}`,
        {
          withCredentials: true,
        }
      );

      let dados = request.data;

      if (dados.status == 0) {
        let postServidor = dados.dados.post;
        this.postagemDados = postServidor;
        this.postCurtido = dados.dados.post.curtido;
        this.carregando = false;
      } else {
        console.log("Falha ao carregar post");
      }
    },
    async curtir() {
      let postId = this.postagemDados.id_post;

      let resposta = await axios.post(
        `${this.$store.state.api.url}/posts/${postId}/curtir`,
        {},
        {
          withCredentials: true,
        }
      );

      if (resposta.data.status == 0) {
        this.postCurtido = true;
        this.carregarPost();
      }
    },
    async descurtir() {
      let postId = this.postagemDados.id_post;

      let resposta = await axios.post(
        `${this.$store.state.api.url}/posts/${postId}/descurtir`,
        {},
        {
          withCredentials: true,
        }
      );

      if (resposta.data.status == 0) {
        this.postCurtido = false;
        this.carregarPost();
      }
    },
    async comentar() {
      let postId = this.postagemDados.id_post;

      let resposta = await axios.post(
        `${this.$store.state.api.url}/posts/${postId}/comentario`,
        {
          comentario: this.comentarioAtual,
        },
        {
          withCredentials: true,
        }
      );

      if (resposta.data.status == 0) {
        this.carregarPost();
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
  width: 300px;
  position: relative;
  display: inline-block;
}
</style>