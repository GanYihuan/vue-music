<template>
  <div class="player" v-show="playList.length > 0">
    <transition
      name="normal"
      @enter="enter"
      @after-enter="afterEnter"
      @leave="leave"
      @after-leave="afterLeave"
    >
      <div class="normal-player" v-show="fullScreen">
        <div class="background">
          <img width="100%" height="100%" :src="currentSong.image">
        </div>
        <div class="top">
          <div class="back" @click="back">
            <i class="icon-back"></i>
          </div>
          <h1 class="title" v-html="currentSong.name"></h1>
          <h2 class="subtitle" v-html="currentSong.singer"></h2>
        </div>
        <div class="middle">
          <div class="middle-l">
            <div class="cd-wrapper" ref="cdWrapper">
              <div class="cd" :class="cdCls">
                <img class="image" :src="currentSong.image">
              </div>
            </div>
            <div class="playing-lyric-wrapper">
              <div class="playing-lyric"></div>
            </div>
          </div>
          <div class="lyric-wrapper">
            <div>
              <p class="text"></p>
            </div>
          </div>
        </div>
        <div class="bottom">
          <div class="dot-wrapper">
            <span class="dot"></span>
            <span class="dot"></span>
          </div>
          <div class="progress-wrapper">
            <span class="time time-l">{{format(currentTime)}}</span>
            <div class="progress-bar-wrapper">
              <progress-bar :percent="percent" @percentChange="onProgressBarChange"></progress-bar>
            </div>
            <span class="time time-r">{{format(this.currentSong.duration)}}</span>
          </div>
          <div class="operators">
            <div class="icon i-left" @click="changeMode">
              <i :class="iconMode"></i>
            </div>
            <div class="icon i-left" :class="disableCls">
              <i class="icon-prev" @click="prevSong"></i>
            </div>
            <div class="icon i-center" :class="disableCls">
              <i :class="playIcon" @click="togglePlaying"></i>
            </div>
            <div class="icon i-right" :class="disableCls">
              <i class="icon-next" @click="nextSong"></i>
            </div>
            <div class="icon i-right">
              <i class="icon icon-not-favorite"></i>
            </div>
          </div>
        </div>
      </div>
    </transition>
    <transition name="mini">
      <div class="mini-player" v-show="!fullScreen" @click="open">
        <div class="icon">
          <img :class="cdCls" width="40" height="40" :src="currentSong.image">
        </div>
        <div class="text">
          <h2 class="name" v-html="currentSong.name"></h2>
          <p class="desc" v-html="currentSong.singer"></p>
        </div>
        <div class="control" @click.stop="togglePlaying">
          <progress-circle :radius="radius" :percent="percent">
            <i @click.stop="togglePlaying" class="icon-mini" :class="miniIcon"></i>
          </progress-circle>
        </div>
        <div class="control">
          <i class="icon-playlist"></i>
        </div>
      </div>
    </transition>
    <audio
      :src="currentSong.url"
      ref="audio"
      @canplay="ready"
      @error='error'
      @timeupdate="updateTime"
      @ended="end"
    >
    </audio>
  </div>
</template>

<script type="text/ecmascript-6">
  import {mapGetters, mapMutations} from "vuex"
  import {prefixStyle} from 'common/js/dom'
  import {playMode} from 'common/js/config'
  import {shuffle} from 'common/js/util'
  import animations from "create-keyframe-animation";
  import ProgressBar from "base/progress-bar/progress-bar"
  import ProgressCircle from "base/progress-circle/progress-circle"
  // 解析字符串, 传入lyric,执行到一个时间点后执行handle函数
  import Lyric from 'lyric-parser'

  const transform = prefixStyle('transform')

  export default {
    data () {
      return {
        songReady: false,
        currentTime: 0,
        radius: 32,
        currentLyric: null
      }
    },
    computed: {
      // 传入 vuex 的 state
      ...mapGetters([
        "fullScreen",
        "playList",
        "currentSong",
        "playing",
        "currentIndex",
        "mode",
        "sequenceList"
      ]),
      playIcon () {
        return this.playing ? "icon-pause" : "icon-play"
      },
      iconMode () {
        return this.mode === playMode.sequence ? 'icon-sequence' : this.mode === playMode.loop ? 'icon-loop' : 'icon-random'
      },
      miniIcon () {
        return this.playing ? 'icon-pause-mini' : 'icon-play-mini'
      },
      playMiniIcon () {
        return this.playing ? "icon-pause-mini" : "icon-play-mini"
      },
      cdCls () {
        return this.playing ? "play" : "play pause"
      },
      disableCls () {
        return this.songReady ? "" : "disable"
      },
      percent () {
        return this.currentTime / this.currentSong.duration
      }
    },
    methods: {
      back () {
        this.setFullScreen(false)
      },
      open () {
        this.setFullScreen(true)
      },
      enter (el, done) {
        const {x, y, scale} = this._getPosAndScale()
        let animation = {
          0: {
            transform: `translate3d(${x}px, ${y}px, 0) scale(${scale})`
          },
          60: {
            transform: `translate3d(0, 0, 0) scale(1.1)`
          },
          100: {
            transform: `translate3d(0, 0, 0) scale(1)`
          }
        }
        animations.registerAnimation({
          name: "move",
          animation,
          presets: {
            duration: 500,
            easing: "linear"
          }
        })
        animations.runAnimation(this.$refs.cdWrapper, "move", done)
      },
      afterEnter () {
        animations.unregisterAnimation("move")
        this.$refs.cdWrapper.style.animation = ""
      },
      leave (el, done) {
        const {x, y, scale} = this._getPosAndScale()
        this.$refs.cdWrapper.style.transition = "all 0.4s"
        this.$refs.cdWrapper.style.transform = `translate3d(${x}px, ${y}px, 0) scale(${scale})`
        // 监听事件
        this.$refs.cdWrapper.addEventListener("transitionend", done)
      },
      afterLeave () {
        this.$refs.cdWrapper.style.transition = ""
        this.$refs.cdWrapper.style.transform = ""
      },
      togglePlaying () {
        this.setPlayingState(!this.playing)
      },
      end () {
        if (this.mode === playMode.loop) {
          this.loop()
        } else {
          this.next()
        }
      },
      loop () {
        this.$refs.audio.currentTime = 0
        this.$refs.audio.play()
        this.setPlayingState(true)
        if (this.currentLyric) {
          //
          this.currentLyric.seek(0)
        }
      },
      prevSong () {
        if (!this.songReady) {
          return
        }
        let index = this.currentIndex - 1
        if (index === -1) {
          index = this.playList.length - 1
        }
        this.setCurrentIndex(index)
        if (!this.playing) {
          this.togglePlaying()
        }
        this.songReady = false
      },
      nextSong () {
        if (!this.songReady) {
          return;
        }
        let index = this.currentIndex + 1
        if (index === this.playList.length) {
          index = 0
        }
        this.setCurrentIndex(index)
        if (!this.playing) {
          this.togglePlaying()
        }
        this.songReady = false
      },
      ready () {
        this.songReady = true
      },
      error () {
        this.songReady = true
      },
      updateTime (e) {
        this.currentTime = e.target.currentTime
      },
      onProgressBarChange (percent) {
        this.$refs.audio.currentTime = this.currentSong.duration * percent
        if (!this.playing) {
          this.togglePlaying()
        }
      },
      format (interval) {
        // 取整
        interval = interval | 0
        const minute = (interval / 60) | 0
        const second = this._pad(interval % 60)
        return `${minute}:${second}`
      },
      changeMode () {
        const mode = (this.mode + 1) % 3
        this.setPlayMode(mode)
        let list = null
        if (mode === playMode.random) {
          list = shuffle(this.sequence)
        } else {
          list = this.sequenceList
        }
        this.resetCurrentIndex(list)
        this.setPlayList(list)
      },
      // 确保切换模式的时候，当前歌曲是不变的
      resetCurrentIndex (list) {
        let index = list.findIndex((item) => {
          return item.id === this.currentSong.id
        })
        this.setCurrentIndex(index)
      },
      getLyric () {
        this.currentSong.getLyric()
          .then((lyric) => {
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
      // 用 0 补位, 补 2 位
      _pad (num, n = 2) {
        let len = num.toString().length
        while (len < n) {
          num = "0" + num
          len++
        }
        return num
      },
      _getPosAndScale () {
        // 缩小后的圆图
        const targetWidth = 40
        // 缩小后的圆图的paddingLeft
        const paddingLeft = 40
        const paddingBottom = 30
        const paddingTop = 80
        const width = window.innerWidth * 0.8
        const scale = targetWidth / width
        // 目标点在大圆图的中间, 小圆图 x 位置为负值
        // 第四象限
        const x = -(window.innerWidth / 2 - paddingLeft)
        const y = window.innerHeight - paddingTop - width / 2 - paddingBottom
        return {
          x,
          y,
          scale
        }
      },
      // 数据通过mutations设置到state上
      ...mapMutations({
        setFullScreen: "SET_FULL_SCREEN",
        setPlayingState: "SET_PLAYING_STATE",
        setCurrentIndex: "SET_CURRENT_INDEX",
        setPlayMode: 'SET_PLAY_MODE',
        setPlayList: 'SET_PLAY_LIST'
      })
    },
    watch: {
      currentSong (newSong, oldSong) {
        if (!newSong.id) {
          return
        }
        if (newSong.id === oldSong.id) {
          return
        }
        // setTimeout: 解决DOM异常, $nextTick替代
        // $nextTick: 在下次DOM更新循环结束之后执行的延迟回调。在修改数据之后立即使用这个方法，获取更新后的DOM。
        clearTimeout(this.timer)
        this.timer = setTimeout(() => {
          this.$refs.audio.play()
          this.getLyric()
        }, 1000)
      },
      playing (newPlaying) {
        const audio = this.$refs.audio
        // setTimeout: 解决DOM异常
        this.$nextTick(() => {
          newPlaying ? audio.play() : audio.pause()
        })
      }
    },
    components: {
      ProgressBar,
      ProgressCircle
    }
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
  @import '../../common/scss/variable.scss';
  @import '../../common/scss/_mixin.scss';
  @import './player.scss';
</style>