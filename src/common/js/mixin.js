import { mapGetters, mapMutations, mapActions } from 'vuex'
import { playMode } from 'common/js/config'
import { shuffle } from 'common/js/util'

export const playlistMixin = {
  computed: {
    ...mapGetters([
      'playlist'
    ])
  },
  /* dom ready */
  mounted() {
    this.handlePlaylist(this.playlist)
  },
  activated() {
    this.handlePlaylist(this.playlist)
  },
  watch: {
    playlist(newVal) {
      this.handlePlaylist(newVal)
    }
  },
  methods: {
    // If the component does not define the handlePlaylist, it calls the handlePlaylist in the mixin.
    handlePlaylist() {
      throw new Error('component must implement handlePlaylist method')
    }
  }
}

/*
playlist.vue
player.vue
*/
export const playerMixin = {
  computed: {
    iconMode() {
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
    changeMode() {
      /* 3 mode */
      const mode = (this.mode + 1) % 3
      /* ...mapMutations */
      this.setPlayMode(mode)
      let list = null
      if (mode === playMode.random) {
        list = shuffle(this.sequenceList)
      } else {
        list = this.sequenceList
      }
      // list 改变，currentSong 马上改变 (getters)
      // 需求: 当切换播放模式时, 当前听的歌曲不改变，后面的歌曲改变
      // list 改变时 index 也改变, 这样 curentSong.id 能不变 (getters)
      this.resetCurrentIndex(list)
      /* ...mapMutations */
      this.setPlaylist(list)
    },
    resetCurrentIndex(list) {
      /* 当前歌曲索引 */
      const index = list.findIndex((item) => {
        return item.id === this.currentSong.id
      })
      /* ...mapMutations */
      this.setCurrentIndex(index)
    },
    toggleFavorite(song) {
      if (this.isFavorite(song)) {
        /* ...mapActions */
        this.deleteFavoriteList(song)
      } else {
        /* ...mapActions */
        this.saveFavoriteList(song)
      }
    },
    getFavoriteIcon(song) {
      if (this.isFavorite(song)) {
        return 'icon-favorite'
      }
      return 'icon-not-favorite'
    },
    isFavorite(song) {
      const index = this.favoriteList.findIndex((item) => {
        return item.id === song.id
      })
      return index > -1
    }
  }
}

/*
search.vue
add-song.vue
*/
export const searchMixin = {
  data() {
    return {
      query: '',
      /* Late scroll refresh guarantees that the dom has been loaded. */
      refreshDelay: 120
    }
  },
  computed: {
    ...mapGetters([
      'searchHistory'
    ])
  },
  methods: {
    ...mapActions([
      'saveSearchHistory',
      'deleteSearchHistory'
    ]),
    onQueryChange(query) {
      this.query = query
    },
    /* When scrolling, the search box loses focus and the purpose is to cancel the mobile keyboard */
    blurInput() {
      this.$refs.searchBox.blur()
    },
    addQuery(query) {
      this.$refs.searchBox.setQuery(query)
    },
    /* Save the search results to localStorage */
    saveSearch() {
      /* ...mapActions */
      this.saveSearchHistory(this.query)
    }
  }
}
