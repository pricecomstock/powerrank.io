<template>
  <div class="rankinglist">
    <draggable
      class="list-group"
      :class="{'drag-here': listContents.length===0}"
      element="ul"
      v-model="listContents"
      :options="dragOptions"
      @start="isDragging=true"
      @end="isDragging=false">
      <!-- <transition-group type="animation" name="flip-list" class="alwaysdisplay"> -->
      <list-item
        v-for="(element, index) in listContents"
        class="list-group-item"
        :key="index"
        :item="element"
        :rank="ranked ? index + 1 : -1 ">
      </list-item>
      <!-- </transition-group> -->
    </draggable>
  </div>
</template>

<script>
  import draggable from 'vuedraggable';
  import listItem from '../rank/ListItem.vue';

  export default {
    name: 'draggableList',
    components: {
      listItem,
      draggable
    },
    props: {
      ranked: {
        type: Boolean,
        required: true
      }
    },
    methods: {
      onMove ({ relatedContext, draggedContext }) {
        const relatedElement = relatedContext.element;
        const draggedElement = draggedContext.element;
        return (!relatedElement || !relatedElement.fixed) && !draggedElement.fixed;
      }
    },
    watch: {
      isDragging (newValue) {
        if (newValue) {
          this.delayedDragging = true;
          return;
        }
        this.$nextTick(() => {
          this.delayedDragging = false;
        });
      }
    },
    computed: {
      listContents: {
        get () {
          if (this.ranked) {
            return this.$store.getters.rankedList;
          } else {
            return this.$store.getters.unrankedList;
          }
        },
        set (value) {
          if (this.ranked) {
            this.$store.dispatch('setRankedList', value);
          } else {
            this.$store.dispatch('setUnrankedList', value);
          }
        }
      },
      dragOptions () {
        return {
          animation: 0,
          group: 'description',
          disabled: !this.editable,
          ghostClass: 'ghost'
        };
      }
    },
    data () {
      return {
        editable: true,
        isDragging: false,
        delayedDragging: false
      };
    }
  };
</script>

<style>
  .flip-list-move {
    transition: transform 0.8s;
  }
 
  @keyframes flash-green {
    0% {}
    50% {
      background-color: lightgreen;
    }
    100% {}
  }

    
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

  .rankinglist {
    min-height: 100px;
  }
  
  .alwaysdisplay {
    min-height: 100px;
    display: block;
  }
  
  .drag-below {
    color: #DDD;
    text-align: center;
    width: 100%;
  }
  
  .drag-here {
    border: 4px dashed #DDD;
    min-height: 100px;
    border-radius: 10px;
  }
</style>
