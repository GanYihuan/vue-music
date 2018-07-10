<template>
  <!-- static/01-推荐界面 -->
  <div class="recommend" ref="recommend">
    <!-- :data="discList": Prevents async loading slow -->
    <scroll 
      class="recommend-content"
      ref="scroll"
      :data="discList"
    >
      <div>
        <!-- v-if="recommends.length": Prevent async loading slow -->
        <div 
          class="slider-wrapper"
          ref="sliderWrapper"
          v-if="recommends.length"
        >
          <slider>
            <div v-for="(item,index) in recommends" :key="index">
              <!-- https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg -->
              <a :href="item.linkUrl">
                <!-- class="needsclick" fastclick Don't intercept the click process -->
                <!-- @load="loadImage" Prevent async loading slow -->
                <img class="needsclick" :src="item.picUrl" @load="loadImage"/>
              </a>
            </div>
          </slider>
        </div>
        <div class="recommend-list">
          <h1 class="list-title">热门歌单推荐</h1>
          <ul>
            <li
              class="item"
              v-for="(item,index) in discList"
              :key="index"
              @click="selectItem(item)"
            >
              <div class="icon">
                <!-- v-lazy: Load only when scrolling -->
                <img width="60" height="60" v-lazy="item.imgurl"/>
              </div>
              <div class="text">
                <h2 class="name" v-html="item.creator.name"></h2>
                <p class="desc" v-html="item.dissname"></p>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div class="loading-container" v-show="!discList.length">
        <loading></loading>
      </div>
    </scroll>
    <!-- Secondary-routing container -->
    <router-view></router-view>
  </div>
</template>

<script type="text/ecmascript-6">
import Slider from 'base/slider/slider'
import Loading from 'base/loading/loading'
import Scroll from 'base/scroll/scroll'
import { getRecommend, getDiscList } from 'api/recommend'
import { playlistMixin } from 'common/js/mixin'
import { ERR_OK } from 'api/config'
import { mapMutations } from 'vuex'

export default {
	components: {
		Slider,
		Loading,
		Scroll
	},
	/* insert mixin.js */
	mixins: [playlistMixin],
	data() {
		return {
			recommends: [],
			discList: []
		}
	},
	/* 获取back-end数据, 不需要被监控, data, props里面的数据会被监控 */
	created() {
		/* fetch data from the back-end (carousel data) async */
		this._getRecommend()
		/* fetch data from the back-end (歌单数据) async */
		this._getDiscList()
	},
	methods: {
		...mapMutations({
			setDisc: 'SET_DISC'
		}),
		// If there is a mini player, the singer list bottom will add height to display it.
		handlePlaylist(playlist) {
			const bottom = playlist.length > 0 ? '60px' : ''
			this.$refs.recommend.style.bottom = bottom
			this.$refs.scroll.refresh()
		},
		loadImage() {
			// This logic is executed only once.
			if (!this.checkloaded) {
				this.checkloaded = true
				this.$refs.scroll.refresh()
			}
		},
		selectItem(item) {
			this.$router.push({
				path: `/recommend/${item.dissid}`
			})
			/* vuex/mapMutations */
			this.setDisc(item)
		},
		_getRecommend() {
			getRecommend().then(res => {
				/* static/jsonp1.png */
				/* res.data.slider: <https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg> */
				if (res.code === ERR_OK) {
					this.recommends = res.data.slider
				}
			})
		},
		_getDiscList() {
			getDiscList().then(res => {
				if (res.code === ERR_OK) {
					this.discList = res.data.list
				}
			})
		}
	}
}
</script>

<style scoped lang="scss" rel="stylesheet/scss">
@import '~common/scss/variable.scss';
@import './recommend.scss';
</style>
