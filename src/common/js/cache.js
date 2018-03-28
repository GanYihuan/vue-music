import storage from 'good-storage'

// '__x__': 内部的值
const SEARCH_KEY = '__search__'
// 最多缓存15条数据
const SEARCH_MAX_LEN = 15
// 播放历史记录
const PLAY_KEY = '__play__'
// 播放历史记录最多缓存200条
const PLAY_MAX_LEN = 200
// 收藏
const FAVORITE_KEY = '__favorite__'
// 收藏数量MAX值
const FAVORITE_MAX_LEN = 200

/**
 * 数据插入数组
 * @param arr: 储存数组
 * @param val: 储存值
 * @param compare: 比较函数
 * @param maxLen: 最大值
 */
function insertArray (arr, val, compare, maxLen) {
  // findIndex: 查找arr数组是否有compare元素, 返回该元素下标
  const index = arr.findIndex(compare)
  // 第一条数据
  if (index === 0) {
    return
  }
  if (index > 0) {
    arr.splice(index, 1)
  }
  // 插入到第一个位置
  arr.unshift(val)
  if (maxLen && arr.length > maxLen) {
    // 末尾的数据删掉
    arr.pop()
  }
}

/**
 * 删除数组中的值
 * @param arr: 指定数组
 * @param compare: 返回函数
 */
function deleteFromArray (arr, compare) {
  const index = arr.findIndex(compare)
  if (index > -1) {
    arr.splice(index, 1)
  }
}

// localStorage, search历史记录
export function saveSearch (query) {
  // 获取缓存数据, 历史数据
  let searches = storage.get(SEARCH_KEY, [])
  insertArray(searches, query, (item) => {
    return item === query
  }, SEARCH_MAX_LEN)
  // 设置缓存数据, 历史数据
  storage.set(SEARCH_KEY, searches)
  return searches
}

// localStorage删除对应搜索历史记录
export function deleteSearch (query) {
  // 获取缓存数据, 历史数据
  let searches = storage.get(SEARCH_KEY, [])
  deleteFromArray(searches, (item) => {
    return item === query
  })
  // 设置缓存数据, 历史数据
  storage.set(SEARCH_KEY, searches)
  return searches
}

// localStorage删除全部搜索历史记录
export function clearSearch () {
  storage.remove(SEARCH_KEY)
  return []
}

// 从本地缓存去读搜索历史记录
export function loadSearch () {
  return storage.get(SEARCH_KEY, [])
}

// 缓存播放历史记录(actions.js调用)
export function savePlay (song) {
  // 获取播放历史记录localStorage
  let songs = storage.get(PLAY_KEY, [])
  // 当前歌曲插入到歌曲数组
  insertArray(songs, song, (item) => {
    return song.id === item.id
  }, PLAY_MAX_LEN)
  // 缓存到播放历史记录localStorage
  storage.set(PLAY_KEY, songs)
  return songs
}

// 读取播放历史记录localStorage(state.js会调用)
export function loadPlay () {
  return storage.get(PLAY_KEY, [])
}

// storage保存收藏
export function saveFavorite (song) {
  let songs = storage.get(FAVORITE_KEY, [])
  // 插入歌曲集合
  insertArray(songs, song, (item) => {
    return song.id === item.id
  }, FAVORITE_MAX_LEN)
  storage.set(FAVORITE_KEY, songs)
  return songs
}

// storage删除收藏
export function deleteFavorite (song) {
  let songs = storage.get(FAVORITE_KEY, [])
  deleteFromArray(songs, (item) => {
    return item.id === song.id
  })
  storage.set(FAVORITE_KEY, songs)
  return songs
}

// 加载收藏列表
export function loadFavorite () {
  return storage.get(FAVORITE_KEY, [])
}
