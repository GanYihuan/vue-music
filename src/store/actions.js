/**
 * Mutation use action to encapsulate and modify multiple mutations.
 */
import * as types from './mutation-types'
import { playMode } from 'common/js/config'
import { shuffle } from 'common/js/util'
import { saveSearch, clearSearch, deleteSearch, savePlay, saveFavorite, deleteFavorite } from 'common/js/cache'

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
  // 查找playlist中是否有待插入的song, song并返回其索引
  let fpIndex = findIndex(playlist, song)
  // 插入了歌曲，所以索引+1
  currentIndex++
  // 插入song到currentIndex位置
  playlist.splice(currentIndex, 0, song)
  // 如果已经包含了这首歌
  if (fpIndex > -1) {
    // 如果当前插入的歌曲currentIndex大于列表中的目标歌曲fpIndex
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
  // 当前歌曲列表sequenceList中是否有待插入的歌曲song, 并返回其索引
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

// 保存到localStorage, saveSearch(调用cache.js)
export const saveSearchHistory = function ({commit}, query) {
  commit(types.SET_SEARCH_HISTORY, saveSearch(query))
}

// 从localStorage删除搜索词, deleteSearch(调用cache.js)
export const deleteSearchHistory = function ({commit}, query) {
  commit(types.SET_SEARCH_HISTORY, deleteSearch(query))
}

// clearSearch: cache.js 清理缓存, clearSearch(调用cache.js)
export const clearSearchHistory = function ({commit}) {
  commit(types.SET_SEARCH_HISTORY, clearSearch())
}

// 删除一首歌
export const deleteSong = function ({commit, state}, song) {
  // 不能再其他地方对state修改, 只能在mutation里面修改
  // 副本,不会对state修改
  let playlist = state.playlist.slice()
  let sequenceList = state.sequenceList.slice()
  let currentIndex = state.currentIndex
  // 当前这首歌的索引
  let pIndex = findIndex(playlist, song)
  // 删除该歌曲
  playlist.splice(pIndex, 1)
  // sequenceList索引
  let sIndex = findIndex(sequenceList, song)
  // 删除
  sequenceList.splice(sIndex, 1)
  if (currentIndex > pIndex || currentIndex === playlist.length) {
    currentIndex--
  }
  commit(types.SET_PLAYLIST, playlist)
  commit(types.SET_SEQUENCE_LIST, sequenceList)
  commit(types.SET_CURRENT_INDEX, currentIndex)
  // 如果全部删除了
  if (!playlist.length) {
    commit(types.SET_PLAYING_STATE, false)
  } else {
    commit(types.SET_PLAYING_STATE, true)
  }
}

// 清空mini歌曲列表
export const deleteSongList = function ({commit}) {
  commit(types.SET_CURRENT_INDEX, -1)
  commit(types.SET_PLAYLIST, [])
  commit(types.SET_SEQUENCE_LIST, [])
  commit(types.SET_PLAYING_STATE, false)
}

// 保存播放历史记录
export const savePlayHistory = function ({commit}, song) {
  commit(types.SET_PLAY_HISTORY, savePlay(song))
}

// 保存收藏
export const saveFavoriteList = function ({commit}, song) {
  commit(types.SET_FAVORITE_LIST, saveFavorite(song))
}

// 取消收藏
export const deleteFavoriteList = function ({commit}, song) {
  commit(types.SET_FAVORITE_LIST, deleteFavorite(song))
}
