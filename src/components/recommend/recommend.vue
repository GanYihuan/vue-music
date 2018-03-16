<template>
  <div class="recommend">
    <scroll ref="scroll" class="recommend-content" :data="discList">
      <div>
        <!-- v-if="recommends.length": prevent Asynchronous load delay -->
        <div v-if="recommends.length" class="slider-wrapper">
          <slider>
            <div v-for="(item,index) in recommends" :key="index">
              <a :href="item.linkUrl">
                <img :src="item.picUrl" @load="loadImage">
              </a>
            </div>
          </slider>
        </div>
        <div class="recommend-list">
          <h1 class="list-title">热门歌单推荐</h1>
          <ul>
            <li v-for="(item,index) in discList" :key="index" class="item">
              <div class="icon">
                <!-- v-lazy: Load only when scrolling. -->
                <!-- class="needsclick": fastclick does not intercept the click process. -->
                <img v-lazy="item.imgurl" width="60" height="60">
              </div>
              <div class="text">
                <h2 class="name" v-html="item.creator.name"></h2>
                <p class="desc" v-html="item.dissname"></p>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div class="loading-container">
        <loading v-show="!discList.length" :title="this.title"></loading>
      </div>
    </scroll>
  </div>
</template>

<script>
  import Slider from 'base/slider/slider'
  import Scroll from 'base/scroll/scroll'
  import Loading from 'base/loading/loading'
  import {getRecommend, getDiscList} from 'api/recommend'
  import {ERR_OK} from 'api/config'

  export default {
    data () {
      return {
        recommends: [],
        discList: [],
        title: '正在载入...'
      }
    },
    created () {
      this._getRecommend();
      this._getDiscList();
    },
    methods: {
      _getRecommend () {
        getRecommend().then((res) => {
          // js -> fcg -> Response -> jsonp(data)
          // https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg
          if (res.code === ERR_OK) {
            this.recommends = res.data.slider
          }
        })
      },
      _getDiscList () {
        getDiscList().then((res) => {
          if (res.code === ERR_OK) {
            this.discList = res.data.list
          }
        })
      },
      // Prevent wheel-seeding graph from delaying loading, resulting in high loss
      loadImage () {
        if (!this.checkloaded) {
          this.$refs.scroll.refresh()
          this.checkloaded = true
        }
      }
    },
    components: {
      Slider,
      Scroll,
      Loading
    }
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
  @import "../../common/scss/variable.scss";
  @import "./recommend.scss";
</style>