/**
 * mutations用action封装,修改多个mutations
 */

import * as types from './mutation-types'
import {playMode} from 'common/js/config'
import {shuffle} from 'common/js/util'
import {saveSearch, clearSearch, deleteSearch, savePlay, saveFavorite, deleteFavorite} from 'common/js/cache'

// 顺序列表index歌曲对应到随机列表哪首歌曲index,返回该随机列表歌曲索引index
// 查找列表中是否有song这首歌曲，如果有返回该索引
function findIndex (list, song) {
  return list.findIndex((item) => {
    return item.id === song.id
  })
}

// 点击歌曲名称时做出的变化
// 定义动作, action执行, mutation就会改变, 映射state数据
// {commit, state} : 提交和获取数据
// {list, index} : 修改的歌曲列表对象
export const selectPlay = function ({commit, state}, {list, index}) {
  // 提交mutation, 改变歌曲顺序列表
  commit(types.SET_SEQUENCE_LIST, list)
  // 如果播放模式是随机模式
  if (state.mode === playMode.random) {
    // 洗牌
    let randomList = shuffle(list)
    // 改变播放列表的歌曲
    commit(types.SET_PLAYLIST, randomList)
    // 顺序列表index歌曲对应到随机列表哪首歌曲index,返回该随机列表歌曲索引index
    index = findIndex(randomList, list[index])
  } else {
    // 改变播放列表
    commit(types.SET_PLAYLIST, list)
  }
  // 点击的当前歌曲下标
  commit(types.SET_CURRENT_INDEX, index)
  // 改变为全屏模式
  commit(types.SET_FULL_SCREEN, true)
  // 改变当前的播放状态
  commit(types.SET_PLAYING_STATE, true)
}

// 随机播放, 没有索引
export const randomPlay = function ({commit}, {list}) {
  // 改变播放模式为随机模式
  commit(types.SET_PLAY_MODE, playMode.random)
  // 提交mutation, 改变歌曲顺序列表
  commit(types.SET_SEQUENCE_LIST, list)
  let randomList = shuffle(list)
  // 改变播放列表的歌曲
  commit(types.SET_PLAYLIST, randomList)
  // 点击的当前歌曲下标
  commit(types.SET_CURRENT_INDEX, 0)
  // 改变为全屏模式
  commit(types.SET_FULL_SCREEN, true)
  // 改变当前的播放状态
  commit(types.SET_PLAYING_STATE, true)
}

// 点击搜索界面歌曲并添加到播放列表
export const insertSong = function ({commit, state}, song) {
  // 不能再其他地方对state修改, 只能在mutation里面修改
  // 副本,不会对state修改
  let playlist = state.playlist.slice()
  let sequenceList = state.sequenceList.slice()
  let currentIndex = state.currentIndex
  // 记录当前歌曲
  let currentSong = playlist[currentIndex]
  // 查找当前列表中是否有待插入的歌曲并返回其索引
  let fpIndex = findIndex(playlist, song)
  // 因为是插入歌曲，所以索引+1
  currentIndex++
  // 插入这首歌到当前索引位置
  playlist.splice(currentIndex, 0, song)
  // 如果已经包含了这首歌
  if (fpIndex > -1) {
    // 如果当前插入的歌曲序号大于列表中的目标歌曲序号
    if (currentIndex > fpIndex) {
      playlist.splice(fpIndex, 1)
      currentIndex--
    } else {
      playlist.splice(fpIndex + 1, 1)
    }
  }
  // sequenceList: 当前歌曲列表, 不同模式下, 歌曲位置不同
  // currentSIndex: sequenceList 插入位置
  let currentSIndex = findIndex(sequenceList, currentSong) + 1
  // 当前歌曲列表中是否有待插入的歌曲并返回其索引
  let fsIndex = findIndex(sequenceList, song)
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

// 保存到localStorage
export const saveSearchHistory = function ({commit}, query) {
  commit(types.SET_SEARCH_HISTORY, saveSearch(query))
}

export const deleteSearchHistory = function ({commit}, query) {
  commit(types.SET_SEARCH_HISTORY, deleteSearch(query))
}

// clearSearch: cache.js 清理缓存
export const clearSearchHistory = function ({commit}) {
  commit(types.SET_SEARCH_HISTORY, clearSearch())
}

export const deleteSong = function ({commit, state}, song) {
  let playlist = state.playlist.slice()
  let sequenceList = state.sequenceList.slice()
  let currentIndex = state.currentIndex
  let pIndex = findIndex(playlist, song)
  playlist.splice(pIndex, 1)
  let sIndex = findIndex(sequenceList, song)
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

export const deleteSongList = function ({commit}) {
  commit(types.SET_CURRENT_INDEX, -1)
  commit(types.SET_PLAYLIST, [])
  commit(types.SET_SEQUENCE_LIST, [])
  commit(types.SET_PLAYING_STATE, false)
}

// player.vue: 播放历史记录
export const savePlayHistory = function ({commit}, song) {
  commit(types.SET_PLAY_HISTORY, savePlay(song))
}

// 保存收藏列表
export const saveFavoriteList = function ({commit}, song) {
  commit(types.SET_FAVORITE_LIST, saveFavorite(song))
}

// 取消收藏
export const deleteFavoriteList = function ({commit}, song) {
  commit(types.SET_FAVORITE_LIST, deleteFavorite(song))
}
