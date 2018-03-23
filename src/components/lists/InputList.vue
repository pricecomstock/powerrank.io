<template>
  <div id="input-list">
    <input-item v-for="(item, index) in creatingList" :key="index" :name="item"></input-item>
    <input-item :new-item="creatingList.length > 0"></input-item>
    <div class="field is-grouped is-grouped-centered">
      <p class="control">
        <a class="button is-primary">
          Submit
        </a>
      </p>
      <p class="control">
        <a class="button is-light">
          Cancel
        </a>
      </p>
    </div>
    <!-- <div>
      <span class="icon is-medium level-right has-text-primary">
        <i class="fa fa-2x fa-plus-circle"></i>
      </span>
    </div> -->
  </div>
</template>

<script>
import InputItem from './listItems/InputItem.vue'

export default {
  name: 'InputList',
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
