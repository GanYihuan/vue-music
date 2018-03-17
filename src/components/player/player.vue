<template>
  <div class="player" v-show="playList.length > 0">
    <div class="normal-player" v-show="fullScreen">
      player
    </div>
    <div class="mini-player" v-show="!fullScreen">

    </div>
  </div>
</template>

<script>
  import {mapGetters, mapMutations} from "vuex"

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
    }
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
  @import '../../common/scss/variable.scss';
  @import '../../common/scss/_mixin.scss';
  @import './player.scss';
</style>