<template>
  <div class="post">
      
  </div>
</template>

<script>
export default {
  props: {
    postagemData: {
      type: Object,
    },
  },
  beforeMount() {

    console.log("Carregando post com id " + this.postagemData.id_post);
  },
  mounted() {
    console.log("");
  },
};
</script>

<style>
.post {
  border: 1px solid blue;
}
</style>