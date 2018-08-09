<template>
  <!-- static/08-搜索界面/搜索框 -->
  <div class="search-box">
    <i class="icon-search"></i>
    <input ref="query" v-model="query" class="box" :placeholder="placeholder"/>
    <i class="icon-dismiss" v-show="query" @click="clear"></i>
  </div>
</template>

<script type="text/ecmascript-6">
import { debounce } from 'common/js/util'

export default {
	props: {
		placeholder: {
			type: String,
			default: '搜索歌曲、歌手'
		}
	},
	data() {
		return {
			// Search keywords
			query: ''
		}
	},
	methods: {
		clear() {
			this.query = ''
		},
		setQuery(query) {
			this.query = query
		},
		blur() {
			this.$refs.query.blur()
		}
  },
  /* data not monitor, data & props data need monitor, get back-end data */
	created() {
		// debounce(): **common/js/util.js** Throttling function
		// Throttling function, optimizing request.
    this.$watch('query', debounce(newQuery => 
      {
				this.$emit('query', newQuery)
			}, 200)
		)
	}
}
</script>

<style scoped lang="scss" rel="stylesheet/scss">
@import '~common/scss/variable.scss';
@import './search-box.scss';
</style>
