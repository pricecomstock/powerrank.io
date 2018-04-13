<template>
  <nav class="navbar is-info" role="navigation" aria-label="main navigation">
		<div class="navbar-brand">
			<router-link class="navbar-item" to="/" disabled>powerrank.io v.0.0.12</router-link>
			<div class="navbar-burger" :class="{'is-active':showNav}" @click="showNav = !showNav" data-target="navMenu">
				<span></span>
				<span></span>
				<span></span>
			</div>
		</div>
		<div class="navbar-menu" :class="{'is-active':showNav}" id="navMenu">
			<div class="navbar-start">
				<router-link class="navbar-item" to="/browse">Recent</router-link>
				
				<div
					class="navbar-item has-dropdown"
					@mouseover="showTopDropdown = true"
					@mouseout="showTopDropdown = false"
					:class="{'is-active': showTopDropdown}">
					<router-link class="navbar-link" to="/browse">Top</router-link>
					<div class="navbar-dropdown">
						<router-link class="navbar-item" to="/browse/all/top">All Time</router-link>
						<router-link class="navbar-item" to="/browse/week/top">This Week</router-link>
						<router-link class="navbar-item" to="/browse/today/top">Today</router-link>
					</div>
				</div>

			</div>
			<div class="navbar-end">
				<div class="navbar-item" v-if="!showNav">
					<div class="field">
						<p class="control">
							<router-link class="button is-white" to="/create" tag="a">
								Create
								<!-- <span class="icon">
									<i class="fas fa-download"></i>
								</span> -->
							</router-link>
						</p>
					</div>
				</div>
				<router-link v-else class="navbar-item" to="/create">Create</router-link>
			</div>
		</div>
	</nav>
</template>

<script>
export default {
  name: 'NavBar',
  data () {
		return {
			showNav: false,
			showTopDropdown: false
		};
	},
  methods: {
	  toggleHamburgerMenu() {
		  this.showNav = !this.showNav
	  }
  }
};
</script>

<style>
</style>