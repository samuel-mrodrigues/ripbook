<template>
  <div class="curtidas">
    <p>
      {{ totalCurtidas }}
    </p>
  </div>
</template>

<style scoped>
.curtidas {
  margin: 10px 0px;
}

.curtidas p {
  margin: 0;
  padding: 0;
  text-align: left;
}
</style>

<script>
export default {
  props: {
    curtidas: {
      type: [],
    },
  },
  computed: {
    totalCurtidas() {
      let msgCurtidas = "";
      if (this.getNumCurtidas() > 1) {
        msgCurtidas = `${this.getNumCurtidas()} curtidas :D`;
      } else if (this.getNumCurtidas() == 1) {
        msgCurtidas = `${this.getNumCurtidas()} curtida :/`;
      } else {
        msgCurtidas = "Nenhuma curtida :(";
      }

      return msgCurtidas;
    },
  },
  methods: {
    getNumCurtidas() {
      return this.curtidas.length;
    },
  },
};
</script>

