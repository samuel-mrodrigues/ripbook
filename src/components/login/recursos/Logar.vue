<template>
  <div class="formulario">
      
      <Campo pid="email" 
      pnomelabel="Seu e-mail" 
      ptipo="email" 
      pplaceholder="xablau@gmail.com" 
      v-model="dadoslogin.email"/>

      <Campo pid="senha"
      pnomelabel="Senha"
      ptipo="password"
      pplaceholder="*****"
      v-model="dadoslogin.senha"
       />

       <Campo class="lembrarlogin" pid="lembrarlogin"
      pnomelabel="Lembrar login"
      ptipo="checkbox"
      v-model="dadoslogin.lembrarlogin"
       />

       <button @click="fazerLogin()">Logar</button>
  </div>
</template>

<script>
import Campo from "../componentes/Campo.vue"
export default {
    components: {
        Campo
    },
    data() {
        return {
            dadoslogin: {
                email: "",
                senha: "",
                lembrarlogin: false
            }
        }
    },
    methods: {
        fazerLogin() {
            console.log("Iniciando login...");
            this.$emit("realizar-login", {...this.dadoslogin})
        }
    }
};
</script>

<style>
.formulario {

}

.lembrarlogin input[type=checkbox] {
    padding: 5px;
}
</style>