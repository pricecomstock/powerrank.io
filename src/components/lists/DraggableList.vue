<template>
  <div class="rankinglist">
    <div id="mobilecanary"></div>
    <draggable
      class="list-group "
      :class="{'drag-here': listContents.length===0}"
      element="ul"
      v-model="listContents"
      :options="dragOptions"
      @start="isDragging=true"
      @end="isDragging=false">
      <!-- <transition-group type="animation" name="flip-list" class="alwaysdisplay"> -->
      <list-item
        v-for="(element, index) in listContents"
        class="list-group-item is-unselectable"
        id="listItem"
        :is-mobile="isMobile"
        @click.native="sendToOtherList(index)"
        :key="index"
        :item="element"
        :rank="ranked ? index + 1 : -1 ">
      </list-item>
      <!-- <section class="hero" v-if="listContents.length===0">
        <div class="hero-body">
          <div class="container">
            <h1 class="title">Drag Here</h1>
          </div>
        </div>
      </section> -->
      <!-- </transition-group> -->
    </draggable>
  </div>
</template>

<script>
  import draggable from 'vuedraggable';
  import listItem from './listItems/ListItem.vue';

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
      },
      sendToOtherList (index) {
        if (!this.ranked) {
          this.$store.dispatch('moveFromUnrankedToRanked', index);
        } else {
          this.$store.dispatch('moveFromRankedToUnranked', index);
        }
      },
      calculateIsMobile () { // Is this a CPU hog?
        return getComputedStyle(document.getElementById('mobilecanary'), null).display === "none"
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
          ghostClass: 'ghost',
          handle: this.isMobile? ".item-handle" : null
        };
      },
      minListHeight () {
        const cardHeight = 50;
        const clearance = 50;
        const minHeight = 200;

        const algorithmicHeight = this.listContents.length * cardHeight + clearance
        return algorithmicHeight > minHeight ? algorithmicHeight : minHeight;
      }
    },
    data () {
      return {
        editable: true,
        isDragging: false,
        delayedDragging: false,
        isMobile: false
      };
    },
    mounted () {
      this.isMobile = this.calculateIsMobile(); // this is needed for drag handles
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
  
  .list-group {
    padding-bottom: 25px;
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
    min-height: 150px;
    border-radius: 10px;
  }

  #mobilecanary {color: blue;}

@media only screen and (max-width: 760px) {
  #mobilecanary { display: none; }
}
</style>
