<template>
  <div id="app">
    <about />
  </div>
</template>

<script>
import about from './views/about.vue'

export default {
  name: 'App',
  components: {
    about,
  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}

html,
body {
  margin: 0;
}
</style>
