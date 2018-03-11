<template>
  <div class="singer">
    <router-view></router-view>
  </div>
</template>

<script type="text/ecmascript-6">
  import { getSingerList } from '../../api/singer'
  import { ERR_OK } from '../../api/config'

  export default {
    data () {
      return {
        singers: [],
      }
    },
    created () {
      this._getSingerList()
    },
    methods: {
      _getSingerList () {
        getSingerList()
          .then((res) => {
            this.singers = res.data.list
            console.log(this.singers)
          })
      },
      _normalizeSinger () {

      }
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss">
  @import "./singer.scss";
</style>
