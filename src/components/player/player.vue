<template>
  <div class="player" v-show="playlist.length > 0">
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
        <div
          class="middle"
          @touchstart.prevent="middleTouchStart"
          @touchmove.prevent="middleTouchMove"
          @touchend="middleTouchEnd"
        >
          <div class="middle-l" ref="middleL">
            <div class="cd-wrapper" ref="cdWrapper">
              <div class="cd" :class="cdCls">
                <img class="image" :src="currentSong.image">
              </div>
            </div>
            <div class="playing-lyric-wrapper">
              <div class="playing-lyric">{{playingLyric}}</div>
            </div>
          </div>
          <!-- currentLyric != null -->
          <scroll class="middle-r" ref="lyricList" :data="currentLyric && currentLyric.lines">
            <div class="lyric-wrapper">
              <div v-if="currentLyric">
                <p
                  ref="lyricLine"
                  class="text"
                  :class="{'current': currentLineNum === index}"
                  v-for="(line,index) in currentLyric.lines"
                  :key="index"
                >{{line.txt}}</p>
              </div>
            </div>
          </scroll>
        </div>
        <div class="bottom">
          <div class="dot-wrapper">
            <span class="dot" :class="{'active':currentShow === 'cd'}"></span>
            <span class="dot" :class="{'active':currentShow === 'lyric'}"></span>
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
  import Scroll from 'base/scroll/scroll'

  const transform = prefixStyle('transform')
  const transitionDuration = prefixStyle('transitionDuration')

  export default {
    data () {
      return {
        songReady: false,
        currentTime: 0,
        // 环形进度条大小
        radius: 32,
        currentLyric: null,
        // 当前歌词所在行,高亮
        currentLineNum: 0,
        // 唱片碟界面与歌词界面
        currentShow: 'cd',
        playingLyric: ''
      }
    },
    computed: {
      // 传入 vuex 的 state
      ...mapGetters([
        "fullScreen",
        "playlist",
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
      // 进度条播放的比例
      percent () {
        return this.currentTime / this.currentSong.duration
      }
    },
    created () {
      this.touch = {}
    },
    methods: {
      // 唱片界面缩小到底部
      back () {
        // setFullScreen: mapMutations
        this.setFullScreen(false)
      },
      // 底部界面放大到唱片界面
      open () {
        // setFullScreen: mapMutations
        this.setFullScreen(true)
      },
      // animate
      // create-keyframe-animation
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
        this.$refs.cdWrapper.style[transform] = `translate3d(${x}px, ${y}px, 0) scale(${scale})`
        // 监听事件
        this.$refs.cdWrapper.addEventListener("transitionend", done)
      },
      afterLeave () {
        this.$refs.cdWrapper.style.transition = ""
        this.$refs.cdWrapper.style[transform] = ""
      },
      togglePlaying () {
        if (!this.songReady) {
          return
        }
        // setPlayingState: mutation
        this.setPlayingState(!this.playing)
        if (this.currentLyric) {
          this.currentLyric.togglePlay()
        }
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
          // 歌曲跳到最开始
          this.currentLyric.seek(0)
        }
      },
      nextSong () {
        if (!this.songReady) {
          return
        }
        if (this.playlist.length === 1) {
          this.loop()
          return
        } else {
          let index = this.currentIndex + 1
          if (index === this.playlist.length) {
            index = 0
          }
          // setCurrentIndex: mutation
          this.setCurrentIndex(index)
          if (!this.playing) {
            this.togglePlaying()
          }
        }
        this.songReady = false
      },
      prevSong () {
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
      // audio,防止极限点击操作报错
      ready () {
        this.songReady = true
      },
      // audio,防止极限点击操作报错
      error () {
        this.songReady = true
      },
      updateTime (e) {
        this.currentTime = e.target.currentTime
      },
      // 进度条进度改变
      onProgressBarChange (percent) {
        const currentTime = this.currentSong.duration * percent
        this.$refs.audio.currentTime = currentTime
        if (!this.playing) {
          this.togglePlaying()
        }
        if (this.currentLyric) {
          // 歌词追随滚动条滚动
          this.currentLyric.seek(currentTime * 1000)
        }
      },
      format (interval) {
        // |: 由整数向下取整(Math.floor)
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
            // 不正常时,歌词不显示
            // playingLyric: 唱碟下面的歌词
            this.playingLyric = ''
            this.currentLineNum = 0
          })
      },
      // lineNum: 当前歌词所在行,高亮
      // txt: 歌词文案
      handleLyric ({lineNum, txt}) {
        this.currentLineNum = lineNum
        if (lineNum > 5) {
          let lineEl = this.$refs.lyricLine[lineNum - 5]
          this.$refs.lyricList.scrollToElement(lineEl, 1000)
        } else {
          // 位于顶部
          this.$refs.lyricList.scrollTo(0, 0, 1000)
        }
        // playingLyric: 唱碟下面的歌词
        this.playingLyric = txt
      },
      middleTouchStart (e) {
        this.touch.initiated = true
        // 用来判断是否是一次移动
        this.touch.moved = false
        const touch = e.touches[0]
        this.touch.startX = touch.pageX
        this.touch.startY = touch.pageY
      },
      middleTouchMove (e) {
        if (!this.touch.initiated) {
          return
        }
        const touch = e.touches[0]
        const deltaX = touch.pageX - this.touch.startX
        const deltaY = touch.pageY - this.touch.startY
        // 只支持横向滚动
        if (Math.abs(deltaY) > Math.abs(deltaX)) {
          return
        }
        if (!this.touch.moved) {
          this.touch.moved = true
        }
        const left = this.currentShow === 'cd' ? 0 : -window.innerWidth
        const offsetWidth = Math.min(0, Math.max(-window.innerWidth, left + deltaX))
        this.touch.percent = Math.abs(offsetWidth / window.innerWidth)
        // lyricList: vue组件, $el来访问
        this.$refs.lyricList.$el.style["transform"] = `translate3d(${offsetWidth}px,0,0)`
        this.$refs.lyricList.$el.style["transitionDuration"] = 0
        this.$refs.middleL.style.opacity = 1 - this.touch.percent
        this.$refs.middleL.style["transitionDuration"] = 0
      },
      middleTouchEnd () {
        if (!this.touch.moved) {
          return
        }
        let offsetWidth
        let opacity
        if (this.currentShow === 'cd') {
          if (this.touch.percent > 0.1) {
            offsetWidth = -window.innerWidth
            opacity = 0
            this.currentShow = 'lyric'
          } else {
            offsetWidth = 0
            opacity = 1
          }
        } else {
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
        this.$refs.lyricList.$el.style["transform"] = `translate3d(${offsetWidth}px,0,0)`
        this.$refs.lyricList.$el.style["transitionDuration"] = `${time}ms`
        this.$refs.middleL.style.opacity = opacity
        this.$refs.middleL.style["transitionDuration"] = `${time}ms`
        this.touch.initiated = false
      },
      // 用 0 补位(补 2 位)
      _pad (num, n = 2) {
        let len = num.toString().length
        while (len < n) {
          num = "0" + num
          len++
        }
        return num
      },
      _getPosAndScale () {
        // 缩小后的唱片圆图大小
        const targetWidth = 40
        // 缩小后的唱片圆图paddingLeft
        const paddingLeft = 40
        // 缩小后的唱片圆图paddingBottom
        const paddingBottom = 30
        // 大唱片距离容器顶部paddingTop
        const paddingTop = 80
        const width = window.innerWidth * 0.8
        // 大唱片缩小到小唱片的比例
        const scale = targetWidth / width
        // 目标点(x,y)位于大圆图的中间
        // 第四象限,小圆图x位置为负方向
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
      // 监听,当currentSong变化时调用
      currentSong (newSong, oldSong) {
        if (!newSong.id) {
          return
        }
        if (newSong.id === oldSong.id) {
          return
        }
        if (this.currentLyric) {
          this.currentLyric.stop()
          this.currentTime = 0
          this.playingLyric = ''
          this.currentLineNum = 0
        }
        // setTimeout: 解决DOM异常
        // $nextTick: 在下次DOM更新循环结束之后执行的延迟回调。在修改数据之后立即使用这个方法，获取更新后的DOM。
        // setTimeout: 保证手机从后台切到前台js执行能正常播放
        clearTimeout(this.timer)
        this.timer = setTimeout(() => {
          this.$refs.audio.play()
          this.getLyric()
        }, 1000)
      },
      // 监听playing(state数据), 真正控制播放的是audio播放器
      playing (newPlaying) {
        const audio = this.$refs.audio
        // $nextTick: 在下次DOM更新循环结束之后执行的延迟回调。在修改数据之后立即使用这个方法，获取更新后的DOM。
        this.$nextTick(() => {
          newPlaying ? audio.play() : audio.pause()
        })
      },
      fullScreen (newVal) {
        if (newVal) {
          setTimeout(() => {
            this.$refs.lyricList.refresh()
          }, 20)
        }
      }
    },
    components: {
      ProgressBar,
      ProgressCircle,
      Scroll
    }
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
  @import '../../common/scss/variable.scss';
  @import '../../common/scss/_mixin.scss';
  @import './player.scss';
</style>