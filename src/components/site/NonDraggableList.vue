<template>
  <div class="rankinglist">
    <ul class="list-group">
      <list-item
        v-for="(element, index) in listContents"
        class="static-list-group-item is-unselectable"
        :key="index"
        :item="element"
        :rank="ranked ? index + 1 : -1 ">
      </list-item>
		</ul>
  </div>
</template>

<script>
	import listItem from '../rank/ListItem.vue';

  export default {
    name: 'staticList',
    components: {
      listItem,
    },
    props: {
      listContents: {
        type: Array,
        required: true
			},
			ranked: {
				type: Boolean,
				default: true
			}
    },
    data () {
      return {};
		}
  };
</script>

<style>
</style>
