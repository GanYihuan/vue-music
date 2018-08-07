<template>
  <!-- static/02-歌手界面.png -->
  <!-- :data="data" Data is obtained asynchronously, Data changes to recalculate the scroll -->
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
  props: {
		data: {
			type: Array,
			default: null
		}
	},
	/* data and props Data needs to be monitored */
	data() {
		return {
			/* Real-time scroll position */
			scrollY: -1,
			/* which letters should be displayed */
			currentIndex: 0,
			/* diff: current element celling to pre element floor gaps */
			diff: -1
		}
	},
	computed: {
    /* Right list 'A','B'... */
		shortcutList() {
			return this.data.map(group => {
				/* '热门' Take only one word '热' */
				return group.title.substr(0, 1)
			})
		},
		fixedTitle() {
      /* Do not display two '热门' title */ 
			if (this.scrollY > 0) {
				return ''
			}
			/* make sure !== undefined */
			return this.data[this.currentIndex]
				? this.data[this.currentIndex].title
				: ''
		}
  },
  /* get back-end data, created not monitor, data, props will monitor */
	created() {
		this.touch = {}
		this.listenScroll = true
		this.probeType = 3
	},
	methods: {
		selectItem(item) {
			this.$emit('select', item)
		},
		onShortCutTouchStart(e) {
			/* getData **dom.js** */
			/* <li class="item" :data-index></li> */
			/* getData(el, name, val) return el.getAttribute('data' + name) */
			let anchorIndex = getData(e.target, 'index')
			/* e.touches[0]: Finger click position */
			let firstTouch = e.touches[0]
			/* vertical click position */
			this.touch.y1 = firstTouch.pageY
			/* the first time the finger clicks on the letter subscript */
			this.touch.anchorIndex = anchorIndex
			this._scrollTo(anchorIndex)
		},
		onShortCutTouchMove(e) {
			/* e.touches[0]: Finger click position */
			let firstTouch = e.touches[0]
			/* Vertical click position */
			this.touch.y2 = firstTouch.pageY
			/* | 0: Math.floor */
			/* delta: Shifted a few 'letter' positions after the finger swiped */
			let delta = ((this.touch.y2 - this.touch.y1) / ANCHOR_HEIGHT) | 0
			/* After sliding your finger, letter subscript on the stopped position */
			let anchorIndex = parseInt(this.touch.anchorIndex) + delta
			this._scrollTo(anchorIndex)
		},
		refresh() {
			this.$refs.listview.refresh()
		},
		scroll(pos) {
			/* pos.y: Real-time scroll position */
			this.scrollY = pos.y
		},
		_scrollTo(index) {
      /* click on the upper and lower blank of the letter */ 
			/* !index: index === null */
			if (!index && index !== 0) {
				return
			}
			/* handle boundary */
			if (index < 0) {
        index = 0
			} else if (index > this.listHeight.length - 2) {
				index = this.listHeight.length - 2
      }
			this.scrollY = -this.listHeight[index]
			/* scroll.vue: First parameter: Scroll to the corresponding element, Second parameter: 动画时间 */
			this.$refs.listview.scrollToElement(this.$refs.listGroup[index], 0)
		},
		_calculateHeight() {
			let height = 0
			let listGroup = this.$refs.listGroup
			/* listHeight has one more element than listGroup  */
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
		/* 17ms dom Rendering completed */
		data() {
			setTimeout(() => {
				this._calculateHeight()
			}, 20)
    },
    /* diff: trigger the animation of the fix title */ 
		diff(newVal) {
      /* newVal: diff */
      let fixedTop = newVal > 0 && newVal < FIXED_TITLE_HEIGHT 
          ? newVal - FIXED_TITLE_HEIGHT
          : 0
      /*
      When the title animation is not triggered,
      fixedTop is not changing 
      */
			if (this.fixedTop === fixedTop) {
				return
			}
			this.fixedTop = fixedTop
			/* Turn on GPU acceleration */
			this.$refs.fixed.style.transform = `translate3d(0, ${fixedTop}px, 0)`
    },
    /* Real-time scroll position */
		scrollY(newY) {
      /* Keep the height of the group */
			let listHeight = this.listHeight
			/* When scrolling to the top newY > 0 */
			if (newY > 0) {
				this.currentIndex = 0
				return
			}
      /*
      Determine which group interval the newY scrolls into
      When scrolling to the middle section,
      listHeight has one more element than listGroup
      listHeight.length - 1: The upper limit of the first element is the lower limit of the second element, 
      Traversing to the last one -1, Ensure that height2 exists, 
      No more than height2
      */
			for (let i = 0; i < listHeight.length - 1; i++) {
				/* Lower limit */
				let height1 = listHeight[i]
				/* Upper limit */
				let height2 = listHeight[i + 1]
				/* -newY: When scrolling occurs, newY Is negative, Add “-” Ensure that it is positive */
				if (-newY >= height1 && -newY < height2) {
					this.currentIndex = i
					/*
          newY is negative
          diff: trigger the animation of the fix title, 
          diff = next element Upper limit(height2) - rolling distance(newY)
          */
					this.diff = newY + height2
					return
				}
				this.currentIndex = 0
			}
      /*
      When scrolling to the bottom, 
      -newY is bigger than the upper limit of the last element
      listHeight.length-2: listHeight has one more element than listGroup
      currentIndex subscript starts from 0
      */
			this.currentIndex = listHeight.length - 2
		}
	}
}
</script>

<style scoped lang="scss" rel="stylesheet/scss">
@import '~common/scss/variable.scss';
@import './listview.scss';
</style>
