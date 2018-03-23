<template>
  <div id="app">
    <nav-bar></nav-bar>
    <router-view></router-view>
    <!-- <power-rank></power-rank> -->
  </div>
</template>

<script>
import NavBar from './components/pages/nav/Nav.vue';

export default {
  name: 'app',
  data () {
    return {
      
    };
  },
  components: {
    NavBar
  }
};
</script>

<style>

</style>