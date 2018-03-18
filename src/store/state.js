import {playMode} from "common/js/config";
import {loadSearch, loadPlay, loadFavorite} from "common/js/cache";

// 定义原始数据
const state = {
  singer: {},
  playing: false,
  fullScreen: false,
  // 播放列表
  playlist: [],
  // 顺序列表
  sequenceList: [],
  // 不同播放模式
  mode: playMode.sequence,
  currentIndex: -1,
  disc: {},
  topList: {},
  searchHistory: loadSearch(),
  playHistory: loadPlay(),
  favoriteList: loadFavorite()
};

export default state;
