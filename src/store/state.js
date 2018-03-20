/**
 * 定义基础数据
 */

import {playMode} from "common/js/config";
import {loadSearch, loadPlay, loadFavorite} from "common/js/cache";

const state = {
  singer: {},
  // 播放
  playing: false,
  // 全屏
  fullScreen: false,
  // 播放列表
  playlist: [],
  // 顺序列表(播放模式控制)
  sequenceList: [],
  // 不同播放模式
  mode: playMode.sequence,
  // 当前播放歌曲索引
  currentIndex: -1,
  // 歌单对象
  disc: {},
  topList: {},
  searchHistory: loadSearch(),
  playHistory: loadPlay(),
  favoriteList: loadFavorite()
};

export default state;
