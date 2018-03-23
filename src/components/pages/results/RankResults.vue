<template>
	<div class="section">
		<div class="container columns is-fluid">
			<div class="column is-one-third is-size-4">
				<rank-list-stats v-if="rankList" :rankList="rankList"></rank-list-stats>
			</div>
			<div class="column is-one-third">
				<non-draggable-list v-if="pointOrderedRankItems" :list-contents="pointOrderedRankItems" :list-details="pointValues"></non-draggable-list>
			</div>
		</div>
		<div class="section">
			<div class="container columns is-centered">
				<recent-rankings :rank-list-id="id" :sorted-rank-list="sortedPointTotals"></recent-rankings>
			</div>
		</div>
	</div>
</template>

<script>
	import axios from '../../../axios-powerrank'
	import rankListStats from '../pieces/RankListStats.vue'
	import nonDraggableList from '../../lists/NonDraggableList.vue'
	import recentRankings from './RecentRankings.vue'

	export default {
		name: 'rankResults',
		components: {
			nonDraggableList,
			recentRankings,
			rankListStats
		},
		props: {
			id: {
				type: String,
				required: true
			}
		},
		methods: {
		},
		data() {
			return {
				rankList: {},
				sortedPointTotals: []
			};
		},
		computed: {
			pointOrderedRankItems() {
				return this.sortedPointTotals.map( (item) => {
					return item[0];
				})
			},
			pointValues() {
				return this.sortedPointTotals.map( (item) => {
					return `${item[1].toFixed(2)} pt`;
				})
			}
		},
		created() {
			axios.get(`/rankresults/${this.id}`)
				.then(res => {
					console.log(res);
					this.rankList = res.data;
					let dowdall = this.rankList.aggregations.find((agg => {
						return agg.type === 'dowdall';
					}));        
					this.sortedPointTotals = dowdall.sortedPointTotals;
				})
				.catch(error => console.log(error))
		}
	};
</script>

<style>
.table {
	margin-left: auto;
	margin-right: auto;
}
</style>