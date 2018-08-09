<template>
  <!-- static/05-热门歌单.png -->
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
	computed: {
    /* store/getter.js */
		...mapGetters(['disc']),
		title() {
      /* ...mapGetters */
			return this.disc.dissname
		},
		bgImage() {
			/* ...mapGetters */
			return this.disc.imgurl
		}
  },
  /* data not monitor, data & props will monitor, get back-end data */
	created() {
		this._getSongList()
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
        }
      )
		},
		_normalizeSongs(list) {
			let ret = []
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
