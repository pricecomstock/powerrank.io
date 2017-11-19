<template>
  <li class="box staging is-clipped rankitem">
    <div class="level">
      <div class="level-left">
        {{ item }}
      </div>
      <div class="level-right">
        <span
        class="tag is-medium is-rounded"
        :class="{'is-primary':rank !== -1}">
          {{ rank === -1 ? '?' : rank }}
        </span>
      </div>
    </div>
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
      type: String,
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
