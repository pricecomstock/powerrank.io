<template>
	<div class="container">
		<div class="columns">
			<div class="column is-one-third is-size-4">
				<p>
					<span class="icon">
						<i class="fa fa-user"></i>
					</span>
					{{ user }}
				</p>
				<p>
					<span class="icon">
						<i class="fa fa-th-list"></i>
					</span>
					<router-link :to="'/rank/' + rankListId">
						{{ rankListName }}
					</router-link>
				</p>
			</div>
			<div class="column is-one-third">
				<non-draggable-list :list-contents="rankingList"></non-draggable-list>
			</div>
		</div>
	</div>
</template>

<script>
	import axios from '../../axios-airtable'
	import nonDraggableList from './NonDraggableList.vue'

	export default {
		name: 'rankResults',
		components: {
			nonDraggableList
		},
		props: {
			rankListId: {
				type: String,
				required: true
			}
		},
		methods: {
		},
		data() {
			return {
				user: '',
				rankListName: '',
				rankListId: '',
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