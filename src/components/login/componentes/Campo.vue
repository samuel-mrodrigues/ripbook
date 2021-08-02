<template>
    <div class="form-group">
      <label :for="id">{{ nomelabel }}</label>
      <input
        class="form-inline"
        :type="tipo"
        :id="id"
        :placeholder="placeholder"
        :disabled="desativar"
        v-model="data"
      />

      <div class="erro" v-if="erroCampo != ''">
        {{ erroCampo }}
      </div>

      <div class="divisor"></div>
    </div>
</template>

<style scoped>
.erro {
  display: inline-block;
  position: absolute;
  margin-left: 10px;
  padding: 5px 10px 5px 10px;
  background-color: rgba(255, 0, 0, 0.747);
  color: white;

  border-radius: 4px;
}

.form-group {
  margin-bottom: 10px;
}
.divisor {
  width: 60%;
  border-bottom: 0.5px solid rgba(255, 255, 255, 0.329);
  margin: 5px auto;
}
label {
  margin-right: 10px;
  width: 200px;
  text-align: right;
  font-size: 1.3em;
  color: white;
}

input {
  line-height: 30px;
  text-align: center;
  border-width: 0.2pt;
  border-radius: 3px;
  border-color: rgb(0, 0, 0);
}

input:focus {
  outline-color: rgb(255, 255, 255);
  outline-offset: 0px;
  animation-name: fadeInCampo;
  animation-duration: 2s;
}

@keyframes fadeInCampo {
  from {
    outline-color: rgb(255, 255, 255);
  }
  to {
    outline-color: rgb(0, 0, 0);
  }
}
</style>

<script>
export default {
  props: {
    nomelabel: {
      type: String,
      default: "Label não definido",
    },
    id: {
      type: String,
    },
    tipo: {
      default: "text",
    },
    placeholder: {
      type: String,
      default: "",
    },
    valor: {
      default: "",
    },
    desativar: {
      type: Boolean,
      default: false,
    },
    erroCampo: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      data: this.valor,
    };
  },
  watch: {
    data() {
      this.emiteCampo();
    },
    erroCampo() {},
  },
  methods: {
    emiteCampo() {
      this.$emit("digito", this.data);
    },
  },
};
</script>

