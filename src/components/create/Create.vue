<template>
  <div id="create" class="container">
    <div class="columns">
      <div class="column is-one-quarter"></div>
      <div class="column is-half">
        <!-- <input-list></input-list> -->
        <input-paragraph></input-paragraph>
      </div>
    </div>
  </div>
</template>

<script>
import InputList from './InputList.vue'
import InputParagraph from './InputParagraph.vue'

export default {
  name: 'Create',
  data() {
    return {}
  },
  components: {
    inputList: InputList,
    inputParagraph: InputParagraph
  }
}
</script>

<style>

</style>
