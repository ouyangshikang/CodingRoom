<template>
  <div id="app">
    <headers></headers>
    <tab></tab>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
  import Headers from 'components/header/header';
  import Tab from 'components/tab/tab';
  export default {
      components: {
          Headers,
          Tab
      }
  };
</script>

<style lang="scss" scoped>
@import "assets/scss/variable";

#app {
  color: $color-theme;
}
</style>
