<template>
  <div class="inputitem box" :class="{'newitem': false}">
    <div class="level">
      <div class="level-left">
        <input type="text" class="input" placeholder="Name" v-model="title">
      </div>
      <div class="level-item">
        <input type="text" class="input" placeholder="Description" v-model="description">
      </div>
      <span class="icon is-medium level-right">
        <i class="fa fa-lg fa-trash"></i>
      </span>
      <!-- <div class="level-right">
        <button class="delete is-medium"></button>
      </div> -->
    </div>
  </div>
</template>

<script>

export default {
  name: 'inputItem',
  data () {
    return {
      title: '',
      description: ''
    }
  },
  props: {
    newItem: {
      type: Boolean,
      default: false
    }
  }
  //TODO: fire an event when this item is typed in so the parent component
  //      can set this as a normal item
}
</script>

<style>
  .newitem {
    opacity: 0.6;
  }
</style>
