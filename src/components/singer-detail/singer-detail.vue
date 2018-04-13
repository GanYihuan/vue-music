<template>
  <!-- static/03.png/歌手详情页 -->
  <!-- singer-detail处理歌手详情页数据, music-list渲染歌手详情页-->
  <transition name="slide">
    <music-list :songs="songs" :title="title" :bg-image="bgImage"></music-list>
  </transition>
</template>

<script type="text/ecmascript-6">
  // 导入store/getters 的语法糖
  import { mapGetters } from 'vuex'
  import { getSingerDetail } from 'api/singer'
  import { ERR_OK } from 'api/config'
  import { createSong } from 'common/js/song'
  import MusicList from 'components/music-list/music-list'

  export default {
    data () {
      return {
        songs: []
      }
    },
    computed: {
      title () {
        return this.singer.name
      },
      bgImage () {
        return this.singer.avatar
      },
      // 对应getters, 获取state数据
      ...mapGetters([
        'singer'
      ])
    },
    created () {
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
            }
          })
      },
      // 处理数据
      _normalizeSongs (list) {
        // 拿到数据后做标准化处理
        let ret = []
        list.forEach((item) => {
          // ES6 结构赋值
          let {musicData} = item
          if (musicData.songid && musicData.albummid) {
            // common/song.js/createSong
            ret.push(createSong(musicData))
          }
        })
        return ret
      }
    },
    components: {
      MusicList
    }
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
  @import '../../common/scss/variable.scss';
  @import "./singer-detail.scss";
</style>
