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
              <div class="cd">
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
            <span class="time time-l"></span>
            <div class="progress-bar-wrapper">
              <!--<progress-bar :percent="percent" ></progress-bar>-->
            </div>
            <span class="time time-r"></span>
          </div>
          <div class="operators">
            <div class="icon i-left">
              <i class="icon-sequence"></i>
            </div>
            <div class="icon i-left">
              <i class="icon-prev"></i>
            </div>
            <div class="icon i-center">
              <i></i>
            </div>
            <div class="icon i-right">
              <i class="icon-next"></i>
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
          <img width="40" height="40" :src="currentSong.image">
        </div>
        <div class="text">
          <h2 class="name" v-html="currentSong.name"></h2>
          <p class="desc" v-html="currentSong.singer"></p>
        </div>
        <div class="control">
          <i></i>
        </div>
        <div class="control">
          <i class="icon-playlist"></i>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
  import {mapGetters, mapMutations} from "vuex"
  import animations from "create-keyframe-animation";
  import {prefixStyle} from 'common/js/dom'

  const transform = prefixStyle('transform')

  export default {
    computed: {
      // 传入 vuex 的 state
      ...mapGetters([
        "fullScreen",
        "playList",
        "currentSong",
        "playing",
        "currentIndex"
      ])
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
      ...mapMutations({
        setFullScreen: "SET_FULL_SCREEN",
        setPlayingState: "SET_PLAYING_STATE",
        setCurrentIndex: "SET_CURRENT_INDEX"
      })
    }
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
  @import '../../common/scss/variable.scss';
  @import '../../common/scss/_mixin.scss';
  @import './player.scss';
</style>