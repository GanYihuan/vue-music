<template>
  <div class="search">
    <div class="search-box-wrapper">
      <search-box ref="searchBox"></search-box>
    </div>
    <div ref="shortcutWrapper" class="shortcut-wrapper">
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
  </div>
</template>

<script type="text/ecmascript-6">
  import {mapActions} from "vuex"
  import {getHotKey} from "api/search"
  import {ERR_OK} from "api/config"
  import {playlistMixin, searchMixin} from "common/js/mixin"
  import Scroll from "base/scroll/scroll"
  import SearchBox from "base/search-box/search-box"

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
      Scroll
    }
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
  @import "../../common/scss/variable.scss";
  @import "../../common/scss/_mixin.scss";
  @import "./search.scss";
</style>