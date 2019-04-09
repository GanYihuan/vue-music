<template>
  <!-- ![music player interface](https://i.loli.net/2019/04/09/5cac16b7d5a91.png) -->
  <div class="player" v-show="playlist.length>0">
    <transition
      name="normal"
      @enter="enter"
      @after-enter="afterEnter"
      @leave="leave"
      @after-leave="afterLeave"
    >
      <div class="normal-player" v-show="fullScreen">
        <div class="background">
          <img width="100%" height="100%" :src="currentSong.image"/>
        </div>
        <div class="top">
          <div class="back" @click="back">
            <i class="icon-back"></i>
          </div>
          <h1 class="title" v-html="currentSong.name"></h1>
          <h2 class="subtitle" v-html="currentSong.singer"></h2>
        </div>
        <div
          class="middle"
          @touchstart.prevent="middleTouchStart"
          @touchmove.prevent="middleTouchMove"
          @touchend="middleTouchEnd"
        >
          <div class="middle-l" ref="middleL">
            <div class="cd-wrapper" ref="cdWrapper">
              <div class="cd" :class="cdCls">
                <img class="image" :src="currentSong.image"/>
              </div>
            </div>
            <div class="playing-lyric-wrapper">
              <div class="playing-lyric">{{playingLyric}}</div>
            </div>
          </div>
          <!-- :data="currentLyric && currentLyric.lines": currentLyric!==null -->
          <scroll class="middle-r" ref="lyricList" :data="currentLyric && currentLyric.lines">
            <div class="lyric-wrapper">
              <div v-if="currentLyric">
                <p
                  class="text"
                  ref="lyricLine"
                  v-for="(line,index) in currentLyric.lines"
                  :key="index"
                  :class="{'current': currentLineNum === index}"
                >
                  {{line.txt}}
                </p>
              </div>
            </div>
          </scroll>
        </div>
        <div class="bottom">
          <div class="dot-wrapper">
            <span class="dot" :class="{'active':currentShow==='cd'}"></span>
            <span class="dot" :class="{'active':currentShow==='lyric'}"></span>
          </div>
          <div class="progress-wrapper">
            <span class="time time-l">{{format(currentTime)}}</span>
            <div class="progress-bar-wrapper">
              <progress-bar :percent="percent" @percentChange="onProgressBarChange"></progress-bar>
            </div>
            <span class="time time-r">{{format(currentSong.duration)}}</span>
          </div>
          <div class="operators">
            <div class="icon i-left" @click="changeMode">
              <i :class="iconMode"></i>
            </div>
            <div class="icon i-left" :class="disableCls">
              <i class="icon-prev" @click="prev"></i>
            </div>
            <div class="icon i-center" :class="disableCls">
              <i :class="playIcon" @click="togglePlaying"></i>
            </div>
            <div class="icon i-right" :class="disableCls">
              <i class="icon-next" @click="next"></i>
            </div>
            <div class="icon i-right">
              <i class="icon" :class="getFavoriteIcon(currentSong)" @click="toggleFavorite(currentSong)"></i>
            </div>
          </div>
        </div>
      </div>
    </transition>
    <transition name="mini">
      <div class="mini-player" v-show="!fullScreen" @click="open">
        <div class="icon">
          <img width="40" height="40" :class="cdCls" :src="currentSong.image"/>
        </div>
        <div class="text">
          <h2 class="name" v-html="currentSong.name"></h2>
          <p class="desc" v-html="currentSong.singer"></p>
        </div>
        <div class="control">
          <!-- insert slot -->
          <progress-circle :radius="radius" :percent="percent">
            <i class="icon-mini" :class="miniIcon" @click.stop="togglePlaying"></i>
          </progress-circle>
        </div>
        <div class="control" @click.stop="showPlaylist">
          <i class="icon-playlist"></i>
        </div>
      </div>
    </transition>
    <playlist ref="playlist"></playlist>
    <audio
      ref="audio"
      :src="currentSong.url"
      @play="ready"
      @error="error"
      @timeupdate="updateTime"
      @ended="end"
    >
    </audio>
  </div>
</template>

<script type="text/ecmascript-6">
import { mapGetters, mapMutations, mapActions } from 'vuex'
import { prefixStyle } from 'common/js/dom'
import { playMode } from 'common/js/config'
import { playerMixin } from 'common/js/mixin'
import animations from 'create-keyframe-animation'
import ProgressBar from 'base/progress-bar/progress-bar'
import ProgressCircle from 'base/progress-circle/progress-circle'
import Lyric from 'lyric-parser'
import Scroll from 'base/scroll/scroll'
import Playlist from 'components/playlist/playlist'

const transform = prefixStyle('transform')
const transitionDuration = prefixStyle('transitionDuration')

export default {
  components: {
    ProgressBar,
    ProgressCircle,
    Scroll,
    Playlist
  },
  mixins: [playerMixin],
  data() {
    return {
      songReady: false,
      currentTime: 0,
      radius: 32,
      currentLyric: null,
      currentLineNum: 0, // lyrics highlight
      currentShow: 'cd', // disc interface and lyrics interface
      playingLyric: '' // CD below lyrics
    }
  },
  created() {
    this.touch = {}
  },
  computed: {
    ...mapGetters(['currentIndex', 'fullScreen', 'playing']),
    cdCls() {
      return this.playing ? 'play' : 'play pause'
    },
    playIcon() {
      return this.playing ? 'icon-pause' : 'icon-play'
    },
    miniIcon() {
      return this.playing ? 'icon-pause-mini' : 'icon-play-mini'
    },
    disableCls() {
      return this.songReady ? '' : 'disable'
    },
    percent() {
      return this.currentTime / this.currentSong.duration
    }
  },
  methods: {
    ...mapMutations({
      setFullScreen: 'SET_FULL_SCREEN',
      setPlayingState: 'SET_PLAYING_STATE'
    }),
    ...mapActions(['savePlayHistory']),
    back() {
      this.setFullScreen(false)
    },
    open() {
      this.setFullScreen(true)
    },
    enter(el, done) {
      const { x, y, scale } = this._getPosAndScale()
      const animation = {
        0: {
          transform: `translate3d(${x}px,${y}px,0) scale(${scale})`
        },
        60: {
          transform: `translate3d(0,0,0) scale(1.1)`
        },
        100: {
          transform: `translate3d(0,0,0) scale(1)`
        }
      }
      animations.registerAnimation({
        name: 'move',
        animation,
        presets: {
          duration: 400,
          easing: 'linear'
        }
      })
      animations.runAnimation(this.$refs.cdWrapper, 'move', done)
    },
    afterEnter() {
      animations.unregisterAnimation('move')
      this.$refs.cdWrapper.style.animation = ''
    },
    leave(el, done) {
      const { x, y, scale } = this._getPosAndScale()
      this.$refs.cdWrapper.style.transition = 'all 0.4s'
      this.$refs.cdWrapper.style[transform] = `translate3d(${x}px,${y}px,0) scale(${scale})`
      this.$refs.cdWrapper.addEventListener('transitionend', done)
    },
    afterLeave() {
      this.$refs.cdWrapper.style.transition = ''
      this.$refs.cdWrapper.style[transform] = ''
    },
    togglePlaying() {
      if (!this.songReady) {
        return
      }
      this.setPlayingState(!this.playing)
      // fixBug: when scroll lyrics can play, preventing the lyrics from scrolling while they stop playing
      if (this.currentLyric) {
        this.currentLyric.togglePlay()
      }
    },
    end() {
      if (this.mode === playMode.loop) {
        this.loop()
      } else {
        this.next()
      }
    },
    loop() {
      this.$refs.audio.currentTime = 0
      this.$refs.audio.play()
      this.setPlayingState(true)
      if (this.currentLyric) {
        // <audio>, song jump to begin
        this.currentLyric.seek(0)
      }
    },
    next() {
      if (!this.songReady) {
        return
      }
      // only one song
      if (this.playlist.length === 1) {
        this.loop()
        return
      } else {
        let index = this.currentIndex + 1
        if (index === this.playlist.length) {
          index = 0
        }
        this.setCurrentIndex(index)
        if (!this.playing) {
          this.togglePlaying()
        }
      }
      this.songReady = false
    },
    prev() {
      if (!this.songReady) {
        return
      }
      if (this.playlist.length === 1) {
        this.loop()
        return
      } else {
        let index = this.currentIndex - 1
        if (index === -1) {
          index = this.playlist.length - 1
        }
        this.setCurrentIndex(index)
        if (!this.playing) {
          this.togglePlaying()
        }
      }
      this.songReady = false
    },
    ready() {
      this.songReady = true
      this.savePlayHistory(this.currentSong)
    },
    error() {
      this.songReady = true
    },
    updateTime(e) {
      // <audio> current time
      this.currentTime = e.target.currentTime
    },
    format(interval) {
      // | 0: math.floor
      interval = interval | 0
      const minute = (interval / 60) | 0
      // _pad: Use 0 to fill 2 bits
      const second = this._pad(interval % 60)
      return `${minute}:${second}`
    },
    // _pad: use 0 to fill 2 bits
    _pad(num, n = 2) {
      let len = num.toString().length
      while (len < n) {
        num = '0' + num
        len++
      }
      return num
    },
    onProgressBarChange(percent) {
      const currentTime = this.currentSong.duration * percent
      this.$refs.audio.currentTime = currentTime
      if (!this.playing) {
        this.togglePlaying()
      }
      if (this.currentLyric) {
        this.currentLyric.seek(currentTime * 1000)
      }
    },
    getLyric() {
      this.currentSong
        .getLyric()
        .then(lyric => {
          // prevent fast switch, result in unmatched lyric
          if (this.currentSong.lyric !== lyric) {
            return
          }
          this.currentLyric = new Lyric(lyric, this.handleLyric)
          if (this.playing) {
            this.currentLyric.play()
          }
        })
        .catch(() => {
          this.currentLyric = null
          this.playingLyric = ''
          this.currentLineNum = 0
        })
    },
    handleLyric({ lineNum, txt }) {
      this.currentLineNum = lineNum
      if (lineNum > 5) {
        const lineEl = this.$refs.lyricLine[lineNum - 5]
        this.$refs.lyricList.scrollToElement(lineEl, 1000)
      } else {
        this.$refs.lyricList.scrollTo(0, 0, 1000)
      }
      this.playingLyric = txt
    },
    showPlaylist() {
      this.$refs.playlist.show()
    },
    middleTouchStart(e) {
      this.touch.initiated = true
      this.touch.moved = false
      // finger click info
      const touch = e.touches[0]
      this.touch.startX = touch.pageX
      this.touch.startY = touch.pageY
    },
    middleTouchMove(e) {
      if (!this.touch.initiated) {
        return
      }
      const touch = e.touches[0]
      const deltaX = touch.pageX - this.touch.startX
      const deltaY = touch.pageY - this.touch.startY
      // whether switch depends on x-axis scroll more than y-axic scroll
      if (Math.abs(deltaY) > Math.abs(deltaX)) {
        return
      }
      if (!this.touch.moved) {
        this.touch.moved = true
      }
      const left = this.currentShow === 'cd' ? 0 : -window.innerWidth
      // page left-scroll distance
      const offsetWidth = Math.min(
        0,
        Math.max(-window.innerWidth, left + deltaX)
      )
      this.touch.percent = Math.abs(offsetWidth / window.innerWidth)
      // lyricList: Vue component, $el access dom
      this.$refs.lyricList.$el.style[transform] = `translate3d(${offsetWidth}px,0,0)`
      this.$refs.lyricList.$el.style[transitionDuration] = 0
      this.$refs.middleL.style.opacity = 1 - this.touch.percent
      this.$refs.middleL.style[transitionDuration] = 0
    },
    middleTouchEnd() {
      if (!this.touch.moved) {
        return
      }
      let offsetWidth
      let opacity
      if (this.currentShow === 'cd') {
        // slide <-
        if (this.touch.percent > 0.1) {
          offsetWidth = -window.innerWidth
          opacity = 0
          this.currentShow = 'lyric'
        } else {
          offsetWidth = 0
          opacity = 1
        }
      } else {
        // slide ->
        if (this.touch.percent < 0.9) {
          offsetWidth = 0
          this.currentShow = 'cd'
          opacity = 1
        } else {
          offsetWidth = -window.innerWidth
          opacity = 0
        }
      }
      const time = 300
      this.$refs.lyricList.$el.style[transform] = `translate3d(${offsetWidth}px,0,0)`
      this.$refs.lyricList.$el.style[transitionDuration] = `${time}ms`
      this.$refs.middleL.style.opacity = opacity
      this.$refs.middleL.style[transitionDuration] = `${time}ms`
      this.touch.initiated = false
    },
    _getPosAndScale() {
      const targetWidth = 40 // Small record width
      const paddingLeft = 40 // Small record paddingLeft
      const paddingBottom = 30 // Small record paddingBottom
      const paddingTop = 80 // Big record paddingTop
      const width = window.innerWidth * 0.8 // Big record width
      const scale = targetWidth / width
      const x = -(window.innerWidth / 2 - paddingLeft) // Fourth quadrant, Big record middle point (x, y)
      const y = window.innerHeight - paddingTop - width / 2 - paddingBottom
      return { x, y, scale }
    }
  },
  watch: {
    // currentSong change, invoked play(), so watch
    currentSong(newSong, oldSong) {
      // no song
      if (!newSong.id) {
        return
      }
      // mixin.js/changeMode(), currentSong.id no change currentSong no change
      if (newSong.id === oldSong.id) {
        return
      }
      if (this.currentLyric) {
        // stop timer of the first song
        this.currentLyric.stop()
        this.currentTime = 0
        this.playingLyric = ''
        this.currentLineNum = 0
      }
      clearTimeout(this.timer)
      this.timer = setTimeout(() => {
        // method & data it's sync
        this.$refs.audio.play()
        this.getLyric()
      }, 1000)
    },
    playing(newPlaying) {
      const audio = this.$refs.audio
      // method & data it's sync
      // 在下次 DOM 更新循环结束之后执行延迟回调。在修改数据之后立即使用这个方法，获取更新后的 DOM
      this.$nextTick(() => {
        newPlaying ? audio.play() : audio.pause()
      })
    },
    fullScreen(newVal) {
      if (newVal) {
        setTimeout(() => {
          this.$refs.lyricList.refresh()
        }, 20)
      }
    }
  }
}
</script>

<style scoped lang="scss" rel="stylesheet/scss">
@import './player.scss';
</style>
