<template>
	<div id="browse" class="section">
		<div class="container columns is-centered is-fluid">
			<div class="column is-one-third">
				<!-- <router-link class="box has-text-centered" v-for="rankList in rankListsList" :to="'/rank/' + rankList.id" :key="rankList.id">
					{{ rankList.title }}
				</router-link> -->
				<router-link class="box hero is-white is-small" v-for="rankList in rankListsList" :to="'/rank/' + rankList.id" :key="rankList.id">
					<div class="hero-head">
						<div class="level has-text-grey has-text-weight-light">
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
									<p class="heading">Rankings</p>
									<p class="is-size-5 stat">{{rankList.rankingCount}}</p>
								</div>
							</div>
							<div class="level-item has-text-centered">
								<div>
									<p class="heading">In Order Of</p>
									<p class="is-size-5 stat">{{rankList.scaleName}}</p>
								</div>
							</div>
						</div>
					</div>
				</router-link>
			</div>
		</div>
	</div>
</template>

<script>
	import axios from '../../../axios-powerrank'
	import moment from 'moment'

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
	max-width: 120px;
	color: grey;
	font-weight: bold;
}
</style>