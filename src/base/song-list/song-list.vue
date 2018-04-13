<template>
  <!-- static/03.png/歌曲列表 -->
  <div class="song-list">
    <ul>
      <li
        class="item"
        v-for="(song, index) in songs"
        :key="index"
        @click="selectItem(song, index)"
      >
        <div class="rank" v-show="rank">
          <span :class="getRankCls(index)">{{getRankText(index)}}</span>
        </div>
        <div class="content">
          <h2 class="name">{{song.name}}</h2>
          <p class="desc">{{getDesc(song)}}</p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    props: {
      songs: {
        type: Array,
        default: []
      },
      // 为07.png服务,排行奖杯
      rank: {
        type: Boolean,
        default: false
      }
    },
    methods: {
      selectItem (item, index) {
        // 派发给父组件
        this.$emit('select', item, index)
      },
      getDesc (song) {
        return `${song.singer}·${song.album}`
      },
      getRankCls (index) {
        // 前三名要显示奖杯
        if (index <= 2) {
          return `icon icon${index}`
        } else {
          return 'text'
        }
      },
      getRankText (index) {
        if (index > 2) {
          return index + 1
        }
      }
    }
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
  @import "../../common/scss/variable.scss";
  @import "../../common/scss/_mixin.scss";
  @import "./song-list.scss";
</style>
