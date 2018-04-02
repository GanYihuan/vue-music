<template>
  <!-- 07/排行榜详情界面 -->
  <transition name="slide">
    <music-list
      :rank="rank"
      :title="title"
      :bg-image="bgImage"
      :songs="songs"
    >
    </music-list>
  </transition>
</template>

<script type="text/ecmascript-6">
  import MusicList from 'components/music-list/music-list'
  import { getMusicList } from 'api/rank'
  import { ERR_OK } from 'api/config'
  import { mapGetters } from 'vuex'
  import { createSong } from 'common/js/song'

  export default {
    computed: {
      title () {
        return this.topList.topTitl
      },
      bgImage () {
        if (this.songs.length) {
          return this.songs[0].image
        }
        return ''
      },
      // vuex: state
      ...mapGetters([
        'topList'
      ])
    },
    data () {
      return {
        songs: [],
        rank: true
      }
    },
    created () {
      this._getMusicList()
    },
    methods: {
      _getMusicList () {
        if (!this.topList.id) {
          this.$router.push('/rank')
          return
        }
        getMusicList(this.topList.id)
          .then(res => {
            if (res.code === ERR_OK) {
              this.songs = this._normalizeSongs(res.songlist)
            }
          })
      },
      // 处理数据
      _normalizeSongs (list) {
        let ret = []
        list.forEach(item => {
          const musicData = item.data
          if (musicData.songid && musicData.albummid) {
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
  @import "./top-list.scss";
</style>
