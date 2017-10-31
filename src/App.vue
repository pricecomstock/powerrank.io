<template>
  <div id="app">
    <div class="jumbotron logo">
       <h1>powerrank.io v{{version}}</h1>
    </div>  
    <power-rank></power-rank>
  </div>
</template>

<script>
import PowerRank from './components/PowerRank.vue';

export default {
  name: 'app',
  data () {
    return {
      version: '0.0.3'
    };
  },
  components: {
    PowerRank
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
