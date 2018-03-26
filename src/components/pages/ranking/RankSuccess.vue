<template>
	<div>
		<section class="hero is-large is-white">
			<div class="hero-body">
				<div class="container has-text-centered">
					<h1 class="subtitle is-3">
						You have successfully powerranked <strong>{{this.$store.getters.rankList.title}}</strong>.
					</h1>
					<p class="field">
						<router-link :to="rankPath" class="button is-info is-large" tag="a">
							<span class="icon is-small"><i class="fas fa-list"></i></span>
							<span>View Ranking</span>
						</router-link>
					</p>
					<p class="field">
						<router-link :to="rankResultsPath" class="button is-info is-large" tag="a">
							<span class="icon is-small"><i class="fas fa-trophy"></i></span>
							<span>View Results</span>
						</router-link>
					</p>
				</div>
			</div>
		</section>
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