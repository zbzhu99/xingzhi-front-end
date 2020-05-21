// pages/newAct/newAct.js
var util = require('../../utils/util.js');
var dateTimePicker = require('../../utils/dateTimePicker.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    // time: '',
    // dateTimeArray: '',
    // dateTime: '',
    startYear: 2020,
    endYear: 2050,
    picker: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    region: ['四川省', '成都市', '双流区'],
    date: '',
    actdate:'',
    minDate: '',
    actminDate: '',
    imgList: [],
    picker2: ['普通活动', '特殊活动'],
  },

  //活动类型选择
  PickerChangeAct(e) {
    console.log(e);
    this.setData({
      index2: e.detail.value
    })
  },
  // 截至日期选择器
  DateChange(e) {
    this.setData({
      date: e.detail.value
    })
  },
  ActDateChange(e){
    this.setData({
      actdate: e.detail.value
    })
  },
  // DateTimeChange(e) {
  //   this.setData({
  //     dateTime: e.detail.value
  //   })
  // },
  // 地址选择器
  RegionChange: function (e) {
    this.setData({
      region: e.detail.value
    })
  },
  // 选择照片
  ChooseImage() {
    wx.chooseImage({
      count: 4, //默认9
      sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album'], //从相册选择
      success: (res) => {
        if (this.data.imgList.length != 0) {
          this.setData({
            imgList: this.data.imgList.concat(res.tempFilePaths)
          })
        } else {
          this.setData({
            imgList: res.tempFilePaths
          })
        }
      }
    });
  },
  ViewImage(e) {
    wx.previewImage({
      urls: this.data.imgList,
      current: e.currentTarget.dataset.url
    });
  },
  // 删除照片
  DelImg(e) {
    wx.showModal({
      title: '删除图片',
      content: '确定要删除吗？',
      cancelText: '取消',
      confirmText: '删除',
      success: res => {
        if (res.confirm) {
          this.data.imgList.splice(e.currentTarget.dataset.index, 1);
          this.setData({
            imgList: this.data.imgList
          })
        }
      }
    })
  },
  // 多行文本输入
  textareaBInput(e) {
    this.setData({
      textareaBValue: e.detail.value
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var DATE = util.formatDate(new Date());
  //   var TIME = dateTimePicker.dateTimePicker(this.data.startYear, this.data.endYear, util.formatDate2(new Date()))
  //   var lastArray = TIME.dateTimeArray;
  //   var lastTime = TIME.dateTime;
    this.setData({
      date: DATE,
      minDate: DATE,
      actdate: DATE,
      actminDate: DATE,
      // dateTime: TIME.dateTime,
      // dateTimeArray: TIME.dateTimeArray
    })
  // },
  // changeDateTimeColumn(e) {
  //   var arr = this.data.dateTime, dateArr = this.data.dateTimeArray;
  //   arr[e.detail.column] = e.detail.value;
  //   dateArr[2] = dateTimePicker.getMonthDay(dateArr[0][arr[0]], dateArr[1][arr[1]]);
  //   this.setData({
  //     dateTimeArray: dateArr,
  //     dateTime: arr
  //   });
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