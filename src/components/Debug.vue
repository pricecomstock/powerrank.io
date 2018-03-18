<template>
  <div class="container">
    <div id="debug" class="columns">
      <div class="column is-half">
        <pre class="box">{{unrankedJSON}}</pre>
      </div>
      <div class="column is-half">
        <pre class="box">{{rankedJSON}}</pre>
      </div>
    </div>
    <p>Loaded Table ID: {{ id }}</p>
  </div>
</template>
  
  <script>
    export default {
      name: 'debug',
      computed: {
        rankedJSON: {
          get () {
            return this.$store.getters.rankedListJSON;
          }
        },
        unrankedJSON: {
          get () {
            return this.$store.getters.unrankedListJSON;
          }
        },
        id: {
          get () {
            return this.$store.getters.currentPowerRankId;
          }
        }
      },
      data () {
        return {};
      }
    };
  </script>
  
  <style>
  
  </style>
  