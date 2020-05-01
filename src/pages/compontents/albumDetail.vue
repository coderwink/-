<template>
  <view @click='handleClick'>
    <!-- <view>我是图片详情组件</view> -->
    <slot></slot>
  </view>
</template>

<script>
export default {
  props: {
    imgList: {
      type: Array,
      default() {
        return []
      }
    },
    currentIndex: {
      type: Number,
      default() {
        return 0
      }
    }
  },
  mounted() {
    // console.log(this.imgList, this.currentIndex);
    
  },
  methods: {
    handleClick() {
      //当被点击的时候跳转将传过来的数据传入到全局
      console.log('-----');
      
      getApp().globalData.imgList = this.imgList;
      getApp().globalData.currentIndex = this.currentIndex;
      //跳转页面
      uni.navigateTo({
        url: '/pages/albumDetail/index'
      })
    }
  }
};
</script>

<style>
</style>