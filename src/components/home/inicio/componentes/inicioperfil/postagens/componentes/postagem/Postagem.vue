<template>
  <div class="post">
    <div v-if="carregando">
      <span>Carregando...</span>
    </div>

    <div class="postdata" v-else>
      <div class="autor">
        <p>
          {{
            `${postagemDados.autor.nome} ${postagemDados.autor.sobrenome} publicou`
          }}
        </p>
        <div class="divisor" />
      </div>

      <Conteudo :conteudoData="postagemDados.conteudo_post" />
      <Curtidas :curtidas="postagemDados.curtidas" />

      <div class="acoes">
        <div class="curtir">
          <button
            class="curtirBotao"
            v-if="postCurtido == false"
            @click="curtir()"
          >
            Curtir
          </button>
          <button class="descurtirBotao" v-else @click="descurtir()">
            Descurtir
          </button>
        </div>

        <div class="comentar">
          <input
            type="text"
            placeholder="Digite um comentario..."
            v-model="comentarioAtual"
          />
          <button class="comentarBotao" @click="comentar()">Comentar</button>
        </div>
      </div>

      <Comentarios :comentarios="postagemDados.comentarios" />
    </div>
  </div>
</template>

<style scoped>
.post {
  border-radius: 3px;
  width: 80%;
  display: inline-block;
  background-color: rgba(163, 183, 255, 0.836);
  padding: 10px;
  margin-bottom: 50px;
}

.acoes {
  display: flex;
  justify-content: space-between;
}

.acoes button {
  outline: none;
  border: none;
  color: white;
  font-weight: 500;
}

.curtirBotao {
  background-color: green;
}

.descurtirBotao {
  background-color: red;
}

.comentarBotao {
  background-color: rgb(56, 95, 223);
}

.curtir {
  margin-bottom: 10px;
}

.comentar input {
  outline: none;
  border: none;
  color: black;
  margin-right: 10px;
}

p {
  font-weight: 500;
}

.divisor {
  width: 80%;
  border-bottom: 1px solid rgb(70, 110, 255);
  margin: 0px auto;
}
.autor {
  text-align: center;
}
</style>


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
  created() {
    this.registraHandler();
  },
  methods: {
    registraHandler() {
      console.log(`Escutando modificações no POST ${this.post.id_post}`);

      let atualizarPostagem = (novoUpdate) => {
        let jsonDados = JSON.parse(novoUpdate.data);

        if (jsonDados.tipo == "atualizarPostagem") {
          if (jsonDados.postId == this.post.id_post) {
            console.log(
              `Nova solicitação de update do post ${jsonDados.postId}`
            );
            this.carregarPost();
          }
        }
      };

      this.$store.commit("setHandler", atualizarPostagem);
    },
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
        this.comentarioAtual = ""
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
