<template>
  <!-- static/08-搜索界面 -->
  <div class="search">
    <div class="search-box-wrapper">
      <search-box ref="searchBox" @query="onQueryChange"></search-box>
    </div>
    <div
      class="shortcut-wrapper"
      ref="shortcutWrapper"
      v-show="!query"
      :refreshDelay="refreshDelay"
    >
      <scroll
        class="shortcut"
        ref="shortcut"
        :data="shortcut"
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
              :searches="searchHistory"
              @delete="deleteSearchHistory"
              @select="addQuery"
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
      text="是否清空所有搜索历史"
      confirmBtnText="清空"
      @confirm="clearSearchHistory"
    >
    </confirm>
    <!-- The secondary routing -->
    <router-view></router-view>
  </div>
</template>

<script type="text/ecmascript-6">
import { mapActions } from 'vuex'
import { getHotKey } from 'api/search'
import { ERR_OK } from 'api/config'
import { playlistMixin, searchMixin } from 'common/js/mixin'
import Scroll from 'base/scroll/scroll'
import SearchBox from 'base/search-box/search-box'
import Suggest from 'components/suggest/suggest'
import SearchList from 'base/search-list/search-list'
import Confirm from 'base/confirm/confirm'

export default {
  mixins: [playlistMixin, searchMixin],
  components: {
    SearchBox,
    Scroll,
    Suggest,
    SearchList,
    Confirm
  },
  data() {
    return {
      hotKey: [],
      query: ''
    }
  },
  created() {
    this._getHotKey()
  },
  computed: {
    /* when hotKey, searchHistory changes, scroll resets the height */
    shortcut() {
      return this.hotKey.concat(this.searchHistory)
    }
  },
  methods: {
    ...mapActions(['clearSearchHistory']),
    handlePlaylist(playlist) {
      const bottom = playlist.length > 0 ? '60px' : ''
      this.$refs.searchResult.style.bottom = bottom
      this.$refs.suggest.refresh()
      this.$refs.shortcutWrapper.style.bottom = bottom
      this.$refs.shortcut.refresh()
    },
    showConfirm() {
      this.$refs.confirm.show()
    },
    addQuery(query) {
      this.$refs.searchBox.setQuery(query)
    },
    _getHotKey() {
      getHotKey().then(res => {
        if (res.code === ERR_OK) {
          this.hotKey = res.data.hotkey.slice(0, 10)
        }
      })
    }
  },
  watch: {
    /* Prevent current interface from disabling scrolling */
    query(newQuery) {
      if (!newQuery) {
        setTimeout(() => {
          this.$refs.shortcut.refresh()
        }, 20)
      }
    }
  }
}
</script>

<style scoped lang="scss" rel="stylesheet/scss">
@import './search.scss';
</style>
