<template>
  <div>
    <span>{{totalCurtidas}} curtida{{totalCurtidas > 1?'s':''}}</span>
  </div>
</template>

<script>
export default {
  props: {
    curtidas: {
      type: []
    }
  },
  created() {
  },
  computed: {
    totalCurtidas() {
      return this.curtidas.length
    }
  }
};
</script>

<style>
</style>