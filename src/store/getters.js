/**
 * 数据的映射
 * @param state
 */

export const singer = state => state.singer
export const playing = state => state.playing
export const fullScreen = state => state.fullScreen
export const playlist = state => state.playlist
export const sequenceList = state => state.sequenceList
export const mode = state => state.mode
export const currentIndex = state => state.currentIndex
// 根据state计算属性, playlist,currentIndex计算出currentSong
export const currentSong = (state) => {
  return state.playlist[state.currentIndex] || {}
}
export const disc = state => state.disc
export const topList = state => state.topList
export const searchHistory = state => state.searchHistory
export const playHistory = state => state.playHistory
export const favoriteList = state => state.favoriteList
