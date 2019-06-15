const app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    skuId: 487,
    spuId: 495,
    type:0,
    gohome:false,
    orderId:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.setData({
      skuId: options.skuId,
      spuId: options.spuId,
      orderId: options.orderId
    })
  },
  goTogoodList(){
    wx.navigateTo({
      url: '../ordersD/ordersD?id=' + this.data.orderId+"&type="+1,
    })
  },
  goToHome(){
    app.globalData.goHome=true
    wx.switchTab({
      url: '/pages/index/index',
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
    if (!app.globalData.goHome ) {
   
    }else{
      app.globalData.goHome=false
    }
   
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
  onShareAppMessage: function (res) {
    console.log(this.data.skuId, this.data.spuId, this.data.type)
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: '美丽领吧',
      path: 'pages/goods/goods',
      imageUrl:"../../Images/logo.png"
    }
  }
})