<template>
  <transition name="slide">
    <h1>singer-detail</h1>
  </transition>
</template>

<script type="text/ecmascript-6">
  import {mapGetters} from 'vuex'
  import {getSingerDetail} from '../../api/singer'
  import {ERR_OK} from '../../api/config'
  import {createSons} from '../../common/js/song'

  export default {
    data () {
      return {
        songs: []
      }
    },
    computed: {
      ...mapGetters([
        'singer'
      ])
    },
    created () {
      // console.log(this.singer)
      this._getDetail()
    },
    methods: {
      _getDetail () {
        if (!this.singer.id) {
          this.$router.push('/singer/')
        }
        getSingerDetail(this.singer.id)
          .then((res) => {
            if (res.code === ERR_OK) {
              // console.log(res.data.list)
              this.songs = this._normalizeSongs(res.data.list)
              // console.log(this.songs)
            }
          })
      },
      _normalizeSongs (list) {
        // 拿到数据后做标准化处理
        let ret = []
        list.forEach((item) => {
          // ES6 解构赋值
          let {musicData} = item
          if (musicData.songid && musicData.albummid) {
            ret.push(createSons(musicData))
          }
        })
        return ret
      }
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss">
  @import '../../common/scss/variable.scss';
  @import "./singer-detail.scss";
</style>
