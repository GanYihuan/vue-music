<template>
  <!-- static/08-搜索结果 -->
  <scroll
    class="suggest"
    ref="suggest"
    :data="result"
    :pullup="pullup"
    :beforeScroll="beforeScroll"
    @scrollToEnd="searchMore"
    @beforeScroll="listScroll"
  >
    <ul class="suggest-list">
      <li
        class="suggest-item"
        v-for="(item,index) in result"
        :key="index"
        @click="selectItem(item)"
      >
        <div class="icon">
          <i :class="getIconCls(item)"></i>
        </div>
        <div class="name">
          <p class="text" v-html="getDisplayName(item)"></p>
        </div>
      </li>
      <loading v-show="hasMore" title=""></loading>
    </ul>
    <div class="no-result-wrapper" v-show="!hasMore && !result.length">
      <no-result title="抱歉，暂无搜索结果"></no-result>
    </div>
  </scroll>
</template>

<script type="text/ecmascript-6">
import Scroll from 'base/scroll/scroll'
import Loading from 'base/loading/loading'
import Singer from 'common/js/singer'
import NoResult from 'base/no-result/no-result'
import { search } from 'api/search'
import { ERR_OK } from 'api/config'
import { createSong } from 'common/js/song'
import { mapMutations, mapActions } from 'vuex'

const TYPE_SINGER = 'singer'
// perpage: The number of returns per page.
const perpage = 20

export default {
	props: {
		showSinger: {
			type: Boolean,
			default: true
		},
		query: {
			type: String,
			default: ''
		}
	},
	data() {
		return {
			// What page
			page: 1,
			// The drop-down refresh
			pullup: true,
			beforeScroll: true,
			// Data loading finish ？
			hasMore: true,
			result: []
		}
	},
	methods: {
		...mapMutations({
			setSinger: 'SET_SINGER'
		}),
		...mapActions(['insertSong']),
		refresh() {
			this.$refs.suggest.refresh()
		},
		// Request the service end, grab search retrieve data.
		search() {
			// Just search
			this.page = 1
			this.hasMore = true
			// scroll to top
			this.$refs.suggest.scrollTo(0, 0)
			/**
			 * api/search.js
			 * @param query: Retrieve the value
			 * @param page: page index
			 * @param showSinger: Do you want a singer ?
			 * @param perpage: The number of returns per page.
			 */
			search(this.query, this.page, this.showSinger, perpage).then(res => {
				if (res.code === ERR_OK) {
					this.result = this._genResult(res.data)
					// have more data ?
					this._checkMore(res.data)
				}
			})
		},
		// 下拉刷新
		searchMore() {
			if (!this.hasMore) {
				return
			}
			// load next page
			this.page++
			/**
			 * query: retrieve value
			 * page: page index
			 * this.showSinger: Do you want a singer ?
			 * perpage: The number of returns per page.
			 */
			search(this.query, this.page, this.showSinger, perpage).then(res => {
				if (res.code === ERR_OK) {
					// concat: Array splicing, result change, data change, incoming scroll value change, scroll refresh.
					this.result = this.result.concat(this._genResult(res.data))
					this._checkMore(res.data)
				}
			})
		},
		_checkMore(data) {
			const song = data.song
			if (!song.list.length || song.curnum + song.curpage * perpage > song.totalnum) {
				this.hasMore = false
			}
		},
		listScroll() {
			this.$emit('listScroll')
		},
		selectItem(item) {
			if (item.type === TYPE_SINGER) {
				const singer = new Singer({
					id: item.singermid,
					name: item.singername
				})
				this.$router.push({
					path: `/search/${singer.id}`
				})
				// ...mapMutations
				this.setSinger(singer)
			} else {
				// ...mapActions
				this.insertSong(item)
			}
			this.$emit('select', item)
		},
		getDisplayName(item) {
			if (item.type === TYPE_SINGER) {
				return item.singername
			} else {
				return `${item.name}-${item.singer}`
			}
		},
		getIconCls(item) {
			if (item.type === TYPE_SINGER) {
				return 'icon-mine'
			} else {
				return 'icon-music'
			}
		},
		_genResult(data) {
			let ret = []
			// zhida: Do you want a singer?
			// zhida.singerid: singer id
			if (data.zhida && data.zhida.singerid) {
				// type: distinguish between singers and songs.
				ret.push({ ...data.zhida, ...{ type: TYPE_SINGER } })
			}
			if (data.song) {
				ret = ret.concat(this._normalizeSongs(data.song.list))
			}
			return ret
		},
		_normalizeSongs(list) {
			let ret = []
			list.forEach(musicData => {
				if (musicData.songid && musicData.albummid) {
					// Convert to song instance.
					ret.push(createSong(musicData))
				}
			})
			return ret
		}
	},
	watch: {
		query(newQuery) {
			// request server (api/search.js)
			this.search(newQuery)
		}
	},
	components: {
		Scroll,
		Loading,
		NoResult,
		Singer
	}
}
</script>

<style scoped lang="scss" rel="stylesheet/scss">
@import '~common/scss/variable.scss';
@import '~common/scss/_mixin.scss';
@import './suggest.scss';
</style>
