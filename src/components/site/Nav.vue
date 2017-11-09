<template>
  <nav class="navbar navbar-default">
		<div class="container-fluid">
			<div class="navbar-header">
				<a class="navbar-brand" href="">powerrank.io v.0.0.4</a>
			</div>
			<ul class="nav navbar-nav">
				<!-- <li v-for="(preset, name) in presets" @click="usePreset(preset)">
					<router-link to="/powerrank">
						{{ name }}
					</router-link>
				</li> -->
				<router-link tag="li" v-for="(id, name) in presetsById" :to="'/rank/' + id" key="id">
					<a>{{ name }}</a>
				</router-link>
      </ul>
		</div>
	</nav>
</template>

<script>
export default {
  name: 'NavBar',
  data () {
		return {
			presetDropdownOpen: false
		};
	},
	computed: {
		presetsById () {
			return this.$store.getters.presets;
		}
	}
};
</script>

<style>
</style>