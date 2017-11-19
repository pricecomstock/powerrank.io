<template>
  <div id="create" class="container">
    <div class="columns">
      <div class="column is-one-quarter"></div>
      <div class="column is-half">
        <input-item v-for="(item, index) in creatingList" key="index" :name="item"></input-item>
        <input-item :new-item="creatingList.length > 0"></input-item>
      </div>
    </div>
  </div>
</template>

<script>
import InputItem from './InputItem.vue'

export default {
  name: 'Create',
  data() {
    return {}
  },
  components: {
    inputItem: InputItem
  },
  computed: {
    creatingList () {
      return this.$store.getters.creatingList;
    }
  },
  methods: {
    set () {
      this.$store.commit('setRankedList', value);
    }
  }
}
</script>

<style>

</style>
