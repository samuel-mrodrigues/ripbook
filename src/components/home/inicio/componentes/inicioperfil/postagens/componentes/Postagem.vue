<template>
  <div class="post">
      Usuario ID: {{postagemData.usuario_id}}
      Conteudo do post: {{postagemData.conteudo_post}}
  </div>
</template>

<script>
export default {
  props: {
    postagemData: {
      type: Object,
    },
  },
};
</script>

<style>
.post {
  border: 1px solid blue;
}
</style>