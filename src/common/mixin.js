import {debounce} from 'common/utils'
export const itemListerMixin = {
  mounted () {
    const refresh = debounce(this.$refs.scroll.refresh,100)
    this.homeItemListener = () =>{
      refresh()
      // 
    }
    this.$bus.$on('itemImageLoad',this.homeItemListener)
    // console.log('1111111111111111')
  },
  data(){
    return {
    homeItemListener:null
  }
}
}

import BackTop from 'components/content/backTop/BackTop'
export const backTopMixin = {
  components: {
    BackTop
  },
  data(){
    return {
      ifTabFixed:false,
    }
  },
  methods: {
    backtop(){
      this.$refs.scroll.scrollTo(0,0,500)
    },
  }

}