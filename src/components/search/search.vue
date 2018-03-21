<template>
  <div class="search">
    <div class="search-box-wrapper">
      <search-box ref="searchBox" @query="onQueryChange"></search-box>
    </div>
    <div
      ref="shortcutWrapper"
      class="shortcut-wrapper"
      v-show="!query"
    >
      <scroll
        ref="shortcut"
        class="shortcut"
      >
        <div>
          <div class="hot-key">
            <h1 class="title">热门搜索</h1>
            <ul>
              <li
                class="item"
                v-for="(item,index) in hotKey"
                :key="index"
                @click="addQuery(item.k)"
              >
                <span>{{item.k}}</span>
              </li>
            </ul>
          </div>
        </div>
      </scroll>
    </div>
    <div class="search-result" v-show="query" ref="searchResult">
      <suggest
        ref="suggest"
        :query="query"
      >
      </suggest>
    </div>
    <!-- 二级路由 -->
    <router-view></router-view>
  </div>
</template>

<script type="text/ecmascript-6">
  import {mapActions} from "vuex"
  import {getHotKey} from "api/search"
  import {ERR_OK} from "api/config"
  import {playlistMixin, searchMixin} from "common/js/mixin"
  import Scroll from "base/scroll/scroll"
  import SearchBox from "base/search-box/search-box"
  import Suggest from "components/suggest/suggest"

  export default {
    mixins: [playlistMixin, searchMixin],
    data () {
      return {
        hotKey: []
      }
    },
    created () {
      this._getHotKey();
    },
    methods: {
      handlePlaylist () {

      },
      addQuery (query) {
        this.$refs.searchBox.setQuery(query)
      },
      _getHotKey () {
        getHotKey()
          .then(res => {
            if (res.code === ERR_OK) {
              this.hotKey = res.data.hotkey.slice(0, 10)
            }
          })
      }
    },
    components: {
      SearchBox,
      Scroll,
      Suggest
    }
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
  @import "../../common/scss/variable.scss";
  @import "../../common/scss/_mixin.scss";
  @import "./search.scss";
</style>