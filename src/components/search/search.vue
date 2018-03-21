<template>
  <div class="search">
    <div class="search-box-wrapper">
      <search-box ref="searchBox" @query="onQueryChange"></search-box>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import SearchBox from "base/search-box/search-box"

  export default {
    components: {
      SearchBox
    }
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
  @import "../../common/scss/variable.scss";
  @import "../../common/scss/_mixin.scss";
  @import "./search.scss";
</style>