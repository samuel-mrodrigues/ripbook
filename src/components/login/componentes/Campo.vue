<template>
  <div class="form-group" :title="textoDica">
    <label :for="id">{{ nomelabel }}</label>
    <input
      class="form-inline"
      :type="tipo"
      :id="id"
      :placeholder="placeholder"
      :disabled="desativar"
      v-model="data"
      @focus="mostrarRegras = true"
      @blur="mostrarRegras = false"
    />

    <div class="erro" v-if="erroCampo != ''">
      {{ erroCampo }}
    </div>

    <div class="dica" v-show="mostrarRegras && textoRegras.length != 0">
      <p class="texto" v-for="(regra, index) of textoRegras" :key="index">
        {{ regra }}
      </p>
    </div>

    <div
      v-if="mostrarDivisor"
      class="divisor"
      :style="{ width: `${tamanhoDivisor}%` }"
    ></div>
  </div>
</template>

<style scoped>
.erro {
  display: inline-block;
  position: absolute;
  margin-left: 10px;
  padding: 5px 10px 5px 10px;
  background-color: rgba(204, 7, 7, 0.747);
  color: white;

  border-radius: 4px;
}

.form-group {
  margin-bottom: 10px;
}
.divisor {
  width: 60%;
  border-bottom: 0.5px solid rgba(255, 255, 255, 0.514);
  margin: 10px auto;
  border-width: 2px;
}

.dica {
  box-sizing: border-box;
  width: 70%;
  margin: 10px auto;
  border: 1.5px solid white;
  border-radius: 5px;
}

.dica .texto {
  color: white;
  text-align: center;
  margin: 0;
  padding: 0;
}

label {
  margin-right: 10px;
  width: 240px;
  text-align: right;
  font-size: 1.3em;
  color: white;
}

input {
  text-align: center;
  border: none;
  outline: none;
}

input:focus {
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
    mostrarDivisor: {
      type: Boolean,
      default: true,
    },
    tamanhoDivisor: {
      type: Number,
      default: 50,
    },
    textoDica: {
      type: String,
      default: "",
    },
    textoRegras: {
      type: [],
      default: () => []
    },
  },
  data() {
    return {
      data: this.valor,
      mostrarRegras: false,
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

