<template>
    <div class="tab">
      <router-link tag="div" class="tab-item" to="/recommend">
        <span class="tab-link">推荐</span>
      </router-link>
      <router-link tag="div" class="tab-item" to="/singer">
        <span class="tab-link">歌手</span>
      </router-link>
      <router-link tag="div" class="tab-item" to="/rank">
        <span class="tab-link">排行</span>
      </router-link>
      <router-link tag="div" class="tab-item" to="/search">
        <span class="tab-link">搜索</span>
      </router-link>
    </div>
</template>

<script>
  export default{
      data() {
          return {};
      }
  };
</script>

<style lang="scss" scoped>
@import "~@/scss/variable";

.tab{
    display :flex;
    height:44px;
    line-height :44px;
    font-size: $font-size-medium;
    background: linear-gradient(90deg, #011830, #064e7b);
    .tab-item{
        flex:1;
        text-align :center;
        .tab-link{
            padding-bottom :5px;
            color: rgba(239, 239, 239, 0.7);
        }
        &.router-link-active {
            .tab-link{
                color: $color-text-l;
                border-bottom: 2px solid $color-text-l;
            }
        }
    }
}
</style>
