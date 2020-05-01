export default (params) => {
  uni.showLoading({
    title: '正在加载'
  })
  return new Promise((resolve, reject) => { //异步promise 进行请求操作

    wx.request({
      ...params,
      success(res) {
        resolve(res.data)
      },
      fail(err) {
        reject(err)
      },
      complete() {
        uni.hideLoading()
      }
    })
  })
}