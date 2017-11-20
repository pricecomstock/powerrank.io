import PowerRank from './components/PowerRank.vue'
import NavBar from './components/site/Nav.vue'
import Browse from './components/site/Browse.vue'
import Create from './components/create/Create.vue'
import CreationSuccess from './components/create/CreationSuccess.vue'
import RankSuccess from './components/rank/RankSuccess.vue'

export const routes = [
	{ path: '', component: null },
	{ path: '/create', component: Create },
	{ path: '/create/success', component: CreationSuccess },
	{ path: '/browse', component: Browse },
	{ path: '/rank/:id', component: PowerRank, props: true },
	{ path: '/rank/:id/success', component: RankSuccess, props: true }
];