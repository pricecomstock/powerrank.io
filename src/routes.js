import PowerRank from './components/rank/PowerRank.vue'
import NavBar from './components/site/Nav.vue'
import Browse from './components/site/Browse.vue'
import Create from './components/pages/create/Create.vue'
import CreationSuccess from './components/pages/create/CreationSuccess.vue'
import RankSuccess from './components/rank/RankSuccess.vue'
import ViewRanking from './components/site/ViewRanking.vue'
import RankResults from './components/site/RankResults.vue'

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