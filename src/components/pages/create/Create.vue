<template>
  <div id="create" class="section">
    <div class="columns container is-fluid is-centered">
      <div class="column is-half">
        <!-- <input-list></input-list> -->
        <input-paragraph></input-paragraph>
      </div>
    </div>
  </div>
</template>

<script>
// import InputList from '../lists/InputList.vue'
import InputParagraph from './InputParagraph.vue'

export default {
  name: 'Create',
  data() {
    return {}
  },
  components: {
    // inputList: InputList,
    inputParagraph: InputParagraph
  }
}
</script>

<style>

</style>
