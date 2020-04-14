// pages/Mine/Mine.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    nickName: '',
    userInfoAvatar: '',
  }, 

  //跳转到我的信息
  jumptoMyInfo:function(event){
    wx.navigateTo({
      url: './GeRenInfo/GeRenInfo',
      success: function () {
        console.log("jump success to GeRenInfo")
      }
    })
  },
  // 跳转到已发布活动
  jumptoRelease:function(event){
    wx.navigateTo({
      url: './release/release',
      success:function(){
        console.log("jump success to release")
      }
    })
  },
  // 跳转到意见反馈
  jumptoAdvice: function (event) {
    wx.navigateTo({
      url: './propose/propose',
      success: function () {
        console.log("jump success to propose")
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    var that = this;
    wx.getUserInfo({
      success: function (res) {
        // success
        that.setData({
          nickName: res.userInfo.nickName,
          userInfoAvatar: res.userInfo.avatarUrl,
        })
      },
      fail: function () {
        // fail
        console.log("获取失败！")
      },
      complete: function () {
        // complete
        console.log("获取用户信息完成！")
      }
    })
  },
 
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})