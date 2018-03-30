<template>
	<div id="browse" class="section">
		<div class="container columns is-centered is-fluid is-multiline is-narrow">
			<div class="column is-one-third-widescreen is-half-desktop is-half-tablet">
				<rank-list-card v-for="rankList in rankListsList" :key="rankList.id" :rankList="rankList"></rank-list-card>
				<!-- <router-link class="box hero is-white is-small ranklink" :to="'/rank/' + rankList.id" v-for="rankList in rankListsList" :key="rankList.id">
					<div class="hero-head">
						<div class="level has-text-grey has-text-weight-light is-mobile">
							<div class="level-left">
								<div class="level-item">
									<small>@{{rankList.user || "anonymous"}}</small>
								</div>
							</div>
							<div class="level-right">
								<div class="level-item">
									<small>{{rankList.date}}</small>
								</div>
							</div>
						</div>
					</div>
					<div class="hero-body">
						<h1 class="title is-3 has-text-centered">
							{{ rankList.title }}
						</h1>
					</div>
					<div class="hero-foot">
						<div class="level is-mobile has-text-grey">
							<div class="level-item has-text-centered">
								<div>
									<p class="heading">Item Count</p>
									<p class="is-size-5 stat">{{rankList.itemCount}}</p>
								</div>
							</div>
							<div class="level-item has-text-centered">
								<div>
									<p class="heading">In Order Of</p>
									<p class="is-size-5 stat">{{rankList.scaleName}}</p>
								</div>
							</div>
							<div class="level-item has-text-centered">
								<div>
									<p class="heading">Rankings</p>
									<p class="is-size-5 stat">{{rankList.rankingCount}}</p>
								</div>
							</div>
						</div>
					</div>
				</router-link> -->
			</div>
		</div>
	</div>
</template>

<script>
	import axios from '../../../axios-powerrank'
	import moment from 'moment'
	import rankListCard from './RankListCard.vue'

	export default {
		name: 'browse',
		data () {
			return {
				rankListsList: []
			}
		},
		components: {
			rankListCard: rankListCard
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
.stat {
	max-width: 250px;
	color: grey;
	font-weight: bold;
}
</style>