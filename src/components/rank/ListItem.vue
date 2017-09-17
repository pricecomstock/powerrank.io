<template>
  <li class="list-group-item staging">
      <span class="badge">{{ rank === -1 ? '?' : rank }}</span>
      {{ itemname }}
  </li>
</template>

<script>

export default {
  name: 'listItem',
  data () {
  },
  props: {
    itemname: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: false
    },
    rank: {
      type: Number,
      required: false,
      default: -1
    }
  }
};
</script>

<style>

</style>
