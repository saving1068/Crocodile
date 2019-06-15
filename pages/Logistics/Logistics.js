
const WxParse = require('../../wxParse/wxParse.js');
var Api = require("../../Api/Api.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    arr:[1,2,3],

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.getLogisticsTicketInfo(options.sn)
    this.getOrderDetails(options.id)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },
  getLogisticsTicketInfo(sn){
    Api.getLogisticsTicketInfo({sn}).then((res)=>{
      console.log(res)
      this.setData({
        arr:res.data.q.data
      })
    })
  },
  getOrderDetails(id){
    Api.getOrderDetails(id).then((res) => {
      console.log(res)
      let logistics = res.data.q.logistics;
      let payment = res.data.q.payment;
      let order = res.data.q.order;
      this.setData({
        logistics,
        payment,
        order
      })
    })
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