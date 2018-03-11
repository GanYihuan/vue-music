<template>
  <div class="singer">
    <router-view></router-view>
  </div>
</template>

<script type="text/ecmascript-6">
  import { getSingerList } from '../../api/singer'
  import { ERR_OK } from '../../api/config'
  import Singer from '../../common/js/singer'

  const HOT_NAME = '热门'
  const HOT_SINGER_LEN = 10

  export default {
    data () {
      return {
        singers: [],
      }
    },
    created () {
      this._getSingerList()
    },
    methods: {
      _getSingerList () {
        getSingerList()
          .then((res) => {
            // this.singers = res.data.list
            // console.log(this.singers)
            this.singers = this._normalizeSinger(res.data.list)
          })
      },
      _normalizeSinger (list) {
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
          let key = item.Findex
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

        // 对象遍历是无序的，此处处理为有序列表
        let ret = []
        let hot = []
        for (let key in map) {
          let val = map[key]
          if (val.title.match(/[a-zA-z]/)) {
            ret.push(val)
          } else if (val.title === HOT_NAME) {
            hot.push(val)
          }
        }
        ret.sort((a, b) => {
          return a.title.charCodeAt(0) - b.title.charCodeAt(0)
        })
        return hot.concat(ret)
      }
    },
    components: {}
  }
</script>

<style lang="scss" rel="stylesheet/scss">
  @import "./singer.scss";
</style>
