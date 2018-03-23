<template>
	<div class="is-size-4">
		<p>
            <span class="icon is-large">
                <i class="fas fa-list-ul"></i>
            </span>
            <router-link :to="'/rank/' + rankList._id">
                {{ rankList.title }}
            </router-link>
        </p>
        <p>
            <span class="icon is-large">
                <i class="fas fa-sort-amount-down"></i>
            </span>
            {{ rankList.scaleName }}
        </p>
        <p>
            <span class="icon is-large">
                <i class="fas fa-user-plus"></i>
            </span>
            {{ rankList.user || 'anonymous' }}
        </p>
        <p>
            <span class="icon is-large">
                <i v-if="rankList.public" class="fas fa-eye"></i>
                <i v-else class="fas fa-eye-slash"></i>
            </span>
            {{ rankList.public ? 'Public' : 'Unlisted' }}
        </p>
        <p>
            <span class="icon is-large">
                <i class="fas fa-chart-line"></i>
            </span>
            {{ rankList.rankingCount }} rankings
        </p>
	</div>
</template>

<script>

	export default {
		name: 'rankResults',
		props: {
			rankList: {
                required: true
            }
		},
		data() {
            return {

            }
		}
	};
</script>

<style>
</style>