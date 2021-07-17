<template>
  <div class="campo">
    <label :for="id">{{ nome }}</label>

    <input
      v-if="tipo == 'checkbox'"
      :type="tipo"
      :id="id"
      :placeholder="pplaceholder"
      v-model="data"
      @click="emiteCampo"
      :disabled="pdesativar"
    />
    <input
      v-else
      :type="tipo"
      :id="id"
      :placeholder="placeholder"
      v-model="data"
      @keyup="emiteCampo"
      :disabled="pdesativar"
    />
  </div>
</template>

<script>
export default {
  props: {
    pnomelabel: {
      type: String,
      default: "Label não definido",
    },
    pid: {
      type: String,
    },
    ptipo: {
      default: "text",
    },
    pplaceholder: {
      type: String,
      default: "",
    },
    pvalor: {
      default: "",
    },
    pdesativar: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      nome: this.pnomelabel,
      id: this.pid,
      tipo: this.ptipo,
      placeholder: this.pplaceholder,
      data: this.pvalor,
      desativar: this.pdesativar
    };
  },
  mounted() {
    this.$emit("input", this.data);
  },
  methods: {
    emiteCampo() {
      if (this.tipo == "checkbox") {
        this.data = !this.data;
      }
      this.$emit("input", this.data);
    },
  },
};
</script>

<style>
.campo {
  border: 1px solid red;
}
</style>