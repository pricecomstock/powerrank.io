<template>
  <nav class="navbar navbar-default">
		<div class="container-fluid">
			<div class="navbar-header">
				<router-link class="navbar-brand" to="/">powerrank.io v.0.0.4</router-link>
			</div>
			<ul class="nav navbar-nav">
				<router-link tag="li" to="/browse"><a>Browse</a></router-link>
				<router-link tag="li" to="/create"><a>Create</a></router-link>
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
	}
};
</script>

<style>
</style>