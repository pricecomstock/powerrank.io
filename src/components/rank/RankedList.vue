<template>
  <div id="rankedlist">
    <!-- <draggable class="list-group" element="ul" v-model="inputList" :options="dragOptions" :move="onMove" @start="isDragging=true"
      @end="isDragging=false">
        <transition-group type="animation" name="flip-list"> -->
          <!-- <list-item 
          v-for="(element, index) in ['choco','vanilla','strawberry']"
          :key="element.order"
          @click="console.log(element) //list2.push(list.splice(index,1)[0])"
          name="test"></list-item> -->

          <!-- <list-item
            v-for="(element, index) in inputList"
            :itemname="element"
            :rank="index+1"
            :key="index"
            @click="console.log(element)">
          </list-item>
        </transition-group>
      </draggable> -->
    </div>
  </template>
  
  <script>
    import draggable from 'vuedraggable';
    import listItem from '../rank/ListItem.vue';

    export default {
      name: 'rankedList',
      components: {
        'list-item': listItem,
        draggable
      },
      props: {
        inputList: {
          type: Array,
          required: false
        }
      },
      computed: {
        listContents: {
          get () {
            return this.$store.state.rankedList;
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
  