/* operate lots of mutation, async */
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

/*
sequencelist song index corresponds randomlist song index
return randomlist song index
find out whether have song in the list, return its index
*/
function findIndex(list, song) {
  return list.findIndex(item => {
    return item.id === song.id
  })
}

/*
Click on song-list to invoked
action commit, mutation change, map state data
{commit, state} -> commit: submit, state: get state data
{list, index} -> **music-list.vue** selectItem(item, index) {}
*/
export const selectPlay = function({ commit, state }, { list, index }) {
  commit(types.SET_SEQUENCE_LIST, list)
  if (state.mode === playMode.random) {
    const randomList = shuffle(list)
    commit(types.SET_PLAYLIST, randomList)
    /* return song(list[index]) at randomList index */
    // 返回播放的这首歌在随机播放列表的下标
    index = findIndex(randomList, list[index])
  } else {
    commit(types.SET_PLAYLIST, list)
  }
  commit(types.SET_CURRENT_INDEX, index)
  commit(types.SET_FULL_SCREEN, true)
  commit(types.SET_PLAYING_STATE, true)
}

/* random play, no index */
export const randomPlay = function({ commit }, { list }) {
  /* change the playback mode to random mode */
  commit(types.SET_PLAY_MODE, playMode.random)
  /* submit mutation, change the list of song sequences */
  commit(types.SET_SEQUENCE_LIST, list)
  const randomList = shuffle(list)
  /* change the playlist song */
  commit(types.SET_PLAYLIST, randomList)
  /* click on the current song index */
  commit(types.SET_CURRENT_INDEX, 0)
  /* change to full screen mode */
  commit(types.SET_FULL_SCREEN, true)
  /* change the current state of play */
  commit(types.SET_PLAYING_STATE, true)
}

// 点击搜索列表的歌曲1添加到当前播放列表
export const insertSong = function({ commit, state }, song) {
  // state can't modify unless mutation, copy not modify
  const playlist = state.playlist.slice()
  const sequenceList = state.sequenceList.slice()
  let currentIndex = state.currentIndex
  // 记录当前歌曲2
  const currentSong = playlist[currentIndex]
  // 查找当前播放列表, 歌曲1下标
  const fpIndex = findIndex(playlist, song)
  // 歌曲1插入到歌曲2的下一个索引上
  currentIndex++
  playlist.splice(currentIndex, 0, song)
  // 当前播放列表已经有歌曲1
  if (fpIndex > -1) {
    if (currentIndex > fpIndex) {
      // 删除当前播放列表存在的原来歌曲1
      playlist.splice(fpIndex, 1)
      currentIndex--
    } else {
      playlist.splice(fpIndex + 1, 1)
    }
  }
  // 插入位置, 当前歌曲2在原始播放列表的位置的下一位
  const currentSIndex = findIndex(sequenceList, currentSong) + 1
  // 插入的歌曲1在原始播放列表的位置
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
