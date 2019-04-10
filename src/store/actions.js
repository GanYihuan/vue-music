/*
 * @Description: async operate mutations
 * @version:
 * @Author: GanEhank
 * @LastEditors: GanEhank
 * @Date: 2018-06-18 08:12:39
 * @LastEditTime: 2019-04-10 10:10:16
 */

import * as types from './mutation-types'
import { playMode } from 'common/js/config'
import { shuffle } from 'common/js/util'
import {
  saveSearch,
  clearSearch,
  deleteSearch,
  savePlay,
  saveFavorite,
  deleteFavorite
} from 'common/js/cache'

/**
 * this song in the list index
 * @return: randomlist song index
 */
function findIndex(list, song) {
  return list.findIndex(item => {
    return item.id === song.id
  })
}

/**
 * Click on song-list to invoked
 * @param commit: submit
 * @param state: get state data
 * @param {list, index} -> **music-list.vue** selectItem(item, index) {}
 * @return:
 */
export const selectPlay = function({ commit, state }, { list, index }) {
  commit(types.SET_SEQUENCE_LIST, list)
  if (state.mode === playMode.random) {
    const randomList = shuffle(list)
    commit(types.SET_PLAYLIST, randomList)
    index = findIndex(randomList, list[index]) // return song(list[index]) at randomList index
  } else {
    commit(types.SET_PLAYLIST, list)
  }
  commit(types.SET_CURRENT_INDEX, index)
  commit(types.SET_FULL_SCREEN, true)
  commit(types.SET_PLAYING_STATE, true)
}

/**
 * random play, no index
 * @param {type}
 * @return:
 */
export const randomPlay = function({ commit }, { list }) {
  commit(types.SET_PLAY_MODE, playMode.random) // change playback mode become random mode
  commit(types.SET_SEQUENCE_LIST, list) // submit mutation, change the list of song sequences
  const randomList = shuffle(list)
  commit(types.SET_PLAYLIST, randomList) // change the playlist song
  commit(types.SET_CURRENT_INDEX, 0) // click on the current song index
  commit(types.SET_FULL_SCREEN, true) // change to full screen mode
  commit(types.SET_PLAYING_STATE, true) // change the current state of play
}

/**
 * Click on the search list song 1, Add to current playlist
 * @param {type}
 * @return:
 */
export const insertSong = function({ commit, state }, song) {
  const playlist = state.playlist.slice() // state can't modify unless mutation, copy not modify
  const sequenceList = state.sequenceList.slice()
  let currentIndex = state.currentIndex // song 2(current song) index
  const currentSong = playlist[currentIndex] // song 2 position
  const fpIndex = findIndex(playlist, song) // song 1(click search list song) index
  currentIndex++ // song 1 position
  playlist.splice(currentIndex, 0, song) // song 1 insert song 2 next position
  if (fpIndex > -1) { // current playlist has song 1 ?
    if (currentIndex > fpIndex) {
      playlist.splice(fpIndex, 1) // delete current playlist song 1
      currentIndex--
    } else {
      playlist.splice(fpIndex + 1, 1)
    }
  }
  // song 2 at sequenceList index + 1
  const currentSIndex = findIndex(sequenceList, currentSong) + 1
  // song 1 at sequenceList index
  const fsIndex = findIndex(sequenceList, song)
  sequenceList.splice(currentSIndex, 0, song)
  if (fsIndex > -1) {
    if (currentSIndex > fsIndex) {
      sequenceList.splice(fsIndex, 1)
    } else {
      sequenceList.splice(fsIndex + 1, 1)
    }
  }
  commit(types.SET_PLAYLIST, playlist)
  commit(types.SET_SEQUENCE_LIST, sequenceList)
  commit(types.SET_CURRENT_INDEX, currentIndex)
  commit(types.SET_FULL_SCREEN, true)
  commit(types.SET_PLAYING_STATE, true)
}

// Save to localStorage, saveSearch(call cache.js)
export const saveSearchHistory = function({ commit }, query) {
  commit(types.SET_SEARCH_HISTORY, saveSearch(query))
}

// Remove the search term from localStorage, deleteSearch(call cache.js)
export const deleteSearchHistory = function({ commit }, query) {
  commit(types.SET_SEARCH_HISTORY, deleteSearch(query))
}

// clearSearch: cache.js Clean cache, clearSearch(call cache.js)
export const clearSearchHistory = function({ commit }) {
  commit(types.SET_SEARCH_HISTORY, clearSearch())
}

export const deleteSong = function({ commit, state }, song) {
  const playlist = state.playlist.slice()
  const sequenceList = state.sequenceList.slice()
  let currentIndex = state.currentIndex
  const pIndex = findIndex(playlist, song)
  playlist.splice(pIndex, 1)
  const sIndex = findIndex(sequenceList, song)
  sequenceList.splice(sIndex, 1)
  if (currentIndex > pIndex || currentIndex === playlist.length) {
    currentIndex--
  }
  commit(types.SET_PLAYLIST, playlist)
  commit(types.SET_SEQUENCE_LIST, sequenceList)
  commit(types.SET_CURRENT_INDEX, currentIndex)
  if (!playlist.length) {
    commit(types.SET_PLAYING_STATE, false)
  } else {
    commit(types.SET_PLAYING_STATE, true)
  }
}

export const deleteSongList = function({ commit }) {
  commit(types.SET_CURRENT_INDEX, -1)
  commit(types.SET_PLAYLIST, [])
  commit(types.SET_SEQUENCE_LIST, [])
  commit(types.SET_PLAYING_STATE, false)
}

export const savePlayHistory = function({ commit }, song) {
  commit(types.SET_PLAY_HISTORY, savePlay(song))
}

export const saveFavoriteList = function({ commit }, song) {
  commit(types.SET_FAVORITE_LIST, saveFavorite(song))
}

export const deleteFavoriteList = function({ commit }, song) {
  commit(types.SET_FAVORITE_LIST, deleteFavorite(song))
}
