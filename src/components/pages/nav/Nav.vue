<template>
  <nav class="navbar is-info" role="navigation" aria-label="main navigation">
		<div class="navbar-brand">
			<router-link class="navbar-item powerranklogo" to="/" disabled>
				<span class="icon is-medium">
            		<i class="fas fa-lg fa-trophy"></i>
          		</span>
		  		powerrank.io
			</router-link>
			<div class="navbar-burger" :class="{'is-active':showNav}" @click="showNav = !showNav" data-target="navMenu">
				<span></span>
				<span></span>
				<span></span>
			</div>
		</div>
		<div class="navbar-menu" :class="{'is-active':showNav}" id="navMenu">
			<div class="navbar-start">
				<router-link class="navbar-item" to="/browse" exact-active-class="is-active">Recent</router-link>
				
				<div
					class="navbar-item has-dropdown is-hoverable"
					@mouseover="showTopDropdown = true"
					@mouseout="showTopDropdown = false">
					<router-link
						class="navbar-link"
						to="/browse/month/top"
						:class="{'is-active': inTop }">Top</router-link>
					<div class="navbar-dropdown">
						<router-link class="navbar-item" to="/browse/today/top">Today</router-link>
						<router-link class="navbar-item" to="/browse/week/top">This Week</router-link>
						<router-link class="navbar-item" to="/browse/month/top">This Month</router-link>
						<router-link class="navbar-item" to="/browse/all/top">All Time</router-link>
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
			showNav: false
		};
	},
	computed: {
		inTop () {
			return this.$route.path.includes('/top')
		}
	},
	methods: {
		toggleHamburgerMenu() {
			this.showNav = !this.showNav
		}
	}
};
</script>

<style>
.powerranklogo {
	font-style: italic;
	text-transform: uppercase;
}

.powerranklogo .icon {
	margin-right: .5rem;
}
</style>