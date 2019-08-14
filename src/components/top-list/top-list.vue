<!--
 * @Description: 排行榜详情页
 * @version:
 * @Author: GanEhank
 * @Date: 2019-08-04 02:31:14
 * @LastEditors: GanEhank
 * @LastEditTime: 2019-08-14 12:19:11
 -->
<template>
  <transition name="slide">
    <music-list :title="title" :bg-image="bgImage" :songs="songs" :rank="rank"></music-list>
  </transition>
</template>

<script>
import { mapGetters } from 'vuex'
import { getMusicList } from '@/api/rank'
import { ERR_OK } from '@/api/config'
import { getMusic } from '@/api/singer'
import { createSong } from '@/common/js/song'
import MusicList from '@/components/music-list/music-list'

export default {
  components: {
    MusicList
  },
  computed: {
    title() {
      return this.topList.topTitle
    },
    bgImage() {
      if (this.songs.length) {
        return this.songs[0].image
      }
      return this.topList.picUrl
    },
    ...mapGetters(['topList'])
  },
  data() {
    return {
      songs: [],
      rank: true
    }
  },
  created() {
    this._getMusicList()
  },
  methods: {
    _getMusicList() {
      if (!this.topList.id) {
        this.$router.push('/rank')
        return
      }
      getMusicList(this.topList.id).then(res => {
        if (res.code === ERR_OK) {
          this.songs = this._normalizeSongs(res.songlist)
        }
      })
    },
    _normalizeSongs(list) {
      const ret = []
      list.forEach(item => {
        const musicData = item.data
        if (musicData.songid && musicData.albumid) {
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

.top-list {
  position: fixed;
  z-index: 100; // 子路由将之前的页面层盖住
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: $color-background;
}

.slide-enter-active, .slide-leave-active {
  transition: all 0.3s;
}

.slide-enter, .slide-leave-to {
  transform: translate3d(100%, 0, 0); // 100% 完全移动到屏幕右侧 动画开始后向左滑入
}
</style>

