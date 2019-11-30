import Vue from 'vue';
import Router from 'vue-router';
import Recommend from '../pages/recommend';
import Rank from '../pages/rank';
import Singer from '../pages/singer';
import Search from '../pages/search';
import SingerDetail from '../pages/singer-detail';
Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            redirect: '/recommend'
        },
        {
            path: '/recommend',
            component: Recommend
        },
        {
            path: '/rank',
            component: Rank
        },
        {
            path: '/singer',
            component: Singer,
            children: [
                {
                    path: ':id',
                    component: SingerDetail
                }
            ]
        },
        {
            path: '/search',
            component: Search
        }
    ]
});
