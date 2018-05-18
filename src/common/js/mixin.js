import {mapGetters, mapMutations, mapActions} from 'vuex'
import {playMode} from 'common/js/config'
import {shuffle} from 'common/js/util'

export const playlistMixin = {
  computed: {
    ...mapGetters([
      'playlist'
    ])
  },
  // dom ready
  mounted () {
    this.handlePlaylist(this.playlist)
  },
  activated () {
    this.handlePlaylist(this.playlist)
  },
  watch: {
    playlist (newVal) {
      this.handlePlaylist(newVal)
    }
  },
  methods: {
    // 组件如果没有定义handlePlaylist,就会调用mixin里面的handlePlaylist
    handlePlaylist () {
      throw new Error('component must implement handlePlaylist method')
    }
  }
}

// playlist.vue
// player.vue
export const playerMixin = {
  computed: {
    iconMode () {
      return this.mode === playMode.sequence
        ? 'icon-sequence'
        : this.mode === playMode.loop
          ? 'icon-loop'
          : 'icon-random'
    },
    ...mapGetters([
      'sequenceList',
      'playlist',
      'currentSong',
      'mode',
      'favoriteList'
    ])
  },
  methods: {
    ...mapMutations({
      setPlayMode: 'SET_PLAY_MODE',
      setPlaylist: 'SET_PLAYLIST',
      setCurrentIndex: 'SET_CURRENT_INDEX'
    }),
    ...mapActions([
      'saveFavoriteList',
      'deleteFavoriteList'
    ]),
    changeMode () {
      const mode = (this.mode + 1) % 3
      // ...mapMutations
      this.setPlayMode(mode)
      let list = null
      if (mode === playMode.random) {
        list = shuffle(this.sequenceList)
      } else {
        // 保持原始列表
        list = this.sequenceList
      }
      this.resetCurrentIndex(list)
      //  vuex (store/mutation.js)
      this.setPlaylist(list)
    },
    // 播放模式发生变化时, 希望当前歌曲currentSong不改变
    resetCurrentIndex (list) {
      // 在list里面找到当前歌曲的索引index
      let index = list.findIndex((item) => {
        return item.id === this.currentSong.id
      })
      // vuex (store/mutation.js)
      this.setCurrentIndex(index)
    },
    toggleFavorite (song) {
      if (this.isFavorite(song)) {
        this.deleteFavoriteList(song)
      } else {
        this.saveFavoriteList(song)
      }
    },
    getFavoriteIcon (song) {
      if (this.isFavorite(song)) {
        return 'icon-favorite'
      }
      return 'icon-not-favorite'
    },
    isFavorite (song) {
      // favoriteList: mutation
      // 查找song是否在favoriteList里面, 如果在返回其所在索引index
      const index = this.favoriteList.findIndex((item) => {
        return item.id === song.id
      })
      return index > -1
    }
  }
}

// search.vue
// add-song.vue
export const searchMixin = {
  data () {
    return {
      query: '',
      // 延迟scroll refresh保证dom已经加载完毕
      refreshDelay: 120
    }
  },
  computed: {
    ...mapGetters([
      'searchHistory'
    ])
  },
  methods: {
    onQueryChange (query) {
      this.query = query
    },
    // 当滚动时, search框失去焦点, 目的是取消移动端键盘
    blurInput () {
      this.$refs.searchBox.blur()
    },
    addQuery (query) {
      this.$refs.searchBox.setQuery(query)
    },
    // 保存搜索结果到localStorage
    saveSearch () {
      this.saveSearchHistory(this.query)
    },
    ...mapActions([
      'saveSearchHistory',
      'deleteSearchHistory'
    ])
  }
}
