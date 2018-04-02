<template>
  <!-- 04/音乐播放界面 -->
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
          <!-- :data="currentLyric && currentLyric.lines": currentLyric!=null -->
          <scroll class="middle-r" ref="lyricList" :data="currentLyric && currentLyric.lines">
            <div class="lyric-wrapper">
              <div v-if="currentLyric">
                <p
                  ref="lyricLine"
                  class="text"
                  :class="{'current': currentLineNum ===index}"
                  v-for="(line,index) in currentLyric.lines"
                  :key="index"
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
              <i @click="prev" class="icon-prev"></i>
            </div>
            <div class="icon i-center" :class="disableCls">
              <i @click="togglePlaying" :class="playIcon"></i>
            </div>
            <div class="icon i-right" :class="disableCls">
              <i @click="next" class="icon-next"></i>
            </div>
            <div class="icon i-right">
              <i @click="toggleFavorite(currentSong)" class="icon" :class="getFavoriteIcon(currentSong)"></i>
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
        <div class="control">
          <progress-circle :radius="radius" :percent="percent">
            <i @click.stop="togglePlaying" class="icon-mini" :class="miniIcon"></i>
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
  import animations from 'create-keyframe-animation'
  import { prefixStyle } from 'common/js/dom'
  import ProgressBar from 'base/progress-bar/progress-bar'
  import ProgressCircle from 'base/progress-circle/progress-circle'
  import { playMode } from 'common/js/config'
  // 视频作者编写, 歌词解析, 每执行到时间点时都执行回调函数
  import Lyric from 'lyric-parser'
  import Scroll from 'base/scroll/scroll'
  import { playerMixin } from 'common/js/mixin'
  import Playlist from 'components/playlist/playlist'

  const transform = prefixStyle('transform')
  const transitionDuration = prefixStyle('transitionDuration')

  export default {
    mixins: [playerMixin],
    data () {
      return {
        songReady: false,
        currentTime: 0,
        // 环形进度条大小
        radius: 32,
        currentLyric: null,
        // 当前歌词所在行,用来高亮
        currentLineNum: 0,
        // 唱片碟界面与歌词界面
        currentShow: 'cd',
        // playingLyric: 唱碟下面显示的一行歌词
        playingLyric: ''
      }
    },
    computed: {
      cdCls () {
        return this.playing ? 'play' : 'play pause'
      },
      playIcon () {
        return this.playing ? 'icon-pause' : 'icon-play'
      },
      miniIcon () {
        return this.playing ? 'icon-pause-mini' : 'icon-play-mini'
      },
      disableCls () {
        return this.songReady ? '' : 'disable'
      },
      // 进度条播放的比例
      percent () {
        return this.currentTime / this.currentSong.duration
      },
      // vuex (store/getter.js)
      ...mapGetters(['currentIndex', 'fullScreen', 'playing'])
    },
    created () {
      this.touch = {}
    },
    methods: {
      // 唱片界面缩小到底部
      back () {
        // vuex (store/mutations.js)
        this.setFullScreen(false)
      },
      // 底部界面放大到唱片界面
      open () {
        // vuex (store/mutations.js)
        this.setFullScreen(true)
      },
      // transition animate
      // create-keyframe-animation
      enter (el, done) {
        const {x, y, scale} = this._getPosAndScale()
        let animation = {
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
      afterEnter () {
        animations.unregisterAnimation('move')
        this.$refs.cdWrapper.style.animation = ''
      },
      // 监听事件
      leave (el, done) {
        this.$refs.cdWrapper.style.transition = 'all 0.4s'
        const {x, y, scale} = this._getPosAndScale()
        this.$refs.cdWrapper.style[transform] = `translate3d(${x}px,${y}px,0) scale(${scale})`
        this.$refs.cdWrapper.addEventListener('transitionend', done)
      },
      afterLeave () {
        this.$refs.cdWrapper.style.transition = ''
        this.$refs.cdWrapper.style[transform] = ''
      },
      togglePlaying () {
        if (!this.songReady) {
          return
        }
        // vuex (store/mutation.js)
        this.setPlayingState(!this.playing)
        // 当歌词滚动时才能播放,防止停止播放时歌词还在滚动
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
        // 进入循环播放时，歌曲一开始就要求歌词位于最开始
        if (this.currentLyric) {
          // 歌曲跳到最开始
          this.currentLyric.seek(0)
        }
      },
      // 歌曲后退
      next () {
        if (!this.songReady) {
          return
        }
        if (this.playlist.length === 1) {
          this.loop()
          // 优化: 3 防止播放控件无法触发, return不用调用songReady = false
          return
        } else {
          let index = this.currentIndex + 1
          if (index === this.playlist.length) {
            index = 0
          }
          // vuex (store/mutation)
          this.setCurrentIndex(index)
          if (!this.playing) {
            this.togglePlaying()
          }
        }
        this.songReady = false
      },
      // 歌曲前进
      prev () {
        if (!this.songReady) {
          return
        }
        if (this.playlist.length === 1) {
          this.loop()
          // 优化: 3 防止播放控件无法触发, return不用调用songReady = false
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
      ready () {
        // audio, 防止极限点击操作报错
        this.songReady = true
        // vuex (store/mutation)
        // 保存播放历史记录
        this.savePlayHistory(this.currentSong)
      },
      error () {
        this.songReady = true
      },
      updateTime (e) {
        this.currentTime = e.target.currentTime
      },
      format (interval) {
        // | 0: 由整数向下取整(Math.floor)
        interval = interval | 0
        const minute = (interval / 60) | 0
        const second = this._pad(interval % 60)
        return `${minute}:${second}`
      },
      // 进度条进度改变
      onProgressBarChange (percent) {
        const currentTime = this.currentSong.duration * percent
        this.$refs.audio.currentTime = currentTime
        if (!this.playing) {
          this.togglePlaying()
        }
        if (this.currentLyric) {
          // 歌词追随进度条滚动而一一对应
          this.currentLyric.seek(currentTime * 1000)
        }
      },
      getLyric () {
        this.currentSong
          .getLyric()
          .then((lyric) => {
            // 优化: 2 防止快速切换导致歌词无法匹配
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
      // handleLyric: 歌词改变的时候调用
      // lineNum: 当前歌词所在行,高亮
      // txt: 歌词文案
      handleLyric ({lineNum, txt}) {
        this.currentLineNum = lineNum
        if (lineNum > 5) {
          // 保证高亮歌词在中间, 当前歌词，往上偏移5行
          let lineEl = this.$refs.lyricLine[lineNum - 5]
          this.$refs.lyricList.scrollToElement(lineEl, 1000)
        } else {
          // 前五行歌词不发生滚动, 位于顶部
          this.$refs.lyricList.scrollTo(0, 0, 1000)
        }
        // playingLyric: 唱碟下面显示的一行歌词
        this.playingLyric = txt
      },
      showPlaylist () {
        this.$refs.playlist.show()
      },
      // 点击唱片部分
      middleTouchStart (e) {
        this.touch.initiated = true
        // 用来判断是否是一次移动
        this.touch.moved = false
        // 手指点击
        const touch = e.touches[0]
        // 手指点击位置x
        this.touch.startX = touch.pageX
        // 手指点击位置y
        this.touch.startY = touch.pageY
      },
      middleTouchMove (e) {
        if (!this.touch.initiated) {
          return
        }
        const touch = e.touches[0]
        // 移动的位置
        const deltaX = touch.pageX - this.touch.startX
        const deltaY = touch.pageY - this.touch.startY
        // 是否发生横向滚动切换唱片界面和歌词界面，取决于横向滚动比纵向滚动多
        if (Math.abs(deltaY) > Math.abs(deltaX)) {
          return
        }
        if (!this.touch.moved) {
          this.touch.moved = true
        }
        // 歌词界面与唱片界面，二选一
        const left = this.currentShow === 'cd' ? 0 : -window.innerWidth
        // 歌词露出的宽带, 左滑动取负值
        // 最小值-window.innerWidth, 最大值0
        const offsetWidth = Math.min(0, Math.max(-window.innerWidth, left + deltaX))
        this.touch.percent = Math.abs(offsetWidth / window.innerWidth)
        // lyricList: vue组件, $el来访问dom
        this.$refs.lyricList.$el.style[transform] = `translate3d(${offsetWidth}px,0,0)`
        this.$refs.lyricList.$el.style[transitionDuration] = 0
        this.$refs.middleL.style.opacity = 1 - this.touch.percent
        this.$refs.middleL.style[transitionDuration] = 0
      },
      middleTouchEnd () {
        if (!this.touch.moved) {
          return
        }
        let offsetWidth
        let opacity
        if (this.currentShow === 'cd') {
          // 从右向左滑动
          if (this.touch.percent > 0.1) {
            offsetWidth = -window.innerWidth
            opacity = 0
            this.currentShow = 'lyric'
          } else {
            offsetWidth = 0
            opacity = 1
          }
        } else {
          // 从左向右滑动
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
      // 用 0 补位(补 2 位)
      _pad (num, n = 2) {
        let len = num.toString().length
        while (len < n) {
          num = '0' + num
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
        // 大唱片圆图大小
        const width = window.innerWidth * 0.8
        // 大唱片缩小到小唱片的比例
        const scale = targetWidth / width
        // 目标点(x,y)位于大圆图的中间
        // 第四象限,小圆图x位置到大圆x位置取负方向
        const x = -(window.innerWidth / 2 - paddingLeft)
        const y = window.innerHeight - paddingTop - width / 2 - paddingBottom
        return {x, y, scale}
      },
      // 数据通过mutations设置到state上
      ...mapMutations({
        setFullScreen: 'SET_FULL_SCREEN'
      }),
      ...mapActions(['savePlayHistory'])
    },
    watch: {
      // 监听,当currentSong变化时调用
      currentSong (newSong, oldSong) {
        // 只有一首歌曲的时候
        if (!newSong.id) {
          return
        }
        // id不变,则什么都不做
        if (newSong.id === oldSong.id) {
          return
        }
        // currentLyric里面有计时器，当切下一首歌时，该计时器会代入下一首歌
        if (this.currentLyric) {
          // 先停止上首歌的计时器
          this.currentLyric.stop()
          this.currentTime = 0
          this.playingLyric = ''
          this.currentLineNum = 0
        }
        // setTimeout: 解决DOM异常
        // $nextTick: 在下次DOM更新循环结束之后执行的延迟回调。在修改数据之后立即使用这个方法，获取更新后的DOM。
        // setTimeout: 保证手机从后台切到前台js执行能正常播放
        // 优化: 1
        clearTimeout(this.timer)
        this.timer = setTimeout(() => {
          // 同步方法
          this.$refs.audio.play()
          // 异步方法
          // 防止调用时机出错, 在getLyric()里面写 优化: 2
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
      Scroll,
      Playlist
    }
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
  @import '../../common/scss/variable.scss';
  @import '../../common/scss/_mixin.scss';
  @import './player.scss';
</style>
