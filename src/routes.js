import PowerRank from './components/PowerRank.vue'
import NavBar from './components/site/Nav.vue'

export const routes = [
	{ path: '', component: null },
	{ path: '/rank/:id', component: PowerRank, props: true }
];