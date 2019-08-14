<!--
 * @Description:
 * @version:
 * @Author: GanEhank
 * @Date: 2019-08-04 02:31:14
 * @LastEditors: GanEhank
 * @LastEditTime: 2019-08-14 12:14:46
 -->
<template>
  <transition name="slide">
    <music-list :songs="songs" :title="title" :bg-image="bgImage"></music-list>
  </transition>
</template>

<script>
import { mapGetters } from 'vuex'
import { getSingerDetail, getMusic } from '@/api/singer'
import { ERR_OK } from '@/api/config'
import { createSong } from '@/common/js/song'
import MusicList from '@/components/music-list/music-list'

export default {
  components: {
    MusicList
  },
  data() {
    return {
      songs: []
    }
  },
  computed: {
    title() {
      return this.singer.name
    },
    bgImage() {
      return this.singer.avatar
    },
    ...mapGetters(['singer'])
  },
  created() {
    this._getDetail()
  },
  methods: {
    _getDetail() {
      if (!this.singer.id) {
        this.$router.push('/singer')
        return
      }
      getSingerDetail(this.singer.id).then(res => {
        if (res.code === ERR_OK) {
          this.songs = this._normallizeSongs(res.data.list)
        }
      })
    },
    _normallizeSongs(list) {
      const ret = [] // 返回值
      list.forEach(item => {
        const { musicData } = item // 得到music对象
        if (musicData.songid && musicData.albummid) {
          getMusic(musicData.songmid).then(res => {
            if (res.code === ERR_OK) {
              const svkey = res.data.items
              const songVkey = svkey[0].vkey
              const newSong = createSong(musicData, songVkey)
              ret.push(newSong)
            }
          })
        }
      })
      return ret
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '../../common/stylus/variable';

.slide-enter-active, .slide-leave-active {
  transition: all 0.3s;
}

.slide-enter, .slide-leave-to {
  transform: translate3d(100%, 0, 0); // 100% 完全移动到屏幕右侧 动画开始后向左滑入
}
</style>
