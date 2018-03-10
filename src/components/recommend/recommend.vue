<template>
  <div class="recommend" ref="recommend">
    <scroll class="recommend-content" :data="discList" ref="scroll">
      <div>
        <div v-if="recommends.length" class="slider-wrapper" ref="sliderWrapper">
          <slider>
            <div v-for="(item, index) in recommends" :key="index">
              <a :href="item.linkUrl">
                <img :src="item.picUrl" @load="loadImage"/>
              </a>
            </div>
          </slider>
        </div>
        <div class="recommend-list">
          <h1 class="list-title">热门歌单推荐</h1>
          <ul>
            <li v-for="item in discList" class="item">
              <div class="icon">
                <img :src="item.imgurl" width="60" height="60"/>
              </div>
              <div class="text">
                <h2 class="name" v-html="item.creator.name"></h2>
                <p class="desc" v-html="item.dissname"></p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </scroll>
  </div>
</template>

<script type="text/ecmascript-6">
  import { getRecommend, getDiscList } from '../../api/recommend'
  import { ERR_OK } from '../../api/config'
  import Slider from '../../base/slider/slider.vue'
  import Scroll from '../../base/scroll/scroll.vue'

  export default {
    data () {
      return {
        recommends: [],
        discList: [],
        title: '加载呢，客观别急 ~(*^▽^*)~'
      }
    },
    created () {
      this._getRecommend()
      this._getDiscList()
    },
    methods: {
      _getRecommend () {
        getRecommend()
          .then((res) => {
            if (res.code === ERR_OK) {
              console.log(res.data.slider)
              this.recommends = res.data.slider
            }
          })
      },
      _getDiscList () {
        getDiscList()
          .then((res) => {
            if (res.code === ERR_OK) {
              console.log(res.data.list)
              this.discList = res.data.list
            }
          })
      },
      // 防止轮播图延迟加载，导致高度缺失
      loadImage () {
        if (!this.checkloaded) {
          this.$refs.scroll.refresh()
          this.checkloaded = true
        }
      }
    },
    components: {
      Slider,
      Scroll
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss">
  @import "../../common/scss/variable.scss";
  @import "./recommend.scss";
</style>
