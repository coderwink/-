<template>
  <view>
    <!-- 用户头像-->
    <view class="album_user">
      <view class="album_user_avatar">
        <image :src="detailData.user.avatar"></image>
      </view>
      <view class="album_user_info">
        <view class="album_user_name">{{ detailData.user.name }}</view>
        <view class="album_user_time">{{ detailData.atime | betterTime }}</view>
      </view>
    </view>
    <!-- banner -->
    <view class="album_banner" v-if="detailData.thumb">
      <swiper-action
        :currentIndex="currentIndex"
        :imgList="getImgList"
        @changIndex="handleChangIndex"
      >
        <image :src="getNewThumb" mode="widthFix"></image>
      </swiper-action>
    </view>
    <!-- 点赞 -->
    <view class="collect">
      <text class="iconfont iconlike">{{ detailData.rank }}</text>
      <text class="iconfont iconcollect"> 收藏 </text>
    </view>
    <!-- 相关专辑 -->
    <view class="album_about">
      <view>相关</view>
      <view class="album_about_wrap" v-for="item in album" :key="item.id">
        <view class="album_about_left">
          <image :src="item.cover" mode="aspectFill"></image>
        </view>
        <view class="album_about_right">
          <view class="album_text">专辑</view>
          <view class="album_about_name">{{ item.name }}</view>
          <view class="iconfont iconright">&#xe64c;</view>
        </view>
      </view>
    </view>
    <!-- 最热评论 -->
    <view class="album_hot" v-if="hot.length">
      <view class="iconfont iconhot">最热评论</view>
      <view v-for="item in hot" :key="item.id">
        <view class="album_hot_userinfo">
          <view class="album_hot_avatar">
            <image :src="item.user.avatar"></image>
          </view>
          <view class="album_hot_name">{{ item.user.name }}</view>
          <view
            class="album_hot_icon"
            v-for="itemz in item.user.title"
            :key="itemz.name"
          >
            <image :src="itemz.icon"></image>
          </view>
        </view>
        <view class="album_hot_content">
          <text class="hot_content">{{ item.content }}</text>
          <text class="iconfont">&#xe64b;{{ item.size }}</text>
        </view>
      </view>
    </view>
    <view class="album_new" v-if="comment.length">
      <view v-for="item in comment" :key="item.id" class="best_bug">
        <view class="iconfont iconnew">最新评论</view>
        <view class="album_date">{{ item.atime | betterTime }}</view>
        <view class="album_comment_userinfo">
          <view class="album_comment_avatar">
            <image :src="item.user.avatar" mode="widthFix"></image>
          </view>
          <view class="album_comment_name">{{ item.user.name }}</view>
          <view
            class="album_comment_icon"
            v-for="itemy in item.user.title"
            :key="itemy.name"
          >
            <image :src="itemy.icon"></image>
          </view>
        </view>
        <view class="album_comment_content">
          <text class="comment_content">{{ item.content }}</text>
          <text class="iconfont">&#xe64b;{{ item.size }}</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import swiperAction from "@/pages/compontents/swiperAction";
import moment from "moment";
moment.locale("zh-cn");
export default {
  data() {
    return {
      detailData: {},
      album: [],
      comment: [],
      hot: [],
      id: 0,
      currentIndex: 0,
      imgList: []
    };
  },
  onLoad() {
    //将全局数据传过来
    let { imgList, currentIndex } = getApp().globalData;
    //把我们的传过来的数据做一个赋值
    this.currentIndex = currentIndex;
    this.imgList = imgList;
    this.detailData = imgList[this.currentIndex];
    this.getComment(this.detailData.id);
  },
  methods: {
    getComment(id) {
      this.$request({
        url: `http://157.122.54.189:9088/image/v2/wallpaper/wallpaper/${id}/comment`
      }).then(result => {
        this.album = result.res.album;
        this.hot = result.res.hot;
        this.comment = result.res.comment;
      });
    },
    handleChangIndex(payload) {
      if (payload === "left" && this.currentIndex < this.imgList.length - 1) {
        this.currentIndex++;
        this.detailData = this.imgList[this.currentIndex];
        this.getComment(this.detailData.id);
      } else if (payload === "right" && this.currentIndex > 0) {
        this.currentIndex--;
        this.detailData = this.imgList[this.currentIndex];
        this.getComment(this.detailData.id);
      } else {
        uni.showToast({
          title: "没有了数据了"
        });
      }
    }
  },
  computed: {
    getNewThumb() {
      return this.detailData.thumb;
    },
    getImgList() {
      if (this.imgList) {
        return this.imgList;
      }
    }
  },
  filters: {
    betterTime(value) {
      return moment(value * 1000).fromNow();
    }
  },
  components: {
    swiperAction
  }
};
</script>

<style lang='scss' scoped>
.album_user {
  display: flex;
  padding: 30rpx;

  .album_user_avatar {
    image {
      width: 80rpx;
      height: 80rpx;
      border-radius: 50%;
    }
  }

  .album_user_info {
    margin-left: 10rpx;

    .album_user_name {
      font-size: 32rpx;
      font-weight: 600;
    }

    .album_user_time {
      font-size: 24rpx;
      color: #666;
    }
  }
}

.album_banner {
}

.collect {
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 20rpx;
  border: 1rpx solid #ccc;

  .iconfont {
  }

  .iconlike {
  }

  .iconcollect {
  }
}

.album_about {
  .album_about_wrap {
    padding: 10rpx;
    display: flex;
    border-bottom: 3rpx solid rgb(184, 176, 176);

    .album_about_left {
      flex: 1;

      image {
        width: 200rpx;
        height: 200rpx;
      }
    }

    .album_about_right {
      position: relative;
      margin-left: 20rpx;
      flex: 3;

      .album_text {
        text-align: center;
        width: 88rpx;
        background-color: $color;
        color: #fff;
      }

      .iconright {
        font-size: 50rpx;
        width: 40rpx;
        height: 40rpx;
        position: absolute;
        right: 100rpx;
        bottom: 100rpx;
        background-color: aqua;
      }

      .iconfont {
      }

      .album_about_name {
      }
    }
  }
}

.album_hot {
  padding: 10rpx;

  .iconhot {
    font-size: 28rpx;
    font-weight: 600;
    margin-bottom: 20rpx;
  }

  .album_hot_userinfo {
    display: flex;

    .album_hot_avatar {
      width: 80rpx;

      image {
        width: 80rpx;
        height: 80rpx;
      }
    }

    .album_hot_name {
      flex: 1;
      padding: 10rpx;
      color: #ccc;
    }

    .album_hot_icon {
      image {
        width: 50rpx;
        height: 50rpx;
      }
    }
  }

  .album_hot_content {
    display: flex;
    justify-content: space-between;
    padding: 40rpx;

    .hot_content {
    }

    .iconfont {
    }
  }
}

.album_new {
  padding: 10rpx;

  .iconnew {
    font-size: 28rpx;
    font-weight: 600;
    margin-bottom: 20rpx;
  }

  .album_comment_userinfo {
    display: flex;

    .album_comment_avatar {
      width: 80rpx;
      height: 80rpx;
    }

    .album_comment_name {
      flex: 1;
      padding: 10rpx;
      color: #ccc;
    }

    .album_comment_icon {
      image {
        width: 50rpx;
        height: 50rpx;
      }
    }
  }

  .album_comment_content {
    display: flex;
    justify-content: space-between;
    padding: 40rpx;

    .comment_content {
    }

    .iconfont {
    }
  }
}

.album_date {
  position: absolute;
  z-index: 9;
  font-size: 28rpx;
  left: 110rpx;
  top: 130rpx;
  color: #ccc;
}

.best_bug {
  position: relative;
}
</style>