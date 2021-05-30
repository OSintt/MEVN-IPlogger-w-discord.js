import Vue from 'vue';
import App from './components/App.vue';
import VueRouter from 'vue-router';
import VueMeta from 'vue-meta'

Vue.use(VueRouter);

Vue.use(VueMeta, {
  refreshOnceOnNavigation: true
});

const router = new VueRouter({
	mode: 'history',
 	routes: [
    	{
	    	path: '/:id',
	    	component: App
    	},
    	{
    		path: '/',
    		component: App
    	}
	]
});

const app = new Vue({
	render: h => h(App),
	router
}).$mount('#app');


