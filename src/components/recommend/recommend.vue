<template>
  <!-- static/01-推荐界面 -->
  <div class="recommend" ref="recommend">
    <!-- :data="discList": make sure dom render in page -->
    <scroll
      class="recommend-content"
      ref="scroll"
      :data="discList"
    >
      <div>
        <!-- v-if="recommends.length": make sure dom render in page -->
        <div
          class="slider-wrapper"
          ref="sliderWrapper"
          v-if="recommends.length"
        >
          <slider>
            <div v-for="item in recommends" :key="item.id">
              <a :href="item.linkUrl">
                <!-- class="needsclick" fastclick Don't block the click process -->
                <!-- @load="loadImage" carousel render too late cause height wrong -->
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
  mixins: [playlistMixin],
  data() {
    return {
      recommends: [],
      discList: []
    }
  },
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
    /* if mini player, singer list bottom add height */
    handlePlaylist(playlist) {
      const bottom = playlist.length > 0 ? '60px' : ''
      this.$refs.recommend.style.bottom = bottom
      this.$refs.scroll.refresh()
    },
    /* img load dom change, better-scroll refresh */
    loadImage() {
      if (!this.checkloaded) {
        this.checkloaded = true
        /* better-scroll: when dom size change, refresh */
        this.$refs.scroll.refresh()
      }
    },
    selectItem(item) {
      this.$router.push({
        path: `/recommend/${item.dissid}`
      })
      this.setDisc(item)
    },
    _getRecommend() {
      getRecommend().then(res => {
        /* res: [推荐界面数据](https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg) */
        if (res.code === ERR_OK) {
          this.recommends = res.data.slider
        }
      })
    },
    _getDiscList() {
      getDiscList().then(res => {
        if (res.code === ERR_OK) {
          /* res: [歌单数据](https://c.y.qq.com/v8/fcg-bin/fcg_v8_singer_track_cp.fcg?g_tk=5381&inCharset=utf-8&outCharset=utf-8&notice=0&format=jsonp&hostUin=0&needNewCode=0&platform=yqq&order=listen&begin=0&num=80&songstatus=1&singermid=0025NhlN2yWrP4&jsonpCallback=__jp1) */
          /* Status: 500, server error, axios can fix */
          this.discList = res.data.list
        }
      })
    }
  }
}
</script>

<style scoped lang="scss" rel="stylesheet/scss">
@import './recommend.scss';
</style>
