<template>
  <div class="rankinglist">
    <draggable
      class="list-group"
      element="ul"
      v-model="listContents"
      :options="dragOptions"
      :move="onMove"
      @start="isDragging=true"
      @end="isDragging=false">
       <transition-group type="animation" name="flip-list">
         <list-item
           v-for="(element, index) in listContents"
           :key="index"
           :item="element"
           :rank="ranked ? index + 1 : -1 "
           :description=element.description>
          </list-item>
       </transition-group>
     </draggable>
   </div>
</template>

<script>
  import draggable from 'vuedraggable';
  import listItem from '../rank/ListItem.vue';

  export default {
    name: 'unrankedList',
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
      newItems () {
        this.list = this.listArray.map((name, index) => { return { name, order: index + 1, fixed: false }; });
        this.list2 = [];
        this.$store.commit('setUnrankedList', this.list);
      },
      usePreset (newList) {
        this.listInput = newList.join('\n');
        this.newItems();
      }
    },
    computed: {
      listContents: {
        get () {
          if (this.ranked) {
            return this.$store.state.rankedList;
          } else {
            return this.$store.state.unrankedList;
          }
        },
        set (value) {
          if (this.ranked) {
            this.$store.commit('setRankedList', value);
          } else {
            this.$store.commit('setUnrankedList', value);
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
        editable: true
      };
    }
  };
</script>

<style>
  .rankinglist {
    min-height: 100px;
    background-color: gray;
  }
</style>
