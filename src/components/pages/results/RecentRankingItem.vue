<template>
  <tr>
    <th>{{ranking.user || "anon"}}</th>
    <td>
      <router-link tag="a" :to="'/ranking/' + ranking.id">
        {{ranking.date}}
      </router-link>
    </td>
    <td v-for="(item, index) in ranking.rankOrderItems" :key="index">{{item || "-"}}</td>
  </tr>
</template>

<script>

export default {
  name: 'recentRankingItem',
  data () {
    return {};
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
