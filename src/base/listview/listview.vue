<template>
  <!-- static/02-歌手界面.png -->
  <!-- :data="data" 数据是异步获取的, 数据变化要重新计算scroll -->
  <scroll 
    class="listview"
    ref="listview"
    :data="data"
    :listenScroll="listenScroll"
    :probeType='probeType'
    @scroll="scroll"
  >
    <ul>
      <li
        class="list-group"
        ref="listGroup"
        v-for="(group, index) in data"
        :key="index"
      >
        <h2 class="list-group-title">{{group.title}}</h2>
        <ul>
          <li
            class="list-group-item"
            v-for="(item, index) in group.items"
            :key="index"
            @click="selectItem(item)"
          >
            <img class="avatar" v-lazy="item.avatar"/>
            <span class="name">{{item.name}}</span>
          </li>
        </ul>
      </li>
    </ul>
    <div
      class="list-shortcut"
      @touchstart="onShortCutTouchStart"
      @touchmove.stop.prevent="onShortCutTouchMove"
    >
      <ul>
        <li
          class="item"
          v-for="(item, index) in shortcutList"
          :key="index"
          :class="{'current': currentIndex === index}"
          :data-index="index"
        >
          {{item}}
        </li>
      </ul>
    </div>
    <div 
      class="list-fixed"
      ref="fixed"
      v-show="fixedTitle"
    >
      <h2 class="fixed-title">{{fixedTitle}}</h2>
    </div>
    <div class="loading-container" v-show="!data.length">
      <loading></loading>
    </div>
  </scroll>
</template>

<script type="text/ecmascript-6">
/* get & set <li class="item" :data-index></li> */
import { getData } from 'common/js/dom'
import Scroll from 'base/scroll/scroll'
import loading from 'base/loading/loading'

const ANCHOR_HEIGHT = 18
const FIXED_TITLE_HEIGHT = 30

export default {
	components: {
		Scroll,
		loading
	},
	/* created: The values not need monitor */
	created() {
		this.touch = {}
		this.listenScroll = true
		this.probeType = 3
	},
	/* data and props values need monitor */
	data() {
		return {
			/* 实时滚动位置 */
			scrollY: -1,
			/* 当前应该显示第几个字母 */
			currentIndex: 0,
			/* diff: current element celling to pre element floor gaps*/
			diff: -1
		}
	},
	props: {
		data: {
			type: Array,
			default: null
		}
	},
	computed: {
    /* 右侧列表'A','B'... */ 
		shortcutList() {
			return this.data.map(group => {
				/* '热门' 只取一个字 '热' */
				return group.title.substr(0, 1)
			})
		},
		fixedTitle() {
			if (this.scrollY > 0) {
				return ''
			}
			/* 确保 !== undefined */
			return this.data[this.currentIndex]
				? this.data[this.currentIndex].title
				: ''
		}
	},
	methods: {
		selectItem(item) {
			this.$emit('select', item)
		},
		onShortCutTouchStart(e) {
			/* getData (common/js/dom.js) */
			/* <li class="item" :data-index></li> */
			/* getData(el, name, val) */
			let anchorIndex = getData(e.target, 'index')
			/* e.touches[0]: 手指点击位置 */
			let firstTouch = e.touches[0]
			/* 垂直方向点击位置 */
			this.touch.y1 = firstTouch.pageY
			/* 手指第一次点击位于的字母下标 */
			this.touch.anchorIndex = anchorIndex
			this._scrollTo(anchorIndex)
		},
		onShortCutTouchMove(e) {
			/* e.touches[0]: 手指点击位置 */
			let firstTouch = e.touches[0]
			/* 垂直方向点击位置 */
			this.touch.y2 = firstTouch.pageY
			/* | 0: Math.floor */
			/* delta: 手指滑动后偏移了几个‘字母’位置 */
			let delta = ((this.touch.y2 - this.touch.y1) / ANCHOR_HEIGHT) | 0
			/* 手指滑动后, 停在的位置上的字母下标 */
			let anchorIndex = parseInt(this.touch.anchorIndex) + delta
			this._scrollTo(anchorIndex)
		},
		refresh() {
			this.$refs.listview.refresh()
		},
		scroll(pos) {
			/* pos.y: 实时滚动位置 */
			this.scrollY = pos.y
		},
		_scrollTo(index) {
			/* !index: index === null */
			if (!index && index !== 0) {
				return
			}
			/* 点击字母列上下空白部分 */
			if (index < 0) {
				index = 0
			} else if (index > this.listHeight.length - 2) {
				index = this.listHeight.length - 2
			}
			/* -this.listHeight[index]: 上限的位置 */
			this.scrollY = -this.listHeight[index]
			/* scroll.vue: 第一个参数: 滚动到相应的元素, 第二个参数: 动画时间 */
			this.$refs.listview.scrollToElement(this.$refs.listGroup[index], 0)
		},
		_calculateHeight() {
			let height = 0
			let listGroup = this.$refs.listGroup
			/* listHeight 比 listGroup 多一个元素, 因为添加了上下限 */
			this.listHeight = []
			this.listHeight.push(height)
			for (let i = 0; i < listGroup.length; i++) {
				let item = listGroup[i]
				height += item.clientHeight
				this.listHeight.push(height)
			}
		}
	},
	watch: {
		/* 20ms, 17ms, dom渲染完成 */
		data() {
			setTimeout(() => {
				this._calculateHeight()
			}, 20)
		},
		diff(newVal) {
			let fixedTop =
				newVal > 0 && newVal < FIXED_TITLE_HEIGHT
					? newVal - FIXED_TITLE_HEIGHT
          : 0
      /* 减少dom操作 */
			if (this.fixedTop === fixedTop) {
				return
			}
			this.fixedTop = fixedTop
			/* 开启 GPU 加速 */
			this.$refs.fixed.style.transform = `translate3d(0, ${fixedTop}px, 0)`
		},
		scrollY(newY) {
			let listHeight = this.listHeight
			/* 当滚动到顶部 newY > 0 */
			if (newY > 0) {
				this.currentIndex = 0
				return
			}
			/*
      当滚动到中间部分,
      length-1: 第一个元素的上限是第二个元素的下限, 遍历到最后一个 -1, 保证height2存在, 不超过height2
      listHeight 比 listGroup 多一个元素
      */
			for (let i = 0; i < listHeight.length - 1; i++) {
				/* 下限 */
				let height1 = listHeight[i]
				/* 上限 */
				let height2 = listHeight[i + 1]
				/* -newY: 滚动发生时, newY 是负值, 添加 “-” 保证其是正值 */
				if (-newY >= height1 && -newY < height2) {
					this.currentIndex = i
					/*
          newY 是负值
          diff: 用来是否触发title的动画效果
          diff = 下一个元素的上限(height2) - 滚动的距离(newY)
          */
					this.diff = newY + height2
					return
				}
				this.currentIndex = 0
			}
			/* 当滚动到底部, -newY大于最后一个元素的上限 */
			/* listHeight.length-2: listHeight 比 listGroup 多一个元素, currentIndex第一个元素下标从0开始 */
			this.currentIndex = listHeight.length - 2
		}
	}
}
</script>

<style scoped lang="scss" rel="stylesheet/scss">
@import '~common/scss/variable.scss';
@import './listview.scss';
</style>
