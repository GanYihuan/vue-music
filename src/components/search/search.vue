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
        :data="shortcut"
      >
        <!-- 包一个div，计算两部分的滚动 -->
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
    <!-- @confirm: if true, call func -->
    <confirm
      ref="confirm"
      @confirm="clearSearchHistory"
      text="是否清空所有搜索历史"
      confirmBtnText="清空"
    >
    </confirm>
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
  import Confirm from "base/confirm/confirm"

  export default {
    mixins: [playlistMixin, searchMixin],
    data () {
      return {
        hotKey: []
      }
    },
    computed: {
      // 当hotKey, searchHistory发生变化时，scroll从新设置高度
      shortcut () {
        return this.hotKey.concat(this.searchHistory)
      }
    },
    created () {
      this._getHotKey()
    },
    methods: {
      handlePlaylist () {
        const bottom = playlist.length > 0 ? "60px" : ""
        this.$refs.searchResult.style.bottom = bottom
        this.$refs.suggest.refresh()
        this.$refs.shortcutWrapper.style.bottom = bottom
        this.$refs.shortcut.refresh()
      },
      showConfirm () {
        this.$refs.confirm.show()
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
    watch: {
      query (newQuery) {
        if (!newQuery) {
          setTimeout(() => {
            this.$refs.shortcut.refresh()
          }, 20)
        }
      }
    },
    components: {
      SearchBox,
      Scroll,
      Suggest,
      SearchList,
      Confirm
    }
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
  @import "../../common/scss/variable.scss";
  @import "../../common/scss/_mixin.scss";
  @import "./search.scss";
</style>