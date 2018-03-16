import PowerRank from './components/pages/rank/PowerRank.vue'
import NavBar from './components/pages/nav/Nav.vue'
import Browse from './components/pages/browse/Browse.vue'
import Create from './components/pages/create/Create.vue'
import CreationSuccess from './components/pages/create/CreationSuccess.vue'
import RankSuccess from './components/pages/ranking/RankSuccess.vue'
import ViewRanking from './components/pages/ranking/ViewRanking.vue'
import RankResults from './components/pages/results/RankResults.vue'

export const routes = [
	{ path: '', component: Browse },
	{ path: '/create', component: Create },
	{ path: '/create/success', component: CreationSuccess },
	{ path: '/browse', component: Browse },
	{ path: '/rank/:id', component: PowerRank, props: true },
	{ path: '/rank/:id/success', component: RankSuccess, props: true },
	{ path: '/ranking/:rankingId', component: ViewRanking, props: true },
	{ path: '/rankresults/:id', component: RankResults, props: true }
];