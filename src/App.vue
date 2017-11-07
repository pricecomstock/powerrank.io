<template>
  <div id="app">
    <nav-bar></nav-bar>
    <router-view></router-view>
    <!-- <power-rank></power-rank> -->
  </div>
</template>

<script>
import PowerRank from './components/PowerRank.vue';
import NavBar from './components/site/Nav.vue';

export default {
  name: 'app',
  data () {
    return {
      
    };
  },
  components: {
    PowerRank,
    NavBar
  }
};
</script>

<style>

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 20px;
}

#app .logo{
  text-align: center;
}
</style>