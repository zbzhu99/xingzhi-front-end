// pages/GeRenInfo/GeRenInfo.js
//获取应用实例
const app = getApp()

Page({
  /**
   * 页面的初始数据
   */
  data: {
    GeRenInfo: [],
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    userInfoAvatar: '',
  },
  /**提交个人信息保存 */
  saveMyInfo: function (e) {
    var that = this
    wx.request({
      // url: 'http://127.0.0.1:8000/user/update/',
      url: 'https://scuxingzhi.top:8080/user/update/',
      method: 'POST',
      data: {
        open_id: app.globalData.openid,
        name: e.detail.value.name,
        phone_num: e.detail.value.phone_num,
        department: e.detail.value.department,
        student_id: e.detail.value.student_id,
        email: e.detail.value.email
      },
      success: function (res) {
        app.globalData.is_filled = res.data.is_filled
        console.log(res.data.name)
        wx.setStorage({
          key: 'userData',
          data: {
            name: res.data.name,
            phone_num: res.data.phone_num,
            department: res.data.department,
            student_id: res.data.student_id,
            email: res.data.email
          }
        })
        that.setData({
          modalName: "Modal"
        })
      }
    })
    console.log('提交了个人信息', e.detail.value)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  getGeRenInfo() {
    let that = this
    var jsonData = require('../../data/geren_info.js')
    that.setData({
      GeRenInfo: jsonData.gerenInfoList,
    })
    wx.getStorage({
      key: 'userData',
      success(res) {
        console.log(res.data)
        that.setData({
          GeRenInfo: res.data
        })
      }
    })
  },
  onLoad: function (options) {
    var that = this
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
        console.log('获取失败！')
      },
      complete: function () {
        // complete
        console.log('获取用户信息完成！')
      },
    })
    this.getGeRenInfo()
    wx.getUserInfo({
      success: (res) => {
        console.log(res) //获取的用户信息还有很多，都在res中，看打印结果
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true,
        })
      },
    })
  },

  hideModal(e) {
    this.setData({
      modalName: null
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {},

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {},
})
