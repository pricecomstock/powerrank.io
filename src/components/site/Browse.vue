<template>
	<div id="browse" class="container">
		<div class="columns">
			<div class="column is-one-third"></div>
			<div class="column is-one-third">
				<!-- <ul class="list-group"> -->
				<router-link class="box has-text-centered" v-for="rankList in rankListsList" :to="'/rank/' + rankList.id" :key="rankList.id">
					{{ rankList.title }}
				</router-link>
				<!-- </ul> -->
			</div>
		</div>
	</div>
</template>

<script>
	import axios from '../../axios-powerrank'

	export default {
		name: 'browse',
		data () {
			return {
				rankListsList: []
			}
		},
		created () {
			axios.get('/ranklists')
				.then(res => {
					console.log(res)
					const rankLists = res.data // it's an array of records
					this.rankListsList = rankLists.map( record => {
						return {
							id: record._id,
							title: record.title
						}
					})
				})
				.catch(error => console.log(error))
		}
	}

</script>

<style>

</style>