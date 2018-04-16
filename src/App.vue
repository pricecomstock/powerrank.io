<template>
  <div id="app">
    <nav-bar></nav-bar>
    <router-view></router-view>
    <power-rank-footer></power-rank-footer>
  </div>
</template>

<script>
import NavBar from './components/pages/nav/Nav.vue';
import PowerRankFooter from './components/pages/nav/Footer.vue';

export default {
  name: 'app',
  data () {
    return {
      
    };
  },
  components: {
    NavBar,
    PowerRankFooter
  }
};
</script>

<style>
</style>