/*
 * @Description: define data
 * @version:
 * @Author: GanEhank
 * @LastEditors: GanEhank
 * @Date: 2018-06-18 08:12:39
 * @LastEditTime: 2019-04-08 18:33:50
 */

import { playMode } from 'common/js/config'
import { loadSearch, loadPlay, loadFavorite } from 'common/js/cache'

const state = {
  singer: {},
  playing: false,
  fullScreen: false,
  playlist: [],
  sequenceList: [], // when play mode random, playlist !== sequenceList
  mode: playMode.sequence,
  currentIndex: -1,
  disc: {}, // song single object
  topList: {}, // List interface jump interface: the list details interface.
  searchHistory: loadSearch(), // loadSearch: Read from the local cache. search-list
  playHistory: loadPlay(), // loadPlay: Read the search history from the local cache.
  favoriteList: loadFavorite() // collect list
}

export default state
