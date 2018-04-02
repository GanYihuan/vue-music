<template>
  <!-- 06.png -->
  <div class="rank" ref="rank">
    <scroll :data="topList" class="toplist" ref="toplist">
      <ul>
        <li
          class="item"
          v-for="(item,index) in topList"
          :key="index"
          @click="selectItem(item)"
        >
          <div class="icon">
            <img width="100" height="100" v-lazy="item.picUrl"/>
          </div>
          <ul class="songlist">
            <li
              class="song"
              v-for="(song,index) in item.songList"
              :key="index"
            >
              <!-- https://c.y.qq.com/v8/fcg-bin/fcg_v8_toplist_cp.fcg?g_tk=5381&uin=0&format=json&inCharset=utf-8&outCharset=utf-8&notice=0&platform=h5&needNewCode=1&tpl=3&page=detail&type=top&topid=4&_=1521599753632 -->
              <span>{{index + 1}}</span>
              <span>{{song.songname}}-{{song.singername}}</span>
            </li>
          </ul>
        </li>
      </ul>
      <div class="loading-container" v-show="!topList.length">
        <loading></loading>
      </div>
    </scroll>
    <router-view></router-view>
  </div>
</template>

<script type="text/ecmascript-6">
  import Scroll from 'base/scroll/scroll'
  import Loading from 'base/loading/loading'
  // jsonp
  import { getTopList } from 'api/rank'
  import { ERR_OK } from 'api/config'
  // 设置mini播放器的正确位置显示
  import { playlistMixin } from 'common/js/mixin'
  import { mapMutations } from 'vuex'

  export default {
    // 设置mini播放器的正确位置显示
    mixins: [playlistMixin],
    created () {
      this._getTopList()
    },
    data () {
      return {
        topList: []
      }
    },
    methods: {
      // 设置mini播放器的正确位置显示
      handlePlaylist (playlist) {
        const bottom = playlist.length > 0 ? '60px' : ''
        this.$refs.rank.style.bottom = bottom
        this.$refs.toplist.refresh()
      },
      selectItem (item) {
        this.$router.push({
          path: `/rank/${item.id}`
        })
        // mutation
        this.setTopList(item)
      },
      _getTopList () {
        getTopList()
          .then(res => {
            if (res.code === ERR_OK) {
              this.topList = res.data.topList
            }
          })
      },
      // vuex (store/mutation.js)
      ...mapMutations({
        setTopList: 'SET_TOP_LIST'
      })
    },
    watch: {
      topList () {
        setTimeout(() => {
          this.$Lazyload.lazyLoadHandler()
        }, 20)
      }
    },
    components: {
      Scroll,
      Loading
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "./rank.scss";
</style>
