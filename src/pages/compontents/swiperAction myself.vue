<template>
  <view @touchstart="handleTouchstart" @touchend="handleTouchend">
    <slot></slot>
  </view>
</template>

<script>
export default {
  data() {
    return {
      startX: 0,
      startTime: 0,
      endX: 0,
      endTime: 0,
    };
  },
  props: {
    currentIndex: {
      type: Number,
      default() {
        return 0
      }
    },
    imgList: {
      type: Array,
      default() {
        return []
      }
    }
  },
  methods: {
    handleTouchstart(e) {
      console.log("我按下啦");
      /*
        1.用户往左边滑动 index++ 加载下一张
        2.用户往右边滑动 Index-- 加载上一张
        3.一个手指我就直接写死, 只坐左右 就不写y
      */
      this.startX = e.changedTouches[0].clientX;
      this.startTime = e.timeStamp;
      // console.log(this.startX);
    },
    handleTouchend(e) {
      console.log(this.imgList);
      
      console.log("我松开啦");      
      this.endX = e.changedTouches[0].clientX;
      this.endTime = e.timeStamp;
      // console.log(this.endX);
      // console.log(this.startX - this.endX);
      if (Math.abs(this.startX - this.endX) > 20) {
        if (this.startX - this.endX > 0 && this.currentIndex <  this.imgList.length - 1) {
          console.log("左滑动");
          this.$emit('leftSwiper', this.currentIndex++)
          console.log(this.currentIndex); 
        } 
        if( this.startX - this.endX < 0 && this.currentIndex >  0 ) {
           console.log("右滑动");
           this.$emit('rightSwiper', this.currentIndex--)
            
        }
      }
    }
  }
};
</script>

<style>
</style>