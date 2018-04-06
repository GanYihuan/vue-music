<template>
  <!-- static/02.png -->
  <div class="singer" ref="singer">
    <list-view @select="selectSinger" :data="singers" ref="list"></list-view>
    <!-- singer-detail 将渲染到这里 -->
    <router-view></router-view>
  </div>
</template>

<script type="text/ecmascript-6">
  // 导入store/mutation的语法糖
  import { mapMutations } from 'vuex'
  import { getSingerList } from 'api/singer'
  import { ERR_OK } from 'api/config'
  import { playlistMixin } from 'common/js/mixin'
  // 歌手列表组件实现
  import ListView from 'base/listview/listview'
  import Singer from 'common/js/singer'

  const HOT_SINGER_LEN = 10
  const HOT_NAME = '热门'

  export default {
    mixins: [playlistMixin],
    // Store back-end data.
    data () {
      return {
        singers: []
      }
    },
    created () {
      // Get back-end singer data.
      this._getSingerList()
    },
    methods: {
      handlePlaylist (playlist) {
        const bottom = playlist.length > 0 ? '60px' : ''
        this.$refs.singer.style.bottom = bottom
        this.$refs.list.refresh()
      },
      selectSinger (singer) {
        this.$router.push({
          path: `/singer/${singer.id}`
        })
        // this.setSinger: call mutation SET_SINGER
        this.setSinger(singer)
      },
      // api/singer.js/getSingerList Get qq singer data.
      _getSingerList () {
        getSingerList()
          .then((res) => {
            if (res.code === ERR_OK) {
              // console.log(res.data.list)
              this.singers = this._normalizeSinger(res.data.list)
            }
          })
      },
      // 规范化获取到数据
      _normalizeSinger (list) {
        // 数据结构
        let map = {
          hot: {
            title: HOT_NAME,
            items: []
          }
        }
        list.forEach((item, index) => {
          if (index < HOT_SINGER_LEN) {
            map.hot.items.push(new Singer({
              name: item.Fsinger_name,
              id: item.Fsinger_mid
            }))
          }
          const key = item.Findex
          if (!map[key]) {
            map[key] = {
              title: key,
              items: []
            }
          }
          map[key].items.push(new Singer({
            name: item.Fsinger_name,
            id: item.Fsinger_mid
          }))
        })
        // console.log(map)
        // 为了得到有序列表，我们需要处理 map
        // 对象遍历是无序的，此处处理为有序列表
        let ret = []
        let hot = []
        for (let key in map) {
          let val = map[key]
          if (val.title.match(/[a-zA-Z]/)) {
            ret.push(val)
          } else if (val.title === HOT_NAME) {
            hot.push(val)
          }
        }
        // 升序排列
        ret.sort((a, b) => {
          return a.title.charCodeAt(0) - b.title.charCodeAt(0)
        })
        return hot.concat(ret)
      },
      // 调用mutation, 使用mutation-types常量
      ...mapMutations({
        setSinger: 'SET_SINGER'
      })
    },
    components: {
      ListView
    }
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
  @import "./singer.scss";
</style>
