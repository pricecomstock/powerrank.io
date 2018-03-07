<template>
  <tr>
    <th>{{ranking.user || "anon"}}</th>
    <td>{{niceDate}}</td>
    <td v-for="(item, index) in ranking.rankOrderItems" :key="index">{{item || "-"}}</td>
  </tr>
</template>

<script>

export default {
  name: 'recentRankingItem',
  data () {
    return {};
  },
  computed: {
    niceDate () {
      // const now = Date.now()
      const submittedTime = new Date(this.ranking.date);
      return `${submittedTime.toDateString()} ${submittedTime.getHours()}:${submittedTime.getMinutes()}`
      // const timeDifference = now - submittedTime
      // return timeDifference.getMinutes()
    }
  },
  props: {
    ranking: {
      type: Object,
      required: true
    }
  }
}
</script>

<style scoped>
</style>
