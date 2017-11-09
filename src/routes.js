import PowerRank from './components/PowerRank.vue'
import NavBar from './components/site/Nav.vue'
import Browse from './components/site/Browse.vue'
import Create from './components/create/Create.vue'

export const routes = [
	{ path: '', component: null },
	{ path: '/create', component: Create },
	{ path: '/browse', component: Browse },
	{ path: '/rank/:id', component: PowerRank, props: true }
];