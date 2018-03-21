<template>
  <scroll
    ref="suggest"
    class="suggest"
    :data="result"
    :pullup="pullup"
    :beforeScroll="beforeScroll"
    @scrollToEnd="searchMore"
    @beforeScroll="listScroll"
  >
    <ul class="suggest-list">
      <li
        class="suggest-item"
        v-for="(item,index) in result"
        :key="index"
        @click="selectItem(item)"
      >
        <div class="icon">
          <i :class="getIconCls(item)"></i>
        </div>
        <div class="name">
          <p class="text" v-html="getDisplayName(item)"></p>
        </div>
      </li>
      <loading v-show="hasMore" title=""></loading>
    </ul>
  </scroll>
</template>

<script type="text/ecmascript-6">
  import Scroll from "base/scroll/scroll"
  import Loading from "base/loading/loading"
  import NoResult from "base/no-result/no-result"
  // 前端请求jsonp
  import {search} from "api/search"
  import {ERR_OK} from "api/config"
  import {createSong} from "common/js/song"
  import {mapMutations, mapActions} from "vuex"
  import Singer from "common/js/singer"

  const TYPE_SINGER = "singer"
  // perpage: 每页返回的个数
  const perpage = 20

  export default {
    props: {
      // 显示歌手吗？
      showSinger: {
        type: Boolean,
        default: true
      },
      // search检索词
      query: {
        type: String,
        default: ""
      }
    },
    data () {
      return {
        page: 1,
        // 下拉刷新
        pullup: true,
        beforeScroll: true,
        hasMore: true,
        result: []
      }
    },
    methods: {
      refresh () {
        this.$refs.suggest.refresh()
      },
      // 请求服务端,抓取search检索数据
      search () {
        // 刚搜索时
        this.page = 1
        this.hasMore = true
        // 滚动到顶部
        this.$refs.suggest.scrollTo(0, 0)
        search(this.query, this.page, this.showSinger, perpage).then(res => {
          if (res.code === ERR_OK) {
            this.result = this._genResult(res.data)
            // 是否有多余数据
            this._checkMore(res.data)
          }
        })
      },
      // 下拉刷新处理函数
      searchMore () {
        if (!this.hasMore) {
          return
        }
        // 加载下一页
        this.page++
        search(this.query, this.page, this.showSinger, perpage).then(res => {
          if (res.code === ERR_OK) {
            // concat: 数组拼接, result变化,数据变化, 传入scroll值变化, scroll 刷新
            this.result = this.result.concat(this._genResult(res.data))
            // 查看是否还有数据?
            this._checkMore(res.data)
          }
        })
      },
      listScroll () {
        this.$emit("listScroll")
      },
      selectItem (item) {
        if (item.type === TYPE_SINGER) {
          const singer = new Singer({
            id: item.singermid,
            name: item.singername
          })
          this.$router.push({
            path: `/search/${singer.id}`
          })
          // vuex: mutation
          this.setSinger(singer)
        } else {
          // vuex: action
          this.insertSong(item)
        }
        this.$emit("select", item)
      },
      getDisplayName (item) {
        if (item.type === TYPE_SINGER) {
          return item.singername
        } else {
          return `${item.name}-${item.singer}`
        }
      },
      getIconCls (item) {
        if (item.type === TYPE_SINGER) {
          return "icon-mine"
        } else {
          return "icon-music"
        }
      },
      _genResult (data) {
        let ret = []
        if (data.zhida && data.zhida.singerid) {
          ret.push({...data.zhida, ...{type: TYPE_SINGER}})
        }
        if (data.song) {
          ret = ret.concat(this._normalizeSongs(data.song.list))
        }
        return ret
      },
      _normalizeSongs (list) {
        let ret = []
        list.forEach(musicData => {
          if (musicData.songid && musicData.albummid) {
            ret.push(createSong(musicData))
          }
        })
        return ret
      },
      // 是否有多余数据
      _checkMore (data) {
        const song = data.song
        if (!song.list.length || song.curnum + song.curpage * perpage > song.totalnum) {
          this.hasMore = false
        }
      },
      ...mapMutations({
        setSinger: "SET_SINGER"
      }),
      ...mapActions([
        "insertSong"
      ])
    },
    watch: {
      query (newQuery) {
        this.search(newQuery)
      }
    },
    components: {
      Scroll,
      Loading,
      NoResult,
      Singer
    }
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
  @import '../../common/scss/variable.scss';
  @import '../../common/scss/_mixin.scss';
  @import "./suggest.scss";
</style>