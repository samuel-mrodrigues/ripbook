<template>
  <div class="comentarios" v-if="comentarios.length != 0">
    <p>Comentarios</p>

    <div
      :class="`comentario ${index % 2 == 0 ? 'cor1' : 'cor2'}`"
      v-for="(comentario, index) in comentarios"
      :key="comentario.id_comentario"
    >
      <p>
        {{ `${comentario.autor.nome} ${comentario.autor.sobrenome}` }} comentou:
        {{ `${comentario.comentario}` }}
      </p>
    </div>

    
  </div>

  <div v-else class="comentarios">
    <p>Nenhum comentario ainda :(</p>
  </div>
</template>

<style>
.comentarios {
  border-radius: 5px;
  background-color: rgb(106, 141, 240);
  margin: 10px 0px;
}

.comentario {
  border-radius: 5px;
  margin: 10px 0px;
}

.comentario p {
  text-align: left;
  word-break: break-all;
}

p {
  margin: 0;
  padding: 0;
  text-align: center;
  font-weight: 500;
}

.cor1 {
  background-color: rgb(106, 141, 240);
}

.cor2 {
  background-color: rgba(158, 179, 255, 0.836);
}
</style>

<script>
export default {
  props: {
    comentarios: {
      type: [],
    },
  },
};
</script>
