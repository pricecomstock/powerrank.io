<template>
	<div id="browse" class="section">
		<div class="container columns is-centered is-fluid is-multiline is-narrow">
			<div v-if="cardMode" class="column is-9-widescreen is-9-desktop is-9-tablet">
				<rank-list-card v-for="rankList in rankListsList" :key="rankList.id" :rankList="rankList"></rank-list-card>
			</div>
			<div v-else class="column is-9-widescreen is-12-desktop is-12-tablet">
				<rank-list-block v-for="rankList in rankListsList" :key="rankList.id" :rankList="rankList"></rank-list-block>
			</div>
		</div>
	</div>
</template>

<script>
	import axios from '../../../axios-powerrank'
	import moment from 'moment'
	import rankListCard from './RankListCard.vue'
	import rankListBlock from './RankListBlock.vue'

	export default {
		name: 'browse',
		data () {
			return {
				rankListsList: [],
				cardMode: true
			}
		},
		components: {
			rankListCard: rankListCard,
			rankListBlock: rankListBlock
		},
		created () {
			axios.get('/ranklists')
				.then(res => {
					console.log(res)
					const rankLists = res.data // it's an array of records
					this.rankListsList = rankLists.map( record => {
						return {
							id: record._id,
							title: record.title,
							date: moment(record.date).fromNow(),
							itemCount: record.itemCount,
							user: record.user,
							rankingCount: record.rankingCount,
							scaleName: record.scaleName
						}
					})
				})
				.catch(error => console.log(error))
		}
	}

</script>

<style>

</style>