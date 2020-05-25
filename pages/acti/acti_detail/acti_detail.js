// pages/acti/acti_detail/acti_detail.js
const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    TabCur: 0,
    scrollLeft: 0,
    choose: ['活动详情', '报名详情'],
    actiList: {},
    curId: 0,
    nameList: [],
    relation: null,
    modalContent: null,
    modalName: null
  },
  /**抽取 */
  fxselect: function (e) {
    console.log('提交了所需人数', e.detail.value)
  },
  getNameList() {
    /**名单*/
    let that = this
    var jsonData = require('../../../data/signed.js')
    console.log(jsonData.nameList)
    that.setData({
      nameList: jsonData.nameList,
    })
  },
  tabSelect(e) {
    this.setData({
      TabCur: e.currentTarget.dataset.id,
      scrollLeft: (e.currentTarget.dataset.id - 1) * 60,
    })
  },
  /**获取活动信息 */
  getActiList(Id) {
    let that = this
    wx.request({
      url: app.globalData.URL + '/activity/info',
      data: {},
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: function (res) {
        // success
        for (var i = 0; i < res.data.length; ++i) {
          if (res.data[i].id == Id) {
            that.setData({
              actiList: res.data[i],
            })
            break
          }
        }
        // that.setData({
        //   actiList: res.data[Id - 1],
        // })
      },
      fail: function () {
        // fail
      },
      complete: function () {
        // complete
      },
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getNameList()
    var Id = options.id
    this.getActiList(Id)
    this.setData({
      curId: Id,
    })
  },
  sign: function (e) {
    var that = this
    wx.request({
      url: app.globalData.URL + '/enroll/create/',
      method: 'POST',
      data: {
        open_id: app.globalData.openid,
        activity_id: that.data.curId
      },
      success: function (res) {
        that.setData({
          modalName: 'Modal',
          modalContent: '报名成功'
        })
        that.onShow()
        // console.log("报名成功")
      }
    })
  },
  unsign: function () {
    var that = this
    wx.request({
      url: app.globalData.URL + '/enroll/delete/',
      method: 'POST',
      data: {
        open_id: app.globalData.openid,
        activity_id: that.data.curId
      },
      success: function (res) {
        that.setData({
          modalName: 'Modal',
          modalContent: '取消成功'
        })
        that.onShow()
        // console.log("取消报名!")
      }
    })
  },
  delete: function() {
    var that = this
    wx.request({
      url: app.globalData.URL + '/activity/delete/',
      method: 'POST',
      data: {
        open_id: app.globalData.openid,
        activity_id: that.data.curId
      },
      success: function (res) {
        that.setData({
          modalName: 'ModalDelete',
          modalContent: '删除成功'
        })
      }
    })
  },
  pick: function () {
    var that = this
    wx.request({
      url: app.globalData.URL + '/enroll/pick/',
      method: 'POST',
      data: {
        open_id: app.globalData.openid,
        activity_id: that.data.curId
      },
      success: function (res) {
        that.setData({
          modalName: 'Modal',
          modalContent: '抽取成功'
        })
        that.onShow()
      }
    })
  },

  hideModal: function () {
    var that = this
    that.setData({
      modalName: null,
      // modalContent: null
    })
  },
  hideModalDelete: function () {
    var that = this
    that.setData({
      modalName: null,
      // modalContent: null
    })
    wx.switchTab({
      url: '../../index/index',
    })
  },


  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that = this
    wx.request({
      url: app.globalData.URL + '/activity/relation/',
      method: 'POST',
      data: {
        open_id: app.globalData.openid,
        activity_id: that.data.curId
      },
      success: function (res) {
        console.log(res.data.relation)
        that.setData({
          relation: res.data.relation
        })
      }
    })
  },

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
