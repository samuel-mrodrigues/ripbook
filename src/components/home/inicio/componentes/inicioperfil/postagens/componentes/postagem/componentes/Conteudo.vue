<template>
  <div class="conteudo">
    <div class="texto">
      {{ conteudoData }}
    </div>
  </div>
</template>

<style scoped>
.conteudo {
  background-color: rgba(121, 150, 255, 0.836);
  min-height: 50px;
  border-bottom: 1px solid black;
  border-radius: 5px;
  margin: 10px 0px;
}

.texto {
  text-align: center;
}
</style>

<script>
export default {
  props: {
    conteudoData: {
      type: String,
      default: "",
    },
  },
};
</script>