<template>
  <transition name="slide">
    <!--<div class="singer-detail">歌手详情</div>-->
    <music-list :title="title" :bgImage="bgImage" :songList="songList"></music-list>
  </transition>
</template>

<script>
  import {mapGetters} from 'vuex';
  import {getSingerDetail} from 'api/singer';
  import { ERR_OK } from 'api/config';
  import {createSong} from '@/js/song';
  import MusicList from '../music-list/index';
  export default{
      data() {
          return {
              songList: []
          };
      },
      components: {
          MusicList
      },
      computed: {
          ...mapGetters([
              'singer'
          ]),
          title() {
              return this.singer.name;
          },
          bgImage() {
              return this.singer.avatar;
          }
      },
      created() {
      // console.log(this.singer)
          this.__getSingerDetail();
      },
      methods: {
          __getSingerDetail() {
              if (!this.singer.id) {
                  this.$router.push('/singer');
                  return;
              }
              getSingerDetail(this.singer.id).then((res) => {
                  if (res.code === ERR_OK) {
                  // console.log(res.data.list)
                  // console.log(this._normalizeSiger(res.data.list))
                      this.songList = this._normalizeSiger(res.data.list);
                      console.log(this.songList);
                  }
              });
          },
          _normalizeSiger(list) {
              let ret = [];
              list.forEach((item) => {
                  let {musicData} = item;
                  if (musicData.songid && musicData.albumid) {
                      ret.push(createSong(musicData));
                  }
              });
              return ret;
          }
      }
  };
</script>

<style lang="scss" scoped>
@import "~@/scss/variable";
.singer-detail{
    position: fixed;
    z-index: 100;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: $color-background;
}
.slide-enter-active, .slide-leave-active{
    transition: all 0.3s;
}
.slide-enter, .slide-leave-to{
    transform: translate3d(100%, 0, 0);
}
</style>
