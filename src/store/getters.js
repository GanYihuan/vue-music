/*
 * @Description: outside get vuex state data
 * @version:
 * @Author: GanEhank
 * @LastEditors: GanEhank
 * @Date: 2018-06-18 08:12:39
 * @LastEditTime: 2019-04-08 18:32:51
 */

export const singer = state => state.singer
export const playing = state => state.playing
export const fullScreen = state => state.fullScreen
export const playlist = state => state.playlist
export const sequenceList = state => state.sequenceList
export const mode = state => state.mode
export const currentIndex = state => state.currentIndex
export const currentSong = state => { // song forward backward
  return state.playlist[state.currentIndex] || {}
}
export const disc = state => state.disc
export const topList = state => state.topList
export const searchHistory = state => state.searchHistory
export const playHistory = state => state.playHistory
export const favoriteList = state => state.favoriteList
