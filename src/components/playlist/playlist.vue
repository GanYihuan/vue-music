<template>
  <!-- 10-mini歌曲列表 -->
  <transition name="list-fade">
    <div
      class="playlist"
      v-show="showFlag"
      @click="hide"
    >
      <div class="list-wrapper" @click.stop>
        <div class="list-header">
          <h1 class="title">
            <i class="icon" :class="iconMode" @click="changeMode"></i>
            <span class="text">{{modeText}}</span>
            <span class="clear" @click="showConfirm"><i class="icon-clear"></i></span>
          </h1>
        </div>
        <scroll
          class="list-content"
          ref="listContent"
          :data="sequenceList"
          :refreshDelay="refreshDelay"
        >
          <transition-group ref="list" name="list" tag="ul">
            <li
              class="item"
              v-for="(item,index) in sequenceList"
              :key="item.id"
              @click="selectItem(item,index)"
            >
              <i class="current" :class="getCurrentIcon(item)"></i>
              <span class="text">{{item.name}}</span>
              <span class="like" @click.stop="toggleFavorite(item)">
                <i :class="getFavoriteIcon(item)"></i>
              </span>
              <span class="delete" @click.stop="deleteOne(item)">
                <i class="icon-delete"></i>
              </span>
            </li>
          </transition-group>
        </scroll>
        <div class="list-operate">
          <div class="add" @click="addSong">
            <i class="icon-add"></i>
            <span class="text">添加歌曲到队列</span>
          </div>
        </div>
        <div class="list-close" @click="hide">
          <span>关闭</span>
        </div>
      </div>
      <confirm
        ref="confirm"
        text="是否清空播放列表"
        confirmBtnText="清空"
        @confirm="confirmClear"
      >
      </confirm>
      <add-song ref="addSong"></add-song>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
import { mapActions } from 'vuex'
import { playMode } from 'common/js/config'
import { playerMixin } from 'common/js/mixin'
import Scroll from 'base/scroll/scroll'
import Confirm from 'base/confirm/confirm'
import AddSong from 'components/add-song/add-song'

export default {
	mixins: [playerMixin],
	data() {
		return {
			showFlag: false,
			refreshDelay: 120
		}
	},
	computed: {
		modeText() {
			return this.mode === playMode.sequence
				? '顺序播放'
				: this.mode === playMode.random ? '随机播放' : '单曲循环'
		}
	},
	methods: {
		...mapActions(['deleteSong', 'deleteSongList']),
		show() {
			this.showFlag = true
			// The display is refreshed to prevent the dom from being correctly calculated, resulting in scroll failure.
			setTimeout(() => {
				this.$refs.listContent.refresh()
				// currentSong: ...mapGetters (mixin.js)
				this.scrollToCurrent(this.currentSong)
			}, 20)
		},
		hide() {
			this.showFlag = false
		},
		showConfirm() {
			this.$refs.confirm.show()
		},
		confirmClear() {
			// ...mapActions
			this.deleteSongList()
			this.hide()
		},
		getCurrentIcon(item) {
			if (this.currentSong.id === item.id) {
				return 'icon-play'
			}
			return ''
		},
		selectItem(item, index) {
			if (this.mode === playMode.random) {
				// ...mapGetters (mixin.js)
				// The index index of item under playlist.
				index = this.playlist.findIndex(song => {
					return song.id === item.id
				})
			}
			// ...mapMutations (mixin.js)
			this.setCurrentIndex(index)
			// ...mapMutations (mixin.js)
			this.setPlayingState(true)
		},
		scrollToCurrent(current) {
			// Current is index index under sequenceList.
			const index = this.sequenceList.findIndex(song => {
				return current.id === song.id
			})
			// Scroll to the elements of this list.
			this.$refs.listContent.scrollToElement(
				this.$refs.list.$el.children[index],
				300
			)
		},
		deleteOne(item) {
			// ...mapActions
			this.deleteSong(item)
			if (!this.playlist.length) {
				this.hide()
			}
		},
		addSong() {
			this.$refs.addSong.show()
		}
	},
	watch: {
		currentSong(newSong, oldSong) {
			if (!this.showFlag || newSong.id === oldSong.id) {
				return
			}
			setTimeout(() => {
				this.scrollToCurrent(newSong)
			}, 20)
		}
	},
	components: {
		Scroll,
		AddSong,
		Confirm
	}
}
</script>

<style scoped lang="scss" rel="stylesheet/scss">
@import '../../common/scss/variable.scss';
@import '../../common/scss/_mixin.scss';
@import './playlist.scss';
</style>
