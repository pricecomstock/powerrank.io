<template>
  <div class="fluid container">
    <p>Loaded ID: {{ id }}</p>
    <div class="row">
      <!-- PowerRanking -->
      <div class="col-md-3"></div>
      <draggable-list class="col-md-3" :ranked="false" ></draggable-list>
      <draggable-list class="col-md-3" :ranked="true" ></draggable-list>
    </div>
    
    
    <!-- Debug -->
    <hr>
    <div class="row">
      <button @click="debug=!debug" class="btn" :class="{'btn-warning':debug, 'btn-default':!debug}">Debug Mode</button>
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
        this.$store.dispatch('loadFromPresets', id);
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