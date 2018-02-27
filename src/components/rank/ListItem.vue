<template>
  <li class="box staging is-clipped rankitem">
    <div class="level">
      <div v-if="detail" class="level-left">
        <span class="tag is-light is-small">{{ detail }}</span>
      </div>
      <div :class="itemClass">
        {{ item }}
      </div>
      <div class="level-right">
        <span
        class="tag is-medium is-rounded"
        :class="rankColorClasses(rank)">
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
    rankColorClasses(rank) {
      return {
        'is-primary': rank != -1
      }
    }    
  },
  computed: {
    itemClass() {
      if (this.detail) {
        return {
          "level-left": false,
          "level-center": true
        }
      } else {
        return {
          "level-left": true,
          "level-center": false
        }
      }
    }
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
