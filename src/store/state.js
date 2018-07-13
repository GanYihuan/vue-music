/**
 * define data
 */

import { playMode } from 'common/js/config'
import { loadSearch, loadPlay, loadFavorite } from 'common/js/cache'

const state = {
  singer: {},
  // Player: play
  playing: false,
  // Player: full screen
  fullScreen: false,
  // Player: playlist
  playlist: [],
  // Player: sequenceList (control play mode)
  // when play mode === random, playlist !== sequenceList
  sequenceList: [],
  // Player: sequenceList (different play mode)
  mode: playMode.sequence,
  // Player: currently song index.
  currentIndex: -1,
  // Song single object
  disc: {},
  // List interface jump interface: the list details interface.
  topList: {},
  // loadSearch: Read from the local cache. search-list
  searchHistory: loadSearch(),
  // loadPlay: Read the search history from the local cache.
  playHistory: loadPlay(),
  // Collect the list
  favoriteList: loadFavorite()
}

export default state
