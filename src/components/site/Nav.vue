<template>
  <nav class="navbar" role="navigation" aria-label="main navigation">
		<div class="navbar-brand">
			<router-link class="navbar-item" to="/">powerrank.io v.0.0.4</router-link>
		</div>
		<div class="navbar-menu">
			<div class="navbar-start">
				<router-link class="navbar-item" to="/browse">Browse</router-link>
				<router-link class="navbar-item" to="/create">Create</router-link>
			</div>
			<!-- <div class="navbar-end">
				<router-link to="/browse"><a>Browse</a></router-link>
				<router-link to="/create"><a>Create</a></router-link>
			</div> -->
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
	}
};
</script>

<style>
</style>