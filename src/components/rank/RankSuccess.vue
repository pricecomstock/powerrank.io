<template>
	<div id="creationsuccess" class="container has-text-centered">
		<p class="is-size-4">You successfully PowerRanked that list! Share it with the link below!</p>
		<p class="is-size-6">{{ link }}</p>

		<router-link :to="rankPath" class="button is-success is-large">View</router-link>
	</div>
</template>

<script>	
	export default {
		name: 'RankSuccess',
		components: {
		},
		props: {
			id: {
				type: String,
				required: true
			}
		},
		data() {
			return {
				rankPath: ''
			};
		},
		computed: {
			rankedId() {
				return this.$store.getters.createdRankId;
			},
			link() {
				const routeBase = window.location.href.substr(0, window.location.href.indexOf('/rank'))
				return routeBase + this.rankPath
			}
		},
		created() {
			this.rankPath = '/ranking/' + this.rankedId
		}
	};
</script>

<style>
</style>