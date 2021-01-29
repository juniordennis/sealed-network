import Vue from 'vue';
import VueRouter from 'vue-router'
import App from './App.vue';
import $ from "jquery";
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import ListEmployee from './ListEmployee.vue';
import CreateEmployee from './CreateEmployee.vue';

Vue.use(VueRouter);

const routes = [
  { path: '/create', component: CreateEmployee },
  { path: '/list', component: ListEmployee }
]

const router = new VueRouter({
	routes
});

new Vue({
    el: '#app',
	router: router,
    render: h => h(App),
});