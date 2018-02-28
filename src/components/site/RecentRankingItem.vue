<template>
  <li>
    
  </li>
</template>

<script>

export default {
  name: 'recentRankingItem',
  data () {
    return {};
  },
  props: {
    item: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: false
    },
    detail: {
      type: String,
      required: false
    },
    rank: {
      type: Number,
      required: true
    }
  }
}
</script>

<style scoped>
.rankitem {
  margin-top: 0px;
  margin-bottom: 0.75rem;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
}
</style>
