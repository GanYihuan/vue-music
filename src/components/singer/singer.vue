<template>
  <!-- static/02-歌手界面.png -->
  <div class="singer" ref="singer">
    <list-view
      ref="list"
      :data="singers"
      @select="selectSinger"
    >
    </list-view>
    <!-- singer-detail will render here. -->
    <router-view></router-view>
  </div>
</template>

<script type="text/ecmascript-6">
  import { mapMutations } from 'vuex'
  import { getSingerList } from 'api/singer'
  import { ERR_OK } from 'api/config'
  import { playlistMixin } from 'common/js/mixin'
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
    // get back-end data
    created () {
      // fetch data (singer data)
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
        // this.setSinger: ...mapMutations
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
      // handle data.
      _normalizeSinger (list) {
        // The data structure, custom
        let map = {
          hot: {
            title: HOT_NAME,
            items: []
          }
        }
        list.forEach((item, index) => {
          // Top 10 data, include '热门'
          if (index < HOT_SINGER_LEN) {
            map.hot.items.push(new Singer({
              name: item.Fsinger_name,
              id: item.Fsinger_mid
            }))
          }
          // Top 10 data after
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
        // Object traversal is unordered and processed as an ordered list
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
        // ascending order
        ret.sort((a, b) => {
          return a.title.charCodeAt(0) - b.title.charCodeAt(0)
        })
        return hot.concat(ret)
      },
      // call mutation，use mutation tyoe constants。set state
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
