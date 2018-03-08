<template>
  <div class="recommend" ref="recommend">
    <div class="recommend-content">
      <div class="slider-wrapper"></div>
      <div class="recommend-list">
        <h1 class="list-title">热门歌单推荐</h1>
        <ul>

        </ul>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import { getRecommend } from '../../api/recommend'
  import { ERR_OK } from '../../api/config'

  export default {
    data () {
      return {
        recommends: []
      }
    },
    created () {
      this._getRecommend()
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
      }
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss">
  @import "../../common/scss/variable.scss";
  @import "./recommend.scss";
</style>
