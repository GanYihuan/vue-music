import storage from 'good-storage'

// '__x__': The value of the internal
const SEARCH_KEY = '__search__'
// Cache MAX value :15 data.
const SEARCH_MAX_LEN = 15
// Play history
const PLAY_KEY = '__play__'
// Play history MAX value :200.
const PLAY_MAX_LEN = 200
// collection
const FAVORITE_KEY = '__favorite__'
// collection MAX value :200.
const FAVORITE_MAX_LEN = 200

/**
 * 删除arr数组中的compare
 * @param arr: 指定数组
 * @param compare: 返回函数
 */
function deleteFromArray (arr, compare) {
  // findIndex: 查找arr数组是否有compare元素, 返回该元素下标
  const index = arr.findIndex(compare)
  // 如果存在
  if (index > -1) {
    arr.splice(index, 1)
  }
}

/**
 * Val data is inserted into arr array and placed first.
 * @param arr: Stored array
 * @param val: Stored value
 * @param compare: func
 * @param maxLen: number
 */
function insertArray (arr, val, compare, maxLen) {
  // findIndex: Find the arr array with the compare element and return the subscript.
  const index = arr.findIndex(compare)
  // The first position has the compare.
  if (index === 0) {
    return
  }
  // Compare this data is not in the first place.
  if (index > 0) {
    arr.splice(index, 1)
  }
  // Insert val's data into the arr array head.
  arr.unshift(val)
  if (maxLen && arr.length > maxLen) {
    // Delete the end of arr array.
    arr.pop()
  }
}

/**
 * localStorage, Query history
 * @param query
 * @returns {*}
 */
export function saveSearch (query) {
  // Gets cached data, historical data, no data returns an empty array.
  let searches = storage.get(SEARCH_KEY, [])
  // Val data is inserted into arr array and placed first.
  insertArray(searches, query, (item) => {
    return item === query
  }, SEARCH_MAX_LEN)
  // Store cached data, historical data.
  storage.set(SEARCH_KEY, searches)
  return searches
}

/**
 * localStorage删除对应搜索历史记录
 * @param query: 查询值
 * @returns {*}
 */
export function deleteSearch (query) {
  // 获取缓存数据, 历史数据
  let searches = storage.get(SEARCH_KEY, [])
  deleteFromArray(searches, (item) => {
    return item === query
  })
  // 保存缓存数据, 历史数据
  storage.set(SEARCH_KEY, searches)
  return searches
}

// localStorage删除全部搜索历史记录(actions.js会调用)
export function clearSearch () {
  storage.remove(SEARCH_KEY)
  return []
}

// 从本地缓存去读搜索历史记录(state.js会调用)
export function loadSearch () {
  return storage.get(SEARCH_KEY, [])
}

/**
 * 缓存播放历史记录(actions.js调用)
 * @param song
 * @returns {*}
 */
export function savePlay (song) {
  // 获取播放历史记录localStorage, 没有的话返回空数组
  let songs = storage.get(PLAY_KEY, [])
  // song插入到songs, 传入比较函数, song在里面的话把他挪到前面去
  insertArray(songs, song, (item) => {
    return song.id === item.id
  }, PLAY_MAX_LEN)
  // 新数组缓存到本地
  storage.set(PLAY_KEY, songs)
  return songs
}

// 读取播放历史记录localStorage(state.js会调用)
export function loadPlay () {
  return storage.get(PLAY_KEY, [])
}

/**
 * 保存收藏
 * @param song
 * @returns {*}
 */
export function saveFavorite (song) {
  // 获取收藏列表localStorage
  let songs = storage.get(FAVORITE_KEY, [])
  // song插入到songs, 传入比较函数, song在里面的话把他挪到前面去
  insertArray(songs, song, (item) => {
    return song.id === item.id
  }, FAVORITE_MAX_LEN)
  // 新数组缓存到本地
  storage.set(FAVORITE_KEY, songs)
  return songs
}

/**
 * storage删除收藏
 * @param song
 * @returns {*}
 */
export function deleteFavorite (song) {
  let songs = storage.get(FAVORITE_KEY, [])
  // 删除arr数组中的compare
  deleteFromArray(songs, (item) => {
    return item.id === song.id
  })
  // 新数组缓存到本地
  storage.set(FAVORITE_KEY, songs)
  return songs
}

// 加载收藏列表
// state初始值获取的时候会用到(state.js会调用)
export function loadFavorite () {
  return storage.get(FAVORITE_KEY, [])
}
