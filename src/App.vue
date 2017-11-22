<template>
  <div id="app" class="container">
    <nav-bar></nav-bar>
    <router-view></router-view>
    <!-- <power-rank></power-rank> -->
  </div>
</template>

<script>
import NavBar from './components/site/Nav.vue';

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