Page({

  /**
   * 页面的初始数据
   */
  data: {
    time:60,
    ifo:false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },
  getSmsCode(){
    var that = this
    var timer = setInterval(function () {
      that.data.time--
      that.setData({
        time: that.data.time,
        ifo: true
      })
      if (that.data.time<=0){
        clearInterval(timer)
        that.data.time = 60
        that.setData({
        ifo: false
      })
    }
    }, 100) //循环时间 这里是1秒    
    
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