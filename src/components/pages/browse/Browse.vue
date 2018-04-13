<template>
	<div id="browse" class="section">
		<div class="container columns is-centered is-fluid is-multiline is-narrow">
			<div v-if="cardMode" class="column is-9-widescreen is-9-desktop is-9-tablet">
				<rank-list-card v-for="rankList in rankListsList" :key="rankList.id" :rankList="rankList"></rank-list-card>
			</div>
			<div v-else class="column is-9-widescreen is-12-desktop is-12-tablet">
				<div class="box powerranklinklist">
					<div class="powerranklink" :key="index" v-for="(rankList, index) in rankListsList">
						<rank-list-block :rankList="rankList"></rank-list-block>
						<!-- <hr :key="index"> -->
					</div>
				</div>
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
				cardMode: false
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
.powerranklink {
  /* margin: 1rem; */
  /* padding: 1rem 1rem; */
  /* padding-top: 1rem; */
  border-bottom: 1px solid #E6EAEE;
  overflow: hidden;
}
.powerranklink:last-child {
  padding-bottom: 0;
  border-bottom: none;
  border-radius: 0px 0px 5px 5px;
}
.powerranklink:first-child {
  border-radius: 5px 5px 0px 0px;
}

.powerranklinklist {
	padding: 0;
}
</style>