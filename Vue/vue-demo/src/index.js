import Vue from 'vue';
import App from './app.vue';

import './assets/styles/global.scss';

import btui from 'bt-ui';
Vue.use(btui);


const root = document.createElement('div');
document.body.appendChild(root);

new Vue({
	render: (h) => h(App)
}).$mount(root);