<template>
  <!-- static/03-歌手详情页.png/歌手详情页 -->
  <transition name="slide">
    <music-list 
      :songs="songs"
      :title="title"
      :bg-image="bgImage"
    >
    </music-list>
  </transition>
</template>

<script type="text/ecmascript-6">
// mapGetters: get vuex store, vuex 语法糖
import { mapGetters } from 'vuex'
import { getSingerDetail } from 'api/singer'
import { ERR_OK } from 'api/config'
import { createSong } from 'common/js/song'
import MusicList from 'components/music-list/music-list'

export default {
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
		// getters, get (vuex/getters.js) data
		...mapGetters(['singer'])
	},
	created() {
		this._getDetail()
	},
	methods: {
		_getDetail() {
			if (!this.singer.id) {
				this.$router.push('/singer/')
			}
			getSingerDetail(this.singer.id).then(res => {
				if (res.code === ERR_OK) {
					this.songs = this._normalizeSongs(res.data.list)
					// console.log(this.songs)
				}
			})
		},
		_normalizeSongs(list) {
			let ret = []
			list.forEach(item => {
				let { musicData } = item
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
@import '../../common/scss/variable.scss';
@import './singer-detail.scss';
</style>
