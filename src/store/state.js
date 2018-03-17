import {playMode} from 'common/js/config'

// 定义原始数据
const state = {
  singer: {},
  playing: false,
  fullScreen: false,
  // 播放列表
  playList: [],
  // 顺序列表
  sequenceList: [],
  // 不同播放模式
  mode: playMode.sequence,
  currentIndex: -1
}

export default state