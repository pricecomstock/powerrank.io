<template>
	<div class="container">
		<div class="columns">
			<div class="column is-one-third is-size-4">
				<p>
					<span class="icon">
						<i class="fa fa-th-list"></i>
					</span>
					<router-link :to="'/rank/' + id">
						{{ title }}
					</router-link>
				</p>
				<p>
					<span class="icon">
						<i class="fa fa-user"></i>
					</span>
					Created by {{ user }}
				</p>
			</div>
			<div class="column is-one-third">
				<non-draggable-list :list-contents="rankItems" :list-details="pointValues"></non-draggable-list>
			</div>
		</div>
		<div class="container">
			<recent-rankings :rank-list-id="id" :sorted-rank-list="sortedPointTotals"></recent-rankings>
		</div>
	</div>
</template>

<script>
	import axios from '../../axios-powerrank'
	import nonDraggableList from './NonDraggableList.vue'
	import recentRankings from './RecentRankings.vue'

	export default {
		name: 'rankResults',
		components: {
			nonDraggableList,
			recentRankings
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
				user: '',
				title: '',
				sortedPointTotals: []
			};
		},
		computed: {
			rankItems() {
				return this.sortedPointTotals.map( (item) => {
					return item[0];
				})
			},
			pointValues() {
				return this.sortedPointTotals.map( (item) => {
					return `${item[1].toFixed(1)} pt`;
				})
			}
		},
		created() {
			axios.get(`/rankresults/${this.id}`)
				.then(res => {
					console.log(res);
					const rankList = res.data;
					
					this.user = rankList.user || 'anonymous';
					this.title = rankList.title;

					// This will need to be expanded if more algorithms are added
					let dowdall = rankList.aggregations.find((agg => {
						return agg.type === 'dowdall';
					}));        
					this.sortedPointTotals = dowdall.sortedPointTotals;
				})
				.catch(error => console.log(error))
		}
	};
</script>

<style>
</style>