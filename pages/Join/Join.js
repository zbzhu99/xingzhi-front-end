// pages/Release/Release.js
// var dataObj = require("../../data/act_list.js");
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    // actiList: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // this.getActiList()
    var that = this;
    // that.setData({
      // actList: dataObj.actList
    // })
    wx.getUserInfo({
      success: function (res) {
        that.setData({
          userInfoAvatar: res.userInfo.avatarUrl,
        })
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
    var that = this
    wx.request({
      url: app.globalData.URL + '/enroll/user/',
      method: 'POST',
      data: {
        open_id: app.globalData.openid
      },
      success: function (res) {
        that.setData({
          actiList: res.data,
        })
        console.log(that.data.actiList)
      }
    })
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