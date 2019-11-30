<template>
  <div class="recommend">
    <scroll ref="scroll" class="recommend-content" :data="list">
      <div>
        <div v-if="recommends.length" class="slider-wrapper">
          <slider>
            <div v-for="item in recommends" :key="item.id">
              <a :href="item.linkUrl">
                <img class="needsclick" :src="item.picUrl" @load="loadImage">
              </a>
            </div>
          </slider>
        </div>
        <div class="recommend-list">
          <h1 class="list-title">热门歌单推荐</h1>
          <ul>
            <li v-for="item in list" class="item" :key="item.id">
              <div class="icon">
                <img v-lazy="item.imgurl" width="60" height="60">
              </div>
              <div class="text">
                <h2 class="name" v-html="item.creator.name"></h2>
                <p class="desc" v-html="item.dissname"></p>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div class="loading-container" v-show="!list.length">
        <loading></loading>
      </div>
    </scroll>
  </div>
</template>

<script>
  import Slider from 'module/slider/slider';
  import Scroll from 'module/scroll/scroll';
  import Loading from 'module/loading/loading';
  import { getRecommend, getPlayList } from 'api/recommend';
  import { ERR_OK } from 'api/config';
  export default{
      components: {
          Slider, Scroll, Loading
      },
      data() {
          return {
              recommends: [],
              list: []
          };
      },
      created() {
          this._getRecommend();
          setTimeout(() => {
              this._getPlayList();
          }, 1000);
      },
      methods: {
          _getRecommend() {
              getRecommend().then((res) => {
                  if (res.code === ERR_OK) {
                      this.recommends = res.data.slider;
                  }
              });
          },
          _getPlayList() {
              getPlayList().then((res) => {
                  if (res.code === ERR_OK) {
//            console.log(res.data.list)
                      this.list = res.data.list;
                  }
              });
          },
          loadImage() {
              if (!this.checkLoaded) {
                  this.$refs.scroll.refresh();
                  this.checkLoaded = true;
              }
          }
      }
  };
</script>

<style lang="scss" scoped>
@import "~@/scss/variable";

.recommend{
    position: fixed;
    width: 100%;
    top: 88px;
    bottom: 0;
    .recommend-content{
        height: 100%;
        overflow: hidden;
        .slider-wrapper{
            position: relative;
            width: 100%;
            overflow: hidden;
            box-shadow: -1px -2px 8px #bdbdbd;
        }
        .recommend-list{
            .list-title{
                height: 45px;
                line-height: 45px;
                text-align: center;
                font-size: $font-size-medium;
                color: #000;
                background: #fff;
                box-shadow: -1px -1px 15px #bdbdbd;
            }
            ul {
                padding: 20px 0;
                .item{
                    display: flex;
                    box-sizing: border-box;
                    align-items: center;
                    padding: 0 20px 20px 20px;
                    .icon{
                        flex: 0 0 60px;
                        width: 60px;
                        padding-right: 20px;
                    }
                    .text{
                        display: flex;
                        flex-direction: column;
                        justify-content: center;
                        flex: 1;
                        line-height: 20px;
                        overflow: hidden;
                        font-size: $font-size-medium;
                        .name{
                            margin-bottom: 10px;
                            color: $color-list-name;
                        }
                        .desc{
                            color: rgba(1, 28, 56, 0.53);
                        }
                    }
                }
            }
        }
        .loading-container{
            position: absolute;
            width: 100%;
            top: 50%;
            transform: translateY(-50%);
        }
    }
}
</style>
