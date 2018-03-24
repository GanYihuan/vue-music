<template>
  <div class="recommend" ref="recommend">
    <!-- :data : 内容撑开scroll的高度 -->
    <scroll ref="scroll" class="recommend-content" :data="discList">
      <div>
        <!-- v-if="recommends.length": prevent Asynchronous load delay -->
        <div v-if="recommends.length" class="slider-wrapper" ref="sliderWrapper">
          <slider>
            <div v-for="(item,index) in recommends" :key="index">
              <a :href="item.linkUrl">
                <img class="needsclick" @load="loadImage" :src="item.picUrl"/>
              </a>
            </div>
          </slider>
        </div>
        <div class="recommend-list">
          <h1 class="list-title">热门歌单推荐</h1>
          <ul>
            <li @click="selectItem(item)" v-for="(item,index) in discList" :key="index" class="item">
              <div class="icon">
                <!-- v-lazy: Load only when scrolling. -->
                <!-- class="needsclick": fastclick does not intercept the click process. -->
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
    <!-- 二级路由容器 -->
    <router-view></router-view>
  </div>
</template>

<script type="text/ecmascript-6">
  import Slider from 'base/slider/slider'
  import Loading from 'base/loading/loading'
  import Scroll from 'base/scroll/scroll'
  import {getRecommend, getDiscList} from 'api/recommend'
  import {playlistMixin} from 'common/js/mixin'
  import {ERR_OK} from 'api/config'
  import {mapMutations} from 'vuex'

  export default {
    mixins: [playlistMixin],
    data () {
      return {
        recommends: [],
        discList: []
      }
    },
    // get back-end data
    created () {
      // fetch data (轮播图数据)
      this._getRecommend()
      // fetch data (歌单数据)
      this._getDiscList()
    },
    methods: {
      handlePlaylist (playlist) {
        const bottom = playlist.length > 0 ? '60px' : ''
        this.$refs.recommend.style.bottom = bottom
        this.$refs.scroll.refresh()
      },
      // 防止轮播图延迟加载, 造成高度计算错误
      loadImage () {
        if (!this.checkloaded) {
          this.checkloaded = true
          this.$refs.scroll.refresh()
        }
      },
      selectItem (item) {
        this.$router.push({
          path: `/recommend/${item.dissid}`
        })
        // mutation: setDisc
        this.setDisc(item)
      },
      _getRecommend () {
        getRecommend()
          .then((res) => {
            // static -> jsonp1.png
            // res.data.slider <https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg>
            if (res.code === ERR_OK) {
              // console.log(res.data.slider)
              this.recommends = res.data.slider
            }
          })
      },
      _getDiscList () {
        getDiscList()
          .then((res) => {
            if (res.code === ERR_OK) {
              // console.log(res.data.list)
              this.discList = res.data.list
            }
          })
      },
      ...mapMutations({
        // 设置歌单对象
        setDisc: 'SET_DISC'
      })
    },
    components: {
      Slider,
      Loading,
      Scroll
    }
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
  @import "../../common/scss/variable.scss";
  @import "./recommend.scss";
</style>