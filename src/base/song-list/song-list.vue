<template>
  <div class="song-list">
    <ul>
      <li
        class="item"
        v-for="(song, index) in songs"
        :key="index"
        @click="selectItem(song, index)"
      >
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
      }
    },
    methods: {
      selectItem (item, index) {
        // call父类的select方法
        // <song-list @select="selectItem"></song-list>
        this.$emit('select', item, index)
      },
      getDesc (song) {
        return `${song.singer} 。${song.album}`
      }
    }
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
  @import "../../common/scss/variable.scss";
  @import "../../common/scss/_mixin.scss";
  @import "./song-list.scss";
</style>