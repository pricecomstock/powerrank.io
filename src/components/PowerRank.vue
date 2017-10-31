<template>
  <div class="fluid container">
    
    <!-- Debug -->
    <div class="row">
      <button @click="debug=!debug" class="btn" :class="{'btn-warning':debug, 'btn-default':!debug}">Debug Mode</button>
      <debug-panel v-if="debug"></debug-panel>  
    </div>
    <hr>
    

    <!-- Presets -->
    <div class="row">
      <div class="btn-group" role="group" aria-label="presets">
        <button class="btn btn-default" v-for="(preset, name) in presets" @click="usePreset(preset)">{{ name }}</button>
      </div>
    </div>
    <hr>

    
    <!-- PowerRanking -->
    <div class="col-md-3"></div>
    <draggable-list class="col-md-3" :ranked="false" ></draggable-list>
    <draggable-list class="col-md-3" :ranked="true" ></draggable-list>

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
    data () {
      return {
        debug: false
      };
    },
    computed: {
      presets () {
        return this.$store.getters.presets;
      }
    },
    methods: {
      usePreset (newList) {
        this.$store.commit('setUnrankedList', newList);
      }
    },
    created () {
      this.usePreset(this.presets.Starburst);
    }
  };
</script>

<style>
  .flip-list-move {
    transition: transform 0.8s;
  }
  
  .flash-enter-active {
    animation: flash-green 0.5s;
  }
  
  .flash-leave {}
  
  .flash-leave-active {}
  
  .no-move {
    transition: transform 0s;
  }
  
  .ghost {
    opacity: .5;
    background: #C8EBFB;
  }
  
  .list-group-item {
    cursor: move;
  }
  
  .list-group-item i {
    cursor: pointer;
  }
  
  @keyframes flash-green {
    0% {}
    50% {
      background-color: lightgreen;
    }
    100% {}
  }

  .staging {
    cursor: pointer;
  }
</style>