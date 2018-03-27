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
  // 原始列表
  sequenceList: [],
  // 不同播放模式
  mode: playMode.sequence,
  // 当前播放歌曲索引
  currentIndex: -1,
  // 歌单对象
  disc: {},
  // 排行榜界面跳转的界面: 榜单详情界面
  topList: {},
  // loadSearch: 从本地缓存去读search-list
  searchHistory: loadSearch(),
  // 播放历史
  playHistory: loadPlay(),
  // 收藏列表
  favoriteList: loadFavorite()
};

export default state;
