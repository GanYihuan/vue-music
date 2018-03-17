// 数据的映射
export const singer = state => state.singer
export const playing = state => state.playing
export const fullScreen = state => state.fullScreen
export const playList = state => state.playList
export const sequenceList = state => state.sequenceList
export const mode = state => state.mode
export const currentIndex = state => state.currentIndex
// 函数, 根据 state 计算属性, 根据 playList, currentIndex计算 currentSong
export const currentSong = (state) => {
  return state.playList[state.currentIndex] || {}
}