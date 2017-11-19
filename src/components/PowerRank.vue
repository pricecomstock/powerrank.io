<template>
  <div class="fluid container">
    <p>Loaded ID: {{ id }}</p>
    <div class="columns">
      <!-- PowerRanking -->
      <div class="column is-one-fourth"></div>
      <draggable-list class="column is-one-fourth" :ranked="false" ></draggable-list>
      <draggable-list class="column is-one-fourth" :ranked="true" ></draggable-list>
      <div class="column is-one-fourth"></div>
    </div>
    
    
    <!-- Debug -->
    <hr>
    <div class="row">
      <button @click="debug=!debug" class="button is-warning" :class="{'btn-warning':debug, 'btn-default':!debug}">Debug Mode</button>
      <debug-panel v-if="debug"></debug-panel>  
    </div>

  </div>
</template>

<script>
  import draggable from 'vuedraggable';
  import draggableList from './rank/DraggableList.vue';
  import debugPanel from './Debug.vue';

  export default {
    name: 'powerRank',
    components: {
      draggable,
      'draggable-list': draggableList,
      debugPanel
    },
    props: {
      id: {
        type: String,
        default: 'a'
      }
    },
    data () {
      return {
        debug: false,
        presets: this.$store.getters.presets
      };
    },
    methods: {
      loadPowerRank (id) {
        // this.$store.dispatch('loadFromAirtable', id);
        // this.$store.dispatch('loadFromPresets', id);
        this.$store.dispatch('loadFromAirtable', id);
      }
    },
    watch: {
      '$route'() {
        this.loadPowerRank(this.id)
      }
    },
    created() {
      this.loadPowerRank(this.id);
    }
  };
</script>

<style>
</style>