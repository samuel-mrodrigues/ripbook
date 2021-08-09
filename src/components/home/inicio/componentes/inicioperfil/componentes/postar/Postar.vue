<template>
  <div id="postar">
    <div class="info">
      <p>Quer compartilhar algo com o mundo?</p>
    </div>

    <div class="caixaPostar">
      <div>
        <textarea
          id="conteudo"
          type="text"
          placeholder="Como esta se sentindo?"
          v-model="comentario"
          rows="3"
        />
      </div>
    </div>

    <button class="publicar" @click="RIPIT">Publicar</button>
  </div>
</template>

<style scoped>
#postar {
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
  margin-top: 10px;
  padding: 10px;

  background-color: #3d81ff;
}

.info p {
  padding: 0;
  margin: 0;
  font-size: 1.6em;
  text-align: center;
  margin-bottom: 20px;
  background-color: rgb(121, 150, 231);
}

.caixaPostar {
  width: 50%;
  height: 100%;
  border-radius: 3px;
  align-self: center;
}

.caixaPostar div {
  width: 50%;
  margin: 0px auto;
}

.caixaPostar textarea {
  resize: none;
  width: 100%;
  border: 1px solid rgb(27, 109, 216);
  outline: none;
}

button {
  border: none;
  outline: none;
  color: white;
  border-radius: 4px;
  padding: 10px;
  align-self: center;
  margin-top: 5px;
  background-color: rgba(23, 194, 1, 0.822);
}
</style>

<script>
import axios from "axios";

export default {
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
        this.comentario = ""
      }
    },
  },
};
</script>
