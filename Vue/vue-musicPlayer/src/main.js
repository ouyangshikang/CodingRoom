// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'babel-polyfill';
import Vue from 'vue';
import App from './App';
import router from './router';
import fastclick from 'fastclick';
import VueLazyload from 'vue-lazyload';
import store from './store';
Vue.use(VueLazyload, {
    loading: require('./assets/image/default.png')
});
Vue.config.productionTip = false;
import '@/scss/index.scss';

fastclick.attach(document.body);  // 300ms延迟解决

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    template: '<App/>',
    components: { App }
});
