<template>
  <!-- ![hot song list interface](https://i.loli.net/2019/04/10/5cadb0eae5f9e.png) -->
  <transition name="slide">
    <music-list
      :title="title"
      :bg-image="bgImage"
      :songs="songs"
    >
    </music-list>
  </transition>
</template>

<script type="text/ecmascript-6">
import MusicList from 'components/music-list/music-list'
import { getSongList } from 'api/recommend'
import { ERR_OK } from 'api/config'
import { mapGetters } from 'vuex'
import { createSong } from 'common/js/song'

export default {
  components: {
    MusicList
  },
  data() {
    return {
      songs: []
    }
  },
  created() {
    this._getSongList()
  },
  computed: {
    ...mapGetters(['disc']),
    title() {
      return this.disc.dissname
    },
    bgImage() {
      return this.disc.imgurl
    }
  },
  methods: {
    _getSongList() {
      if (!this.disc.dissid) {
        this.$router.push('/recommend')
        return
      }
      getSongList(this.disc.dissid)
        .then(res => {
          if (res.code === ERR_OK) {
            this.songs = this._normalizeSongs(res.cdlist[0].songlist)
          }
        })
    },
    _normalizeSongs(list) {
      const ret = []
      list.forEach(musicData => {
        if (musicData.songid && musicData.albummid) {
          ret.push(createSong(musicData))
        }
      })
      return ret
    }
  }
}
</script>

<style scoped lang="scss" rel="stylesheet/scss">
@import './disc.scss';
</style>
