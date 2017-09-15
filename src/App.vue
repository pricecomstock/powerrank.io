<template>
  <div id="app">
    <div class="jumbotron logo">
       <h1>powerrank.io v{{version}}</h1>
    </div>  
    <hello></hello>
  </div>
</template>

<script>
import Hello from './components/Hello.vue';

export default {
  name: 'app',
  data () {
    return {
      version: '0.0.2'
    };
  },
  components: {
    Hello
  }
};
</script>

<style>

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
}

#app .logo{
  text-align: center;
}
</style>
