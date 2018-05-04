<template>
  <li class="box staging rankitem">
    <div class="level is-mobile">
      <div v-if="detail" class="level-left itemdetail">
        <span class="tag is-light is-small">{{ detail }}</span>
      </div>
      <div class="level-center itemname">
        {{ item }}
      </div>
      <div class="level-right">
        <span
        class="tag is-medium is-rounded itemrank"
        :class="rankColorClasses(rank)">
          {{ rank === -1 ? '?' : rank }}
        </span>
        <div v-if="isMobile" class="item-handle">
          <span class="icon">
            <i class="fas fa-lg fa-bars"></i>
          </span>
        </div>
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
    },
    isMobile: {
      type: Boolean,
      default: false
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
  overflow-wrap: break-word;
  overflow: hidden;
}

.level-center.itemname {
  overflow-wrap: break-word;
  overflow: hidden;
}

.itemrank {
  margin-left: 10px;
}

.item-handle {
  margin-left: 10px;
}

.itemdetail {
  padding-right: 10px;
}
</style>
