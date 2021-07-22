<template>
  <div class="post">
    <div v-if="carregando">
      <span>Carregando...</span>
    </div>

    <div v-else>
      <span>{{ postagemDados.autor.nome }} postou:</span>
      <span>{{ postagemDados.conteudo_post }}</span>
    </div>
    <br />
  </div>
</template>

<script>
import axios from "axios";
export default {
  props: {
    post: {
      type: Object,
    },
  },
  data() {
    return {
      postagemDados: {},
      carregando: true,
      idInterval: 0,
    };
  },
  beforeMount() {
    this.carregando = true;
    this.carregarPost();
  },
  beforeDestroy() {
    clearInterval(this.idInterval);
  },
  watch: {
    carregando() {
      if (!this.carregando) this.iniciarObserver();
    },
  },
  methods: {
    async carregarPost() {
      let postId = this.post.id_post;

      let request = await axios.get(
        `${this.$store.state.api.url}/posts/${postId}`, {
          withCredentials: true
        }
      );
      if (request.data.status == 0) {
        let postServidor = request.data.dados.post;

        if (
          this.postagemDados.usuario_id != postServidor.usuario_id ||
          this.postagemDados.conteudo_post != postServidor.conteudo_post
        ) {
          this.postagemDados = postServidor;
          console.log(`Atualizando post ${postId} com dados novos do servidor`);
        }
        this.carregando = false;
      } else {
        console.log("Falha ao carregar post");
      }
    },
    // Futuramente substituir por um WebSocket para enviar notificações em tempo real...
    iniciarObserver() {
      this.idInterval = setInterval(() => {
        this.carregarPost();
      }, 5000);

      console.log(
        `Timer de atualização do post ${this.postagemDados.id_post} é ${this.idInterval}`
      );
    },
  },
};
</script>

<style>
.post {
  border: 1px solid blue;
}
</style>