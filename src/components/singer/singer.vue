<template>
  <div class="singer">
    <Listview :data="singers" @select="selectSinger"></Listview>
    <router-view></router-view>
  </div>
</template>

<script>
  // Syntactic sugar
  import { getSingerList } from 'api/singer'
  import { ERR_OK } from 'api/config'
  import { mapMutations } from 'vuex'
  import Singer from 'common/js/singer'
  import Listview from 'base/listview/listview'

  const HOT_NAME = '热门'
  const HOT_SINGER_LEN = 10

  export default {
    data() {
      return {
        singers: [],
      }
    },
    created() {
      this._getSingerList()
    },
    methods: {
      ...mapMutations({
        setSinger: 'SET_SINGER'
      }),
      selectSinger(singer) {
        this.$router.push({
          path: `/singer/${singer.id}`
        })
        this.setSinger(singer)
      },
      _getSingerList(){
        getSingerList().then((res) => {
          this.singers = this._normalizeSinger(res.data.list)
        })
      },
      _normalizeSinger(list) {
        let map = {
          hot: {
            title: HOT_NAME,
            items: []
          }
        }
        list.forEach((item, index) => {
          if(index < HOT_SINGER_LEN) {
            map.hot.items.push(new Singer({
              name: item.Fsinger_name,
              id: item.Fsinger_mid
            }))
          }
          let key = item.Findex
          if(!map[key]) {
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
        // 对象遍历是无序的，此处处理为有序列表
        let ret = []
        let hot = []
        for(let key in map) {
          let val = map[key]
          if(val.title.match(/[a-zA-z]/)) {
            ret.push(val)
          }else if(val.title === HOT_NAME) {
            hot.push(val)
          }
        }
        ret.sort((a, b) => {
          return a.title.charCodeAt(0) - b.title.charCodeAt(0)
        })
        return hot.concat(ret)
      }
    },
    components: {
      Listview
    }
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
  @import "./singer.scss";
</style>
