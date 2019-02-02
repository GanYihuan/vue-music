<template>
  <!-- 11-添加歌曲到列表 -->
  <transition name="slide">
    <div class="add-song" v-show="showFlag" @click.stop>
      <div class="header">
        <h1 class="title">添加歌曲到列表</h1>
        <div class="close" @click="hide">
          <i class="icon-close"></i>
        </div>
      </div>
      <div class="search-box-wrapper">
        <search-box
          ref="searchBox"
          placeholder="搜索歌曲"
          @query="onQueryChange"
        >
        </search-box>
      </div>
      <div class="shortcut" v-show="!query">
        <switches
          :switches="switches"
          :currentIndex="currentIndex"
          @switch="switchItem"
        >
        </switches>
        <div class="list-wrapper">
          <scroll
            class="list-scroll"
            ref="songList"
            v-if="currentIndex === 0"
            :data="playHistory"
          >
            <div class="list-inner">
              <song-list :songs="playHistory" @select="selectSong"></song-list>
            </div>
          </scroll>
          <scroll
            class="list-scroll"
            ref="searchList"
            v-if="currentIndex === 1"
            :data="searchHistory"
            :refreshDelay="refreshDelay"
          >
            <div class="list-inner">
              <search-list
                :searches="searchHistory"
                @delete="deleteSearchHistory"
                @select="addQuery"
              >
              </search-list>
            </div>
          </scroll>
        </div>
      </div>
      <div class="search-result" v-show="query">
        <suggest
          :query="query"
          :showSinger="showSinger"
          @select="selectSuggest"
          @listScroll="blurInput"
        >
        </suggest>
      </div>
      <top-tip ref="topTip">
        <div class="tip-title">
          <i class="icon-ok"></i>
          <span class="text">1首歌曲已经添加到播放列表</span>
        </div>
      </top-tip>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
import SearchBox from 'base/search-box/search-box'
import SongList from 'base/song-list/song-list'
import SearchList from 'base/search-list/search-list'
import Scroll from 'base/scroll/scroll'
import Switches from 'base/switches/switches'
// Cue components when adding songs.
import TopTip from 'base/top-tip/top-tip'
import Suggest from 'components/suggest/suggest'
import { searchMixin } from 'common/js/mixin'
import { mapGetters, mapActions } from 'vuex'
import Song from 'common/js/song'

export default {
  components: {
    SearchBox,
    SongList,
    SearchList,
    Scroll,
    Switches,
    TopTip,
    Suggest
  },
  mixins: [searchMixin],
  data() {
    return {
      showFlag: false,
      showSinger: false,
      currentIndex: 0,
      songs: [],
      switches: [{ name: '最近播放' }, { name: '搜索历史' }]
    }
  },
  computed: {
    ...mapGetters(['playHistory'])
  },
  methods: {
    ...mapActions(['insertSong']),
    show() {
      this.showFlag = true
      setTimeout(() => {
        if (this.currentIndex === 0) {
          this.$refs.songList.refresh()
        } else {
          this.$refs.searchList.refresh()
        }
      }, 20)
    },
    hide() {
      this.showFlag = false
    },
    selectSong(song, index) {
      if (index !== 0) {
        this.insertSong(new Song(song))
        this.$refs.topTip.show()
      }
    },
    selectSuggest() {
      this.$refs.topTip.show()
      this.saveSearch()
    },
    switchItem(index) {
      this.currentIndex = index
    }
  }
}
</script>

<style scoped lang="scss" rel="stylesheet/scss">
@import './add-song.scss';
</style>
