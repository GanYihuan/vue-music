import {mapGetters, mapMutations, mapActions} from 'vuex'
import {playMode} from 'common/js/config'
import {shuffle} from 'common/js/util'

export const playlistMixin = {
  computed: {
    ...mapGetters([
      'playlist'
    ])
  },
  /* dom ready */
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
    // If the component does not define the handlePlaylist, it calls the handlePlaylist in the mixin.
    handlePlaylist () {
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
      /* 3 mode */
      const mode = (this.mode + 1) % 3
      /* ...mapMutations */
      this.setPlayMode(mode)
      let list = null
      if (mode === playMode.random) {
        /* sequenceList: origin-List */
        list = shuffle(this.sequenceList)
      } else {
        list = this.sequenceList
      }
      this.resetCurrentIndex(list)
      /* ...mapMutations */
      this.setPlaylist(list)
    },
    /* mode change, keep current Song no change */
    resetCurrentIndex (list) {
      let index = list.findIndex((item) => {
        return item.id === this.currentSong.id
      })
      /* ...mapMutations */
      this.setCurrentIndex(index)
    },
    toggleFavorite (song) {
      if (this.isFavorite(song)) {
        /* ...mapActions */
        this.deleteFavoriteList(song)
      } else {
        /* ...mapActions */
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
      /* ...mapGetters */
      /* Find out whether song is in the favoriteList and if it returns its index index */
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
  data () {
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
    onQueryChange (query) {
      this.query = query
    },
    /* When scrolling, the search box loses focus and the purpose is to cancel the mobile keyboard */
    blurInput () {
      this.$refs.searchBox.blur()
    },
    addQuery (query) {
      this.$refs.searchBox.setQuery(query)
    },
    /* Save the search results to localStorage */
    saveSearch () {
      /* ...mapActions */
      this.saveSearchHistory(this.query)
    }
  }
}
