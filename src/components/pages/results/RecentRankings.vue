<template>
	<table class="table is-hoverable">
		<thead>
			<th>User</th>
			<th>Time</th>
			<th v-for="n in minLength" :key="n">{{n}}</th>
		</thead>
		<tfoot></tfoot>
		<tbody>
			<recent-ranking-item 
				v-for="(ranking, index) in recentRankingRows"
				:ranking="ranking"
				:row="index"
				:key="index">
			</recent-ranking-item>
		</tbody>
	</table>
</template>

<script>
	import axios from '../../../axios-powerrank'
	import recentRankingItem from './RecentRankingItem.vue'
	import moment from 'moment'

	export default {
		name: 'recentRankings',
		components: {
			recentRankingItem
		},
		props: {
			rankListId: {
				type: String,
				required: true
			},
			sortedRankList: {
				type: Array,
				required: true
			}
		},
		data() {
			return {
				// default to stop error from happening before other one has loaded
				recentRankings: [{date: '', user: '', rankOrder: [0,1,2,3], _id: '0'}],
				originalOrder: [],
				itemsToDisplayPerRow: 10
			};
		},
		methods: {
			reorderArray (items, order) {
				let newOrder = Array(this.minLength).fill('-') // fill extra with -
				order.forEach( (oldIndex, newIndex) => {
					newOrder[newIndex] = items[oldIndex]
				} )
				return newOrder.slice(0, this.itemsToDisplayPerRow)
			}
		},
		computed: {
			minLength() {
				return Math.min(this.itemsToDisplayPerRow, this.originalOrder.length)
			},
			recentRankingRows () {
				return this.recentRankings.map( (recentRanking) => {
					return {
						id: recentRanking._id,
						rankOrderItems: this.reorderArray(this.originalOrder, recentRanking.rankOrder), // get array in ranked order
						date: moment(recentRanking.date).fromNow(),
						user: recentRanking.user
					}
				})
			}
		},
		created() {
			
			axios.get(`/recentrankings/${this.rankListId}`)
				.then(res => {
					this.recentRankings = res.data;
				})
				.catch(error => console.log(error))
			axios.get(`/ranklist/${this.rankListId}`)
				.then(res => {
					this.originalOrder = res.data.rankItems;
				})
				.catch(error => console.log(error))
		}
	};
</script>

<style>
table {
	display: block;
	overflow-x: auto;
	/* white-space: nowrap; */
}
</style>