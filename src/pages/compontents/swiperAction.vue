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
      startY: 0,
      startTime: 0,
      endX: 0,
      endTime: 0,
      direction: null
    };
  },
  methods: {
    handleTouchstart(e) {
      // console.log("我按下啦");
      /*
        1.用户往左边滑动 index++ 加载下一张
        2.用户往右边滑动 Index-- 加载上一张
        3.一个手指我就直接写死, 只坐左右 就不写y
      */
      this.startX = e.changedTouches[0].clientX;
      this.startY = e.changedTouches[0].clientY;
      
      this.startTime = Date.now();
      // console.log(this.startX);
    },
    handleTouchend(e) {
      // console.log("我松开啦");
      this.endX = e.changedTouches[0].clientX;
      let endY = e.changedTouches[0].clientY;
      this.endTime = Date.now();
      // console.log(this.endX);
      // console.log(this.startX - this.endX);
      if((this.endTime - this.startTime) < 100) {
        return;
      }
      if (Math.abs(this.startX - this.endX) > 20 && Math.abs(this.startY - endY) < 10) {
        this.direction = this.startX - this.endX > 0 ? "left" : "right";
      } else {
        return;
      }
      //所有条件满足的时候
      this.$emit("changIndex", this.direction);
    }
  }
};
</script>

<style>
</style>