<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App"
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  padding-top: 60px;
  height: 1200px;
  background: linear-gradient(#4ca1af, #c4e0e5);
  /* background: linear-gradient(#3a1c71, #d76d77, #ffaf7b); */
}
</style>
