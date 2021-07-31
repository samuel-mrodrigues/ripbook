<template>
  <div>
    Comentarios:

    <div v-for="comentario in comentarios" :key="comentario.id_comentario">
      {{comentario.autor.nome}} comentou: {{comentario.comentario}}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    comentarios: {
      type: [],
    },
  },
};
</script>

<style>
</style>