<template>
<<<<<<< HEAD
  <div id="listitem">
  </div>
=======
  <li class="list-group-item staging">
      <span class="badge">{{ rank === -1 ? '?' : rank }}</span>
      {{ item.name }}
  </li>
>>>>>>> parent of 82ebaf5... Cleaned up commented code. Restored functionality
</template>

<script>

export default {
  name: 'listItem',
<<<<<<< HEAD
  data() {
=======
  data () {
    return {};
  },
  methods: {

  },
  props: {
    item: {
      type: Object,
      required: true
    },
    description: {
      type: String,
      required: false
    },
    rank: {
      type: Number,
      required: true
    }
>>>>>>> parent of 82ebaf5... Cleaned up commented code. Restored functionality
  }
}
</script>

<style>

</style>
