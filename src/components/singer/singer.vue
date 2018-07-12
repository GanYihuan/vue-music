<template>
  <!-- static/02-歌手界面.png -->
  <div class="singer" ref="singer">
    <list-view 
      ref="list"
      :data="singers"
      @select="selectSinger"
    >
    </list-view>
    <!-- singer-detail.vue render here -->
    <router-view></router-view>
  </div>
</template>

<script type="text/ecmascript-6">
/* vuex 语法糖 */
import { mapMutations } from 'vuex'
import { getSingerList } from 'api/singer'
import { ERR_OK } from 'api/config'
import { playlistMixin } from 'common/js/mixin'
import ListView from 'base/listview/listview'
import Singer from 'common/js/singer'

const HOT_SINGER_LEN = 10
const HOT_NAME = '热门'

export default {
	components: {
		ListView
	},
	/* insert minxin.js */
	mixins: [playlistMixin],
	/* 存储 back-end 数据 */
	data() {
		return {
			singers: []
		}
	},
	/* 获取 back-end 数据, created 数据不会被监控, data, props 里面的数据会被监控 */
	created() {
		/* 获取(singer data) */
		this._getSingerList()
	},
	methods: {
		/* If there is a mini player, the singer list bottom will add height to display it. */
		handlePlaylist(playlist) {
			const bottom = playlist.length > 0 ? '60px' : ''
			this.$refs.singer.style.bottom = bottom
			this.$refs.list.refresh()
		},
		selectSinger(singer) {
			this.$router.push({
				path: `/singer/${singer.id}`
			})
			/* this.setSinger: ...mapMutations */
			/* 存数据到vuex */
			this.setSinger(singer)
		},
		_getSingerList() {
			getSingerList().then(res => {
				if (res.code === ERR_OK) {
          /* https://c.y.qq.com/v8/fcg-bin/v8.fcg?g_tk=5381&inCharset=utf-8&outCharset=utf-8&notice=0&format=jsonp&channel=singer&page=list&key=all_all_all&pagesize=100&pagenum=1&hostUin=0&needNewCode=0&platform=yqq&jsonpCallback=__jp0 */ 
					this.singers = this._normalizeSinger(res.data.list)
          // console.log(this._normalizeSinger(res.data.list))
        }
			})
    },
    /* 规范化singer数据 */ 
		_normalizeSinger(list) {
			/* 数据结构定义 */
			let map = {
				hot: {
					title: HOT_NAME,
					items: []
				}
			}
			list.forEach((item, index) => {
				/* 前10条数据, 包括 '热门' */
				if (index < HOT_SINGER_LEN) {
					map.hot.items.push(
						new Singer({
							name: item.Fsinger_name,
							id: item.Fsinger_mid
						})
					)
				}
        /* 前10条数据之后 */
        /* https://c.y.qq.com/v8/fcg-bin/v8.fcg?g_tk=5381&inCharset=utf-8&outCharset=utf-8&notice=0&format=jsonp&channel=singer&page=list&key=all_all_all&pagesize=100&pagenum=1&hostUin=0&needNewCode=0&platform=yqq&jsonpCallback=__jp0 */ 
        /* item.Findex: 'A', 'B' 这些字母 */ 
				const key = item.Findex
				/* 数据结构定义 */
				if (!map[key]) {
					map[key] = {
						title: key,
						items: []
					}
				}
				map[key].items.push(
					new Singer({
						name: item.Fsinger_name,
						id: item.Fsinger_mid
					})
				)
			})
			/* 处理 map 得到有序列表 */
			let ret = []
			let hot = []
			for (let key in map) {
				let val = map[key]
				if (val.title.match(/[a-zA-Z]/)) {
					ret.push(val)
				} else if (val.title === HOT_NAME) {
					hot.push(val)
				}
      }
      /* 升序排序 */
			ret.sort((a, b) => {
				return a.title.charCodeAt(0) - b.title.charCodeAt(0)
			})
			return hot.concat(ret)
		},
		/* 调用 vuex/mutations */
		...mapMutations({
			setSinger: 'SET_SINGER'
		})
	}
}
</script>

<style scoped lang="scss" rel="stylesheet/scss">
@import './singer.scss';
</style>
