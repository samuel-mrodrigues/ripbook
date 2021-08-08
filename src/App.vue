<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {};
</script>

<style>
@font-face {
  font-family: "FonteLogo";
  src: url("./assets/Lobster/Lobster-Regular.ttf");
}
@font-face {
  font-family: "FontePadrao1";
  src: url("./assets/Georama/Georama-VariableFont_wdth,wght.ttf");
}

html {
  height: 1200px;
}
body {
  margin: 0;
  padding: 0;
  height: 100%;
}

footer {
  text-align: center;
  color: black;
  width: 100%;
}
#app {
  height: 100%;
  background-image: url("./assets/fundoInicio.jpg");
  padding: 10px;
}
@media only screen and (max-width: 600px) {
  #app {
    width: 100vmax;
    height: 1500px;
    background-image: url("./assets/fundoInicio.jpg");
    padding: 10px;
  }
}
</style>
