
Page({
    data:{
        url:''
    },
  onShareAppMessage: function () {
    return {
      title: '今天吃什么',
      success: function(res) {
        // 分享成功
      },
      fail: function(res) {
        // 分享失败
      }
    }
  }
})