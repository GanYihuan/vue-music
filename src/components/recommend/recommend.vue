<template>
  <!-- static/01-推荐界面 -->
  <div class="recommend" ref="recommend">
    <!-- :data="discList": 防止由于异步加载慢，导致渲染时机错误, 确保数据已经到来了才渲染 -->
    <scroll
      class="recommend-content"
      ref="scroll"
      :data="discList"
    >
      <div>
        <!-- v-if="recommends.length": 防止由于异步加载慢，导致渲染时机错误, 确保数据已经到来了才渲染 -->
        <div
          class="slider-wrapper"
          ref="sliderWrapper"
          v-if="recommends.length"
        >
          <slider>
            <div v-for="item in recommends" :key="item.id">
              <!-- https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg -->
              <a :href="item.linkUrl">
                <!-- class="needsclick" fastclick 不要拦截点击过程 -->
                <!-- @load="loadImage" 轮播图后渲染出来导致高度计算错误的问题, 解决方法 -->
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
	/* get back-end data, not monitor, data, props data will monitor */
	created() {
		/* get back-end data (轮播图数据) async */
		this._getRecommend()
		/* get back-end data (歌单数据) async */
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
