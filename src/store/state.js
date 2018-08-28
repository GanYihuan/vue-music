/* define data */
import { playMode } from 'common/js/config'
import { loadSearch, loadPlay, loadFavorite } from 'common/js/cache'

const state = {
  singer: {},
  playing: false,
  fullScreen: false,
  playlist: [],
  /* Player: sequenceList (control play mode) */
  /* when play mode random, playlist !== sequenceList */
  /* origin list */
  sequenceList: [],
  mode: playMode.sequence,
  currentIndex: -1,
  /* song single object */
  disc: {},
  /* List interface jump interface: the list details interface. */
  topList: {},
  /* loadSearch: Read from the local cache. search-list */
  searchHistory: loadSearch(),
  /* loadPlay: Read the search history from the local cache. */
  playHistory: loadPlay(),
  /* collect list */
  favoriteList: loadFavorite()
}

export default state
