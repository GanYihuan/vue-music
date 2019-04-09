/*
 * @Description: async operate mutations
 * @version:
 * @Author: GanEhank
 * @LastEditors: GanEhank
 * @Date: 2018-06-18 08:12:39
 * @LastEditTime: 2019-04-09 20:30:25
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

// 点击搜索列表的歌曲1添加到当前播放列表
export const insertSong = function({ commit, state }, song) {
  // state can't modify unless mutation, copy not modify
  const playlist = state.playlist.slice()
  const sequenceList = state.sequenceList.slice()
  // 歌曲2下标
  let currentIndex = state.currentIndex
  // 记录当前歌曲2
  const currentSong = playlist[currentIndex]
  // fpIndex 歌曲1下标, 查找当前播放列表
  const fpIndex = findIndex(playlist, song)
  // 歌曲1 插入到 歌曲2 的下一个索引上
  currentIndex++
  playlist.splice(currentIndex, 0, song)
  // 当前播放列表是否有 歌曲1
  if (fpIndex > -1) {
    if (currentIndex > fpIndex) {
      // 删除当前播放列表存在的原来 歌曲1
      playlist.splice(fpIndex, 1)
      currentIndex--
    } else {
      playlist.splice(fpIndex + 1, 1)
    }
  }
  // 插入位置, 当前 歌曲2 在原始播放列表的位置的下一位
  const currentSIndex = findIndex(sequenceList, currentSong) + 1
  // 插入的 歌曲1 在原始播放列表的位置
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
