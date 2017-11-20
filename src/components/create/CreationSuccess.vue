<template>
		<div id="creationsuccess" class="container has-text-centered">
			<p class="is-size-4">Your PowerRanking was successfully created!</p>
			<p class="is-size-6">{{ link }}</p>
			
			<router-link :to="rankPath" class="button is-success is-large">View</router-link>
		</div>
	</template>
	
	<script>
		import axios from '../../axios-airtable'
	
		export default {
			name: 'CreationSuccess',
			data () {
				return {
					rankPath: ''
				};
			},
			computed: {
				id () {
					return this.$store.getters.createdId;
				},
				link () {
					const routeBase = window.location.href.substr(0, window.location.href.indexOf('/create/success'))
					return routeBase + this.rankPath
				}
			},
			created() {
				this.rankPath = '/rank/' + this.id;
			}
		}
	
	</script>
	
	<style>
	
	</style>