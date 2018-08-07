<template>
  <!-- static/01-推荐界面 -->
  <div class="recommend" ref="recommend">
    <!-- :data="discList": Prevent asynchronous loading from causing rendering timing errors, Make sure the data has arrived -->
    <scroll
      class="recommend-content"
      ref="scroll"
      :data="discList"
    >
      <div>
        <!-- v-if="recommends.length": Prevent asynchronous loading from causing rendering timing errors, Make sure the data has arrived -->
        <div
          class="slider-wrapper"
          ref="sliderWrapper"
          v-if="recommends.length"
        >
          <slider>
            <!-- https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg -->
            <div v-for="item in recommends" :key="item.id">
              <a :href="item.linkUrl">
                <!-- class="needsclick" fastclick Don't block the click process -->
                <!-- @load="loadImage" Rendering after the carousel is used to cause a height calculation error, Solution -->
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
              v-for="item in discList"
              :key="item.dissid"
              @click="selectItem(item)"
            >
              <div class="icon">
                <!-- v-lazy: when scroll then load -->
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
  /* get back-end data, data not monitor */
	created() {
		/* get back-end data (Carousel data) async */
		this._getRecommend()
		/* get back-end data (Song list data) async */
		this._getDiscList()
	},
	methods: {
		...mapMutations({
			setDisc: 'SET_DISC'
		}),
		/* If there is a mini player, the singer list bottom will add height to display it. */
		handlePlaylist(playlist) {
			const bottom = playlist.length > 0 ? '60px' : ''
			this.$refs.recommend.style.bottom = bottom
			this.$refs.scroll.refresh()
		},
		loadImage() {
			/* call once, carousel render late caouse height wrong, fix it */
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
          /* Status: 500, server error, axios can fix */ 
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
