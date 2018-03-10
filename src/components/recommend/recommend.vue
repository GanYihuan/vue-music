<template>
  <div class="recommend" ref="recommend">
    <div class="recommend-content">
      <div>
        <div v-if="recommends.length" class="slider-wrapper" ref="sliderWrapper">
          <slider>
            <div v-for="(item, index) in recommends" :key="index">
              <a :href="item.linkUrl">
                <img :src="item.picUrl"/>
              </a>
            </div>
          </slider>
        </div>
        <div class="recommend-list">
          <h1 class="list-title">热门歌单推荐</h1>
          <ul>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import { getRecommend, getDiscList } from '../../api/recommend'
  import { ERR_OK } from '../../api/config'
  import Slider from '../../base/slider/slider.vue'

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
      }
    },
    components: {
      Slider
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss">
  @import "../../common/scss/variable.scss";
  @import "./recommend.scss";
</style>
