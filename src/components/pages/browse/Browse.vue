<template>
	<div id="browse" class="section">
		<div class="container columns is-centered is-fluid is-multiline is-narrow">
			<div class="column is-9-widescreen is-12-desktop is-12-tablet">
				<!-- <div class="hero-body has-text-centered">
					<h1 class="title">
						Hero title
					</h1>
					<h2 class="subtitle">
						Hero subtitle
					</h2>
				</div> -->
				<div class="box powerranklinklist">
					<div class="powerranklink" :key="index" v-for="(rankList, index) in rankListsList">
						<rank-list-block :rankList="rankList"></rank-list-block>
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
				rankListsList: []
			}
		},
		props: {
			when: {
				type: String,
				default: 'month'
			},
			sort: {
				type: String,
				default: 'recent'
			}
		},
		components: {
			rankListCard: rankListCard,
			rankListBlock: rankListBlock
		},
		methods: {
			loadPowerRanks () {
				axios.get(`/ranklists/${this.when}/${this.sort}`)
				.then(res => {
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
		},
		watch: {
			'$route' (to, from) {
				this.loadPowerRanks();
			}
		},
		created () {
			this.loadPowerRanks();
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