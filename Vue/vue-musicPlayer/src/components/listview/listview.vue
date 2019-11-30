<template>
  <scroll class="listview"
          :data="data"
          ref="listView"
          :listenScroll="listenScroll"
          @scroll="scroll"
          :probeType="probeType"
  >
    <ul>
      <li v-for="group in data" class="list-group" ref="listGroup">
        <h2 class="list-groop-title">{{group.title}}</h2>
        <ul>
          <li @click="jmpDetail(item)" v-for="item in group.items" class="list-group-item">
            <img v-lazy="item.avatar" class="avatar" >
            <span class="name">{{item.name}}</span>
          </li>
        </ul>
      </li>
    </ul>
    <div class="list-shortcut" @touchstart="onShortCutTouchStart" @touchmove.stop.prevent="onShortCutTouchMove">
      <ul>
        <li v-for="(item, index) in shortCutList"
            class="item"
            :class="{'current': index === currentIndex}"
            :data-index="index"
        >
          {{item}}
        </li>
      </ul>
    </div>

    <div class="list-fixed" ref="fixed" v-show="fixedTitle">
      <div class="fixed-title">{{fixedTitle}} </div>
    </div>
    <div v-show="!data.length" class="loading-container">
      <loading></loading>
    </div>
  </scroll>
</template>

<script>
  import Scroll from '../scroll/scroll';
  import Loading from '../loading/loading';
  import {getData} from '@/js/dom';

  const ANCHOR_HEIGHT = 18;
  export default{
      props: {
          data: {
              type: Array,
              default: []
          }
      },
      components: {
          Scroll, Loading
      },
      data() {
          return {
              scrollY: -1,
              currentIndex: 0,
              diff: -1
          };
      },
      created() {
          this.touch = {};
          this.listenScroll = true;
          this.listHeight = [];
          this.probeType = 3;
      },
      computed: {
          shortCutList() {
              return this.data.map((item) => {
                  return item.title.substring(0, 1);
              });
          },
          fixedTitle() {
              if (this.scrollY > 0) {
                  return '';
              }
              return this.data[this.currentIndex] ? this.data[this.currentIndex].title : '';
          }
      },
      methods: {
          jmpDetail(item) {
              this.$emit('jmp', item);
          },
          onShortCutTouchStart(e) {
        // console.log(e.target)
              let anchorIndex = getData(e.target, 'index');
              let firstTouch = e.touches[0];
              this.touch.y1 = firstTouch.pageY;
              this.touch.anchorIndex = anchorIndex;
              this._scrollTo(anchorIndex);
          },
          onShortCutTouchMove(e) {
              let firstTouch = e.touches[0];
              this.touch.y2 = firstTouch.pageY;
              let delta = (this.touch.y2 - this.touch.y1) / ANCHOR_HEIGHT | 0;
              let anchorIndex = parseInt(this.touch.anchorIndex) + delta;
        // console.log(anchorIndex)
              this._scrollTo(anchorIndex);
          },
          _scrollTo(index) {
              console.log(index);
              if (!index && index !== 0) {
                  return;
              }
              if (index < 0) {
                  index = 0;
              } else if (index > this.listHeight.length - 2) {
                  index = this.listHeight.length - 2;
              }
              this.scrollY = -this.listHeight[index];
              this.$refs.listView.scrollToElement(this.$refs.listGroup[index], 0);
          },
          scroll(pos) {
              this.scrollY = pos.y;
          },
      // 计算高度
          calculateHeight() {
              this.listHeight = [];
              const list = this.$refs.listGroup;
              let height = 0;
              this.listHeight.push(height);
              for (let i = 0; i < list.length; i++) {
                  let item = list[i];
                  height += item.clientHeight;
                  this.listHeight.push(height);
              }
          }
      },
      watch: {
          data() {
              setTimeout(() => {
                  this.calculateHeight();
              }, 20);
          },
          scrollY(newY) {
        // console.log(newY)
              const listHeight = this.listHeight;
        // 当滚动到顶部是，newy>0
              if (newY > 0) {
                  this.currentIndex = 0;
                  return;
              }
        // 在中间滚动
              for (let i = 0; i < listHeight.length - 1; i++) {
                  let height1 = listHeight[i];
                  let height2 = listHeight[i + 1];
                  if (-newY >= height1 && -newY < height2) {
                      this.currentIndex = i;
            // console.log(this.currentIndex)
                      this.diff = height2 + newY;
                      return;
                  }
              }
        // 滚动到底部时，-newY > 最后一个元素上限
              this.currentIndex = listHeight.length - 2;
          },
      // 监测diff
          diff(newVal) {
        // console.log(newVal)
              let fixedTop = (newVal > 0 && newVal < 30) ? newVal - 30 : 0;
              if (this.fixedTop === fixedTop) {
                  return;
              }
              this.fixedTop = fixedTop;
              this.$refs.fixed.style.transform = `translate3d(0,${fixedTop}px,0)`;
          }
      }
  };
</script>

<style lang="scss" scoped>
@import "~@/scss/variable";

.listview{
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;
    background: $color-background;
    .list-group{
        padding-bottom: 30px;
        .list-groop-title{
            height: 30px;
            line-height: 30px;
            padding-left: 20px;
            font-size: $font-size-small;
            color: #011932;
            background: #f3f3f3;
        }
        .list-group-item{
            display: flex;
            align-items: center;
            padding: 20px 0 0 30px;
            .avatar{
                width: 50px;
                height: 50px;
                border-radius: 50%;
            }
            .name{
                margin-left: 20px;
                color: $color-list-name;
                font-size: $font-size-medium;
            }
        }
    }

    .list-shortcut{
        position: absolute;
        z-index: 30;
        right: 0;
        top: 50%;
        transform: translateY(-50%);
        width: 20px;
        padding: 20px 0;
        border-radius: 10px;
        text-align: center;
        background: #e8e8e8;
        font-family: Helvetica;
        cursor: pointer;
        .item{
            padding: 3px;
            line-height: 1;
            color: rgba(1, 28, 56, 0.53);
            font-size: $font-size-small;
            &.current{
                color: $color-list-name;
            }
        }
    }
    .list-fixed{
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        .fixed-title{
            height: 30px;
            line-height: 30px;
            padding-left: 20px;
            font-size: $font-size-small;
            color: #011932;
            background: #f3f3f3;
        }
    }
    .loading-container{
        position: absolute;
        width: 100%;
        top: 50%;
        transform: translateY(-50%);
    }
}
</style>
