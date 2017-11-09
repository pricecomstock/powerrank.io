<template>
	<div id="browse" class="row">
		<div class="col-md-4"></div>
		<div class="col-md-4">
			<ul class="list-group">
				<router-link class="list-group-item" tag="li" v-for="(id, name) in presetsById" :to="'/rank/' + id" key="id">
					<a>{{ name }}</a>
				</router-link>
			</ul>
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