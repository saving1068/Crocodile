var Api = require("../../Api/Api.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    
  },
  getQueryAdvices(){
    Api.QueryAdvices().then((res)=>{
      console.log(res)
      var data = res.data.q.advices;
      this.setData({
        notice_num:data[0].num,//系统通知
        order_num:data[2].num,//订单通知
        money_num:data[1].num//收益通知
      })
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getQueryAdvices()
  },
  goToNotice(e){
    console.log(e.currentTarget.dataset.action)
        wx.navigateTo({
          url: '../notice/notice?a=' + e.currentTarget.dataset.action,
        })
  },
  goTOcustomerservice(){//去客服
      wx.switchTab({
        url: '../customerservice/customerservice',
      })
  },
  goToLogistics(){//物流
    wx.navigateTo({
      url: '../game/game',
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
    this.getQueryAdvices()
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