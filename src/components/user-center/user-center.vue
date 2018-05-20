<template>
  <!-- 12-用户中心页 -->
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
      <div class="play-btn" ref="playBtn" @click="random">
        <i class="icon-play"></i>
        <span class="text">随机播放全部</span>
      </div>
      <div class="list-wrapper" ref="listWrapper">
        <scroll class="list-scroll"
                ref="favoriteList"
                v-if="currentIndex===0"
                :data="favoriteList"
        >
          <div class="list-inner">
            <song-list :songs="favoriteList" @select="selectSong"></song-list>
          </div>
        </scroll>
        <scroll class="list-scroll"
                ref="playList"
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
  import { mapGetters, mapActions } from 'vuex'
  import { playlistMixin } from 'common/js/mixin'
  import Switches from 'base/switches/switches'
  import Scroll from 'base/scroll/scroll'
  import SongList from 'base/song-list/song-list'
  import NoResult from 'base/no-result/no-result'
  import Song from 'common/js/song'

  export default {
    mixins: [playlistMixin],
    data () {
      return {
        // The first switch option.
        currentIndex: 0,
        switches: [
          {name: '我喜欢的'},
          {name: '最近听的'}
        ]
      }
    },
    computed: {
      ...mapGetters([
        'favoriteList',
        'playHistory'
      ]),
      noResult () {
        if (this.currentIndex === 0) {
          return !this.favoriteList.length
        } else {
          return !this.playHistory.length
        }
      },
      noResultDesc () {
        if (this.currentIndex === 0) {
          return '暂无收藏歌曲'
        } else {
          return '你还没有听过歌曲'
        }
      }
    },
    methods: {
      ...mapActions([
        'insertSong',
        'randomPlay'
      ]),
      // Set the mini player to the correct position.
      handlePlaylist (playlist) {
        const bottom = playlist.length > 0 ? '60px' : ''
        this.$refs.listWrapper.style.bottom = bottom
        // With the v-if value, it might not exist to make sure it's not undefined.
        this.$refs.favoriteList && this.$refs.favoriteList.refresh()
        this.$refs.playList && this.$refs.playList.refresh()
      },
      switchItem (index) {
        this.currentIndex = index
      },
      selectSong (song) {
        // ...mapActions
        this.insertSong(new Song(song))
      },
      back () {
        this.$router.back()
      },
      random () {
        let list = this.currentIndex === 0 ? this.favoriteList : this.playHistory
        // No data
        if (list.length === 0) {
          return
        }
        // List gets the Song instance and gets the Song specific method.
        list = list.map(song => {
          return new Song(song)
        })
        // mutation
        this.randomPlay({
          list
        })
      }
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
