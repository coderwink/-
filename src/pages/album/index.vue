<template>
  <view>
    <!-- 头部分 -->
    <view class="detail_top">
      <view class="bg_image"
        ><image :src="album.cover" mode="widthFix"></image
      ></view>
      <view class="bg_title">
        <view class="bg_title_left">{{ album.name }}</view>
        <view class="bg_title_right"> 关注专辑 </view>
      </view>
    </view>
    <!-- 中部用户部分 -->
    <view class="detial_middle">
      <view class="user">
        <view class="user_avatar"
          ><image :src="album.user.avatar"></image
        ></view>
        <view class="user_name">{{ album.user.name }}</view>
      </view>
      <view class="content">
        <text>{{ album.desc }}</text>
      </view>
    </view>
    <view class="detail_bottom" >
      <!-- 虽然navigator能过去但是穿不了想要的参数 必须使用组件传参 -->
      <view class="detail_image_list" v-for="(item, index) in wallpaper" :key="item.id" >
        <album-detail :imgList="wallpaper" :currentIndex="index" >
          <image
            :src="item.thumb"
          ></image>
        </album-detail>
      </view>
    </view>
  </view>
</template>

<script>
import albumDetail from "@/pages/compontents/albumDetail";
export default {
  data() {
    return {
      params: {
        limit: 30,
        skip: 0,
        order: "new",
        first: 1 //第一次请求 两个数据都会拿到， 0的时候标识first
      },
      id: null,
      album: {},
      wallpaper: [],
      isHave: true
    };
  },
  onLoad(e) {
    this.id = e.id;
    // this.getData()
    this.getData(this.id);
  },
  onReachBottom() {
    if (this.isHave) {
      this.params.skip += this.params.limit;
      this.getData(this.id);
    } 
    else {
      uni.showToast({
        title: "没有数据啦",
        icon: "none"
      });
    }
  },
  methods: {
    getData(id) {
      return this.$request({
        url: `http://157.122.54.189:9088/image/v1/wallpaper/album/${id}/wallpaper`,
        data: this.params
      }).then(result => {
        if (Object.keys(this.album).length === 0) {
          this.album = result.res.album;
          this.first = 0;
        }
        if (result.res.wallpaper.length === 0) {
          this.isHave = false;
          uni.showToast({
            title: "没有数据啦",
            icon: "none"
          });
          return;
        }
        this.wallpaper = [...this.wallpaper, ...result.res.wallpaper];
      });
    }
  },
  components: {
    albumDetail
  }
};
</script>

<style lang='scss' scoped>
.detail_top {
  position: relative;
  .bg_image {
  }
  .bg_title {
    width: 750rpx;
    height: 80rpx;
    position: absolute;
    left: 0;
    bottom: 20rpx;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #fff;
    z-index: 9;
    .bg_title_left {
      //    width: 300rpx;
      //    height: 48rpx;
      font-size: 48rpx;
      margin-left: 15rpx;
    }
    .bg_title_right {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 172rpx;
      height: 60rpx;
      font-size: 28rpx;
      background-color: $color;
      border-radius: 10rpx;
      margin-right: 15rpx;
    }
  }
}
.detial_middle {
  padding: 20rpx 20rpx 40rpx;
  .user {
    display: flex;
    width: 100%;
    .user_avatar {
      image {
        width: 80rpx;
        height: 80rpx;
        border-radius: 50%;
      }
    }
    .user_name {
      padding-left: 20rpx;
      font-size: 32rpx;
      color: #000;
      font-weight: 600;
    }
  }
  .content {
    padding: 5rpx 0 20rpx;
  }
}
.detail_bottom {
  display: flex;
  flex-wrap: wrap;
  .detail_image_list {
    width: 33%;
    border: 1rpx solid #fff;
    image {
      height: 190rpx;
    }
  }
}
</style>