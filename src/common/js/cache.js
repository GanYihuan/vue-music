import storage from 'good-storage'

// '__x__': The value of the internal
const SEARCH_KEY = '__search__'
// Cache MAX value: 15 data
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
 * query 数据插入到数组里的第一个位置上
 * @param arr: Stored array
 * @param val: Stored value
 * @param compare: func
 * @param maxLen: number
 */
function insertArray(arr, val, compare, maxLen) {
  // findIndex: Find the arr array with the compare element and return the subscript.
  const index = arr.findIndex(compare)
  // 第一条数据位置上
  if (index === 0) {
    return
  }
  // 不在第一条数据位置上
  if (index > 0) {
    arr.splice(index, 1)
  }
  // 插入到第一条数据位置上
  arr.unshift(val)
  if (maxLen && arr.length > maxLen) {
    // 删掉最后一个数据
    arr.pop()
  }
}

/**
 * query 储存到 localStorage, 并且返回这个缓存
 * @param query
 * @returns {*}
 */
export function saveSearch(query) {
  // gets cached data, historical data, no data returns empty array
  const searches = storage.get(SEARCH_KEY, [])
  insertArray(
    searches,
    query,
    item => {
      return item === query
    },
    SEARCH_MAX_LEN
  )
  // store cached data, historical data
  storage.set(SEARCH_KEY, searches)
  return searches
}

function deleteFromArray(arr, compare) {
  const index = arr.findIndex(compare)
  if (index > -1) {
    arr.splice(index, 1)
  }
}

export function deleteSearch(query) {
  // Gets cached data, historical data.
  const searches = storage.get(SEARCH_KEY, [])
  deleteFromArray(searches, item => {
    return item === query
  })
  // Save the cached data, historical data.
  storage.set(SEARCH_KEY, searches)
  return searches
}

// LocalStorage deletes all search history (actions.js)
export function clearSearch() {
  storage.remove(SEARCH_KEY)
  return []
}

// Read the search history from the local cache (state.js calls)
export function loadSearch() {
  return storage.get(SEARCH_KEY, [])
}

export function savePlay(song) {
  // Gets the playback history localStorage and returns an empty array if no.
  const songs = storage.get(PLAY_KEY, [])
  // Song is inserted into songs, passed in the comparison function, and song moves him to the front.
  insertArray(
    songs,
    song,
    item => {
      return song.id === item.id
    },
    PLAY_MAX_LEN
  )
  // The new array is cached locally.
  storage.set(PLAY_KEY, songs)
  return songs
}

// Read the playback history localStorage(state.js will call)
export function loadPlay() {
  return storage.get(PLAY_KEY, [])
}

export function saveFavorite(song) {
  // Get the collection list localStorage.
  const songs = storage.get(FAVORITE_KEY, [])
  // Song is inserted into songs, passed in the comparison function, and song moves him to the front.
  insertArray(
    songs,
    song,
    item => {
      return song.id === item.id
    },
    FAVORITE_MAX_LEN
  )
  // The new array is cached locally.
  storage.set(FAVORITE_KEY, songs)
  return songs
}

export function deleteFavorite(song) {
  const songs = storage.get(FAVORITE_KEY, [])
  // Remove compare from arr array.
  deleteFromArray(songs, item => {
    return item.id === song.id
  })
  // The new array is cached locally.
  storage.set(FAVORITE_KEY, songs)
  return songs
}

// Load favorites list
// When the state initial value is fetched, it will be used (state.js will call)
export function loadFavorite() {
  return storage.get(FAVORITE_KEY, [])
}
