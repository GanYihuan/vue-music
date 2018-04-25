<template>
  <!-- static/03.png/歌手详情页 -->
  <!-- singer-detail handle data, music-list render 歌手详情页-->
  <transition name="slide">
    <music-list :songs="songs" :title="title" :bg-image="bgImage"></music-list>
  </transition>
</template>

<script type="text/ecmascript-6">
  // import store/getters Syntactic sugar
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
      // getters, get (vuex/state.js) data
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
      // handle data
      _normalizeSongs (list) {
        // Do standardized processing when you get the data.
        let ret = []
        list.forEach((item) => {
          // ES6 Structure assignment
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
