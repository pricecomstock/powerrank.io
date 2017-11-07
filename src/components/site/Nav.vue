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
				<router-link tag="li" v-for="(preset, name) in presetsByName" :to="'/rank/' + name" key="name">
				<!-- <router-link tag="li" v-for="(preset, name) in presetsByName" @click="usePreset(preset)" :to="'/rank/' + name" key="name"> -->
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
		presetsByName () {
			return this.$store.getters.presetsByName;
		}
	},
	methods: {
		usePreset (newList) {
			this.$store.commit('setUnrankedList', newList);
			this.$store.commit('setRankedList', []);
		}
	},
	created () {
		this.usePreset(this.presetsByName.Starburst);
	}
};
</script>

<style>
</style>