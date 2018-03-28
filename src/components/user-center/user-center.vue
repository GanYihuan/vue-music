<template>
  <!-- 12 -->
  <transition name="slide">
    <div class="user-center">
      <div class="back" @click="back">
        <i class="icon-back"></i>
      </div>
      <div class="switches-wrapper">
        <switches
          :switches="switches"
          :currentIndex="currentIndex"
          @switch="switchItem"
        >
        </switches>
      </div>
      <div ref="playBtn" class="play-btn" @click="random">
        <i class="icon-play"></i>
        <span class="text">随机播放全部</span>
      </div>
      <div class="list-wrapper" ref="listWrapper">
        <scroll
          ref="favoriteList"
          class="list-scroll"
          v-if="currentIndex===0"
          :data="favoriteList"
        >
          <div class="list-inner">
            <song-list :songs="favoriteList" @select="selectSong"></song-list>
          </div>
        </scroll>
        <scroll
          ref="playList"
          class="list-scroll"
          v-if="currentIndex===1"
          :data="playHistory"
        >
          <div class="list-inner">
            <song-list :songs="playHistory" @select="selectSong"></song-list>
          </div>
        </scroll>
      </div>
      <div class="no-result-wrapper" v-show="noResult">
        <no-result :title="noResultDesc"></no-result>
      </div>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
  import {mapGetters, mapActions} from "vuex"
  import {playlistMixin} from "common/js/mixin"
  import Switches from "base/switches/switches"
  import Scroll from "base/scroll/scroll"
  import SongList from "base/song-list/song-list"
  import NoResult from "base/no-result/no-result"
  import Song from "common/js/song"

  export default {
    mixins: [playlistMixin],
    data () {
      return {
        // 第一个switches选项
        currentIndex: 0,
        switches: [
          {name: "我喜欢的"},
          {name: "最近听的"}
        ]
      }
    },
    computed: {
      noResult () {
        if (this.currentIndex === 0) {
          return !this.favoriteList.length
        } else {
          return !this.playHistory.length
        }
      },
      noResultDesc () {
        if (this.currentIndex === 0) {
          return "暂无收藏歌曲"
        } else {
          return "你还没有听过歌曲"
        }
      },
      ...mapGetters([
        "favoriteList",
        "playHistory"
      ])
    },
    methods: {
      // 设置mini播放器正确位置
      handlePlaylist (playlist) {
        const bottom = playlist.length > 0 ? "60px" : ""
        this.$refs.listWrapper.style.bottom = bottom
        // 使用了v-if值, 有可能不存在, 确保它不是undefined
        this.$refs.favoriteList && this.$refs.favoriteList.refresh()
        this.$refs.playList && this.$refs.playList.refresh()
      },
      switchItem (index) {
        this.currentIndex = index
      },
      selectSong (song) {
        // mutation
        this.insertSong(new Song(song))
      },
      back () {
        this.$router.back()
      },
      // 随机播放
      random () {
        let list = this.currentIndex === 0 ? this.favoriteList : this.playHistory
        // 没数据时
        if (list.length === 0) {
          return
        }
        // list获得Song实例, 获得Song特有方法
        list = list.map(song => {
          return new Song(song)
        })
        // mutation
        this.randomPlay({
          list
        })
      },
      ...mapActions([
        "insertSong",
        "randomPlay"
      ])
    },
    components: {
      Switches,
      Scroll,
      SongList,
      NoResult
    }
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
  @import "../../common/scss/variable.scss";
  @import "../../common/scss/_mixin.scss";
  @import "./user-center.scss";
</style>