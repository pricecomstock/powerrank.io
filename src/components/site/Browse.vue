<template>
	<div id="browse" class="columns">
		<div class="column is-one-third"></div>
		<div class="column is-one-third">
			<!-- <ul class="list-group"> -->
			<router-link class="box has-text-centered" v-for="(id, name) in presetsById" :to="'/rank/' + id" key="id">
				<a>{{ name }}</a>
			</router-link>
			<!-- </ul> -->
		</div>
	</div>
</template>

<script>
	export default {
		name: 'input',
		data() {
			return {}
		},
		computed: {
			presetsById() {
				return this.$store.getters.presets;
			}
		}
	}

</script>

<style>

</style>