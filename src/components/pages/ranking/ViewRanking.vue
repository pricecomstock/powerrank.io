<template>
	<div class="section">
		<div class="container">
			<div class="columns">
				<div class="column is-one-third">
					<p class="is-size-3">
			            <span class="icon is-large">
			                <i class="fas fa-user"></i>
			            </span>
			            {{ user || 'anonymous' }}
			        </p>
					<hr>
					<rank-list-stats v-if="rankList" :rankList="rankList"></rank-list-stats>
				</div>
				<div class="column is-one-third">
					<non-draggable-list :list-contents="rankingList"></non-draggable-list>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import axios from '../../../axios-powerrank'
	import nonDraggableList from '../../lists/NonDraggableList.vue'
	import rankListStats from '../pieces/RankListStats.vue'

	export default {
		name: 'viewRanking',
		components: {
			nonDraggableList,
			rankListStats
		},
		props: {
			rankingId: {
				type: String,
				required: true
			}
		},
		methods: {
			loadRanking(id) {
				axios.get(`/ranking/${this.rankingId}`)
					.then(res => {
						console.log('Ranking Response', res)

						// set the data we can get from here
						this.rankListId = res.data.rankListId;
						const user = res.data.user;
						const rankingOrder = res.data.rankOrder;
						
						// load the RankList this ranking was made from
						axios.get(`/ranklist/${this.rankListId}`)
							.then(res => {
								console.log('RankList Response', res)

								this.rankList = res.data

								this.rankListName = this.rankList.title
								const originalOrder = this.rankList.rankItems

								// for each number in rankingOrder, replace with the correct item from original order
								this.rankingList = rankingOrder.map(index => {
									return originalOrder[index]
								})
								
								// assign user here so that everything loads in together
								this.user = user ? user : 'anonymous'

							})
							.catch(error => console.log(error))

					})
					.catch(error => console.log(error))
			}
		},
		data() {
			return {
				user: '',
				rankListId: '',
				rankList: {},
				rankingList: []
			};
		},
		created() {
			this.loadRanking(this.rankingId)
		}
	};
</script>

<style>
</style>