<template>
  <li class="list-group-item staging">
      <span class="badge">{{ rank === -1 ? '?' : rank }}</span>
      {{ item.name }}
  </li>
</template>

<script>

export default {
  name: 'listItem',
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
  }
};
</script>

<style>

</style>
