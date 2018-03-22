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
          <div class="search-history" v-show="searchHistory.length">
            <h1 class="title">
              <span class="text">搜索历史</span>
              <span class="clear" @click="showConfirm">
                <i class="icon-clear"></i>
              </span>
            </h1>
            <search-list
              @delete="deleteSearchHistory"
              @select="addQuery"
              :searches="searchHistory"
            >
            </search-list>
          </div>
        </div>
      </scroll>
    </div>
    <div class="search-result" v-show="query" ref="searchResult">
      <suggest
        ref="suggest"
        :query="query"
        @listScroll="blurInput"
        @select="saveSearch"
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
  import SearchList from "base/search-list/search-list"

  export default {
    mixins: [playlistMixin, searchMixin],
    data () {
      return {
        hotKey: []
      }
    },
    computed: {
      shortcut () {
        return this.hotKey.concat(this.searchHistory);
      }
    },
    created () {
      this._getHotKey();
    },
    methods: {
      handlePlaylist () {

      },
      showConfirm () {
        this.$refs.confirm.show();
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
      },
      ...mapActions([
        "clearSearchHistory"
      ])
    },
    components: {
      SearchBox,
      Scroll,
      Suggest,
      SearchList
    }
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
  @import "../../common/scss/variable.scss";
  @import "../../common/scss/_mixin.scss";
  @import "./search.scss";
</style>