<template>
	<div id="creationsuccess" class="container has-text-centered">
		<p class="is-size-4">You successfully PowerRanked that list! Share it with the link below!</p>
		<p class="is-size-6">{{ link }}</p>

		<router-link :to="rankPath" class="button is-success is-large">View</router-link>

		<p class="is-size-4">Or view the results!</p>
		<p class="is-size-6">{{ resultsLink }}</p>
		<router-link :to="rankResultsPath" class="button is-warning is-large">Results</router-link>
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
				rankPath: '',
				rankResultsPath: ''
			};
		},
		computed: {
			rankingId() {
				return this.$store.getters.createdRankId;
			},
			link() {
				const routeBase = window.location.href.substr(0, window.location.href.indexOf('/rank'))
				return routeBase + this.rankPath
			},
			resultsLink() {
				const routeBase = window.location.href.substr(0, window.location.href.indexOf('/rank'))
				return routeBase + this.rankResultsPath
			}
		},
		created() {
			this.rankPath = '/ranking/' + this.rankingId
			this.rankResultsPath = '/rankresults/' + this.id
		}
	};
</script>

<style>
</style>