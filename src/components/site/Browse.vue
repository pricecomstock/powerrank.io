<template>
	<div id="browse" class="container">
		<div class="columns">
			<div class="column is-one-third"></div>
			<div class="column is-one-third">
				<!-- <ul class="list-group"> -->
				<router-link class="box has-text-centered" v-for="preset in presetsById" :to="'/rank/' + preset.id" key="preset.id">
					{{ preset.name }}
				</router-link>
				<!-- </ul> -->
			</div>
		</div>
	</div>
</template>

<script>
	import axios from '../../axios-airtable'

	export default {
		name: 'input',
		data () {
			return {
				presetsById: []
			}
		},
		created () {
			axios.get('/RankLists?fields%5B%5D=Name')
				.then(res => {
					console.log(res)
					const rankLists = res.data.records // it's an array of records
					this.presetsById = rankLists.map( record => {
						return {
							id: record.id,
							name: record.fields.Name
						}
					})
				})
				.catch(error => console.log(error))
		}
	}

</script>

<style>

</style>