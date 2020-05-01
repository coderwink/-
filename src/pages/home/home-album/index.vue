<template>
  <view>
    <!-- banner -->
    <scroll-view scroll-y class="scroll_content" @scrolltolower="handleLower">
      <view class="album_swiper_view">
        <swiper
          autoplay
          circular
          indicator-dots
          indicator-active-color="$color"
          class="album_swiper"
        >
          <swiper-item
            v-for="item in banner"
            :key="item.id"
            class="album_swiper_item"
          >
            <image :src="item.thumb" mode="widthFix"></image>
          </swiper-item>
        </swiper>
      </view>
      <!-- 列表 -->
      <view class="album_wrap">
        <navigator class="album_info" v-for="item in album" :key="item.id" :url="`/pages/album/index?id=${item.id}`">
          <view class="ablum_image">
            <image :src="item.cover" mode="aspectFill"></image>
          </view>
          <view class="ablum_content">
            <view class="ablum_name">{{ item.name }}</view>
            <view class="ablum_desc">{{ item.desc }}</view>
            <view class="ablum_focus"><text class="focus">+关注</text></view>
          </view>
        </navigator>
      </view>
    </scroll-view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      banner: [],
      album: [],
      isHave: true,
      params: {
        limit: 30,
        skip: 0,
        order: "new"
      },
      isHave: true
    };
  },
  created() {
    uni.setNavigationBarTitle({
      title: "专辑"
    });
  },
  mounted() {
    this.getDate();
  },
  methods: {
    getDate() {
      return this.$request({
        url: "http://157.122.54.189:9088/image/v1/wallpaper/album",
        data: this.params
      }).then(result => {
        // console.log(result);
        if (this.banner.length === 0) {
          this.banner = result.res.banner;
        }
        if (result.res.album.length === 0) {
          this.isHave = false;
          return;
        }
        this.album = [...this.album, ...result.res.album];
      });
    },
    handleLower() {
      if (this.isHave) {
        this.params.skip += this.params.limit;
        this.getDate();
      }else {
        uni.showToast({
          title: '没有数据啦',
          icon: 'none'
        })
      }
    }
  }
};
</script>

<style lang='scss' scoped>
.scroll_content {
  height: calc(100vh - 36px);
}
.album_swiper_view {
  .album_swiper_item {
  }
  .album_swiper {
    height: calc(750rpx / 2.3);
    .album_swiper_item {
      width: 100%;
    }
  }
}
.album_wrap {
  // padding: 20rpx 10rpx;
  .album_info {
    // padding: 5rpx;
    display: flex;

    .ablum_image {
      flex: 1;
      image {
        width: 200rpx;
        height: 200rpx;
      }
    }
    .ablum_content {
      display: flex;
      flex-direction: column;
      line-height: 100%;
      overflow: hidden;
      // padding: 3rpx;
      flex: 2;
      .ablum_name {
        padding: 10rpx 0;
        font-size: 32rpx;
        font-weight: 600;
      }
      .ablum_desc {
        font-size: 24rpx;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        padding: 20rpx 0;
      }
      .ablum_focus {
        align-self: flex-end;
        padding: 40rpx 0;
        .focus {
          font-size: 24rpx;
          color: $color;
          border: 1rpx solid $color;
        }
      }
    }
  }
}
</style>