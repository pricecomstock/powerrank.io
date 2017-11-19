<template>
		<div id="input-list">
			<!-- <input-item v-for="(item, index) in creatingList" key="index" :name="item"></input-item>
			<input-item :new-item="creatingList.length > 0"></input-item> -->
		<div class="field">
			<label class="label">Powerrank Items</label>
			<div class="control">
				<textarea class="textarea" placeholder="Input one item per line"></textarea>
			</div>
		</div>
		<div class="field is-grouped is-grouped-right">
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
	</div>
</template>
	
	<script>
	import InputItem from './InputItem.vue'
	
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
	