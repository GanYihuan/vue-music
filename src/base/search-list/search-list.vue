<template>
  <!-- 09-搜索历史列表 -->
  <div class="search-list" v-show="searches.length">
    <transition-group name="list" tag="ul">
      <li
        class="search-item"
        v-for="item in searches"
        :key="item"
        @click="selectItem(item)"
      >
        <span class="text">{{item}}</span>
        <span class="icon" @click.stop="deleteOne(item)">
          <i class="icon-delete"></i>
        </span>
      </li>
    </transition-group>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
	props: {
		searches: {
			type: Array,
			default: null
		}
	},
	methods: {
		selectItem(item) {
			this.$emit('select', item)
		},
		deleteOne(item) {
			this.$emit('delete', item)
		}
	}
}
</script>

<style scoped lang="scss" rel="stylesheet/scss">
@import '../../common/scss/variable.scss';
@import '../../common/scss/_mixin.scss';
@import './search-list.scss';
</style>
