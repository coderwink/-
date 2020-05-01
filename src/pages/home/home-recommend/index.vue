<template>
  <view>
    <!-- list -->
    <scroll-view
      scroll-y
      class="scroll_content"
      @scrolltolower="loadMore"
      @scroll="scroll"
    >
      <view class="recommend_wrap">
        <navigator
          class="recommend_item"
          v-for="item in recommend"
          :key="item.id"
          :url="`/pages/album/index?id=${item.target}`"
        >
          <image image :src="item.thumb" mode="widthFix"></image>
        </navigator>
      </view>
      <!-- 月份 -->
      <view v-if="isShow">
        <view class="recommend_head">
          <view class="recommend_info">
            <view class="recommend_date">
              <text>{{ monthDate.DD }}/</text>
              {{ monthDate.MM }} 月
            </view>
            <view class="recommend_title">{{ monthDate.title }}</view>
          </view>
          <view class="recommend_more">更多 ></view>
        </view>
        <view class="recommend_content">
          <view
            v-for="(item, index) in monthDate.items"
            :key="item.id"
            class="recommend_content_image"
          >
          <album-detail :imgList="monthDate.items" :currentIndex="index" >
            <image
              :src="item.img + item.rule.replace('$<Height>', 320)"
              mode="aspectFill"
            ></image>
          </album-detail>
          </view>
        </view>
      </view>
      <!-- 下拉加载更多 -->
      <view class="host_wrap">
        <view class="host_title">
          <text>热门</text>
        </view>
        <view class="host_content">
          <view v-for="(item, index) in hots" :key="item.id" class="host_item">
            <album-detail :imgList="hots" :currentIndex="index" >
              <image :src="item.thumb"></image>
            </album-detail>
          </view>
        </view>
      </view>
    </scroll-view>
  </view>
</template>
<script>
import moment from "moment";
import albumDetail from "@/pages/compontents/albumDetail";
export default {
  data() {
    return {
      recommend: [],
      monthDate: {},
      hots: [],
      isShow: false,
      hotList: {
        limit: 30, //获取多少数据， 跳过多少条
        order: "hot",
        skip: 0
      },
      isHave: true
    };
  },
  mounted() {
    this.getData();
  },
  created() {
    uni.setNavigationBarTitle({
      title: "首页"
    });
  },
  destroyed() {
    //为了实现页面的返回记录位置功能
  },
  methods: {
    loadMore() {
      //1修改参数 skip+=limit  这个limit是限制每一次请求的数值固定为30所以不需要修改他 你脑壳混？ 只要让每一次调用都加上30就行
      if (this.isHave) {
        this.hotList.skip += this.hotList.limit;
        this.getData();
      } else {
        uni.showToast({
          title: "没有数据啦",
          icon: "none"
        });
      }
    },
    getData() {
      return this.$request({
        url: "http://157.122.54.189:9088/image/v3/homepage/vertical",
        data: this.hotList
      }).then(result => {
        // 推荐数据获取
        if (this.recommend.length === 0) {
          this.recommend = result.res.homepage[1].items;
          // console.log(result.res.homepage[1].items);
          //月份数据获取
          this.monthDate = result.res.homepage[2];
          this.monthDate.MM = moment(this.monthDate.stime).format("MM");
          this.monthDate.DD = moment(this.monthDate.stime).format("DD");
          this.isShow = true;
          // console.log(this.monthDate);
          // console.log(this.monthDate.MM);
          // console.log(this.monthDate.DD);
        }
        //热们
        if (result.res.vertical.length === 0) {
          this.isHave = false;
          return;
        }
        this.hots = [...this.hots, ...result.res.vertical];
        // this.hots = result.res.vertical;
        // console.log(this.hots);
      });
    },
    scroll(e) {
      // console.log(e.detail.scrollTop);
    }
  },
  components: {
    albumDetail
  }
};
</script>

<style scoped lang='scss' scoped>
.scroll_content {
  height: calc(100vh - 36px);
}

.recommend_wrap {
  margin-top: 20rpx;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;

  //  width: 100%;
  .recommend_item {
    border: 1% solid #fff;
    width: 48%;
  }
}

.recommend_head {
  padding: 20rpx;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .recommend_info {
    display: flex;
    font-weight: 600;

    .recommend_date {
      color: $color;
      font-size: 30rpx;

      text {
        font-size: 36rpx;
        margin-right: 10rpx;
      }
    }

    .recommend_title {
      font-size: 34rpx;
      margin-left: 40rpx;
      color: #666;
    }
  }

  .recommend_more {
    font-size: 28rpx;
    color: $color;
  }
}

.recommend_content {
  display: flex;
  flex-wrap: wrap;

  .recommend_content_image {
    width: 33%;
    border: 1rpx solid #fff;
  }
}

.host_wrap {
  .host_title {
    padding: 20rpx;
  }

  .host_content {
    display: flex;
    flex-wrap: wrap;

    .host_item {
      width: 33%;
      border: 1rpx solid #fff;
    }
  }
}
</style>