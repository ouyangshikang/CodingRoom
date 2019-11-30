<template>
    <div class="singer">
        <list-view :data="singerList" @jmp="jmpDetail"></list-view>
        <router-view></router-view>
    </div>
</template>

<script>
import { getSingerList } from 'api/singer';
import { ERR_OK } from 'api/config';
import Singer from '@/js/singer';
import ListView from 'module/listview/listview';
import {mapMutations} from 'vuex';

const HOT_SINGER_LEN = 10;
export default{
    components: {
        ListView
    },
    data() {
        return {
            singerList: []
        };
    },
    created() {
        this._getSingerList();
    },
    methods: {
        jmpDetail(singer) {
        // console.log(singer)
            this.$router.push({
                path: `/singer/${singer.id}`
            });
            this.setSinger(singer);
        },
        _getSingerList() {
            getSingerList().then((res) => {
                if (res.code === ERR_OK) {
            // this.singerList = res.data.list
                    this.singerList = this._normalizeSiger(res.data.list);
                    console.log(this.singerList);
                }
            });
        },
      // 对请求到的数据进行规范化
        _normalizeSiger(list) {
            let map = {
                hot: {
                    title: '热门',
                    items: []
                }
            };
            list.forEach((item, index) => {
                if (index < HOT_SINGER_LEN) {
                    map.hot.items.push(new Singer({
                        id: item.Fsinger_mid,
                        name: item.Fsinger_name
                    }));
                }
                const key = item.Findex;
                if (!map[key]) {
                    map[key] = {
                        title: key,
                        items: []
                    };
                }
                map[key].items.push(new Singer({
                    id: item.Fsinger_mid,
                    name: item.Fsinger_name
                }));
            });
        // 将map对象处理成有序的数组的形式
            let hot = [];
            let ret = [];
            for (let key in map) {
                let val = map[key];
                if (val.title === '热门') {
                    hot.push(val);
                } else if (val.title.match(/[a-zA-Z]/)) {
                    ret.push(val);
                }
            }
            ret.sort((a, b) => {
                return a.title.charCodeAt(0) - b.title.charCodeAt(0);
            });
            return hot.concat(ret);
        },
        ...mapMutations({
            setSinger: 'SET_SINGER'
        })
    }
};
</script>

<style lang="scss" scoped>
  .singer{
    position: fixed;
    top: 88px;
    bottom: 0px;
    width: 100%;
  }
</style>
