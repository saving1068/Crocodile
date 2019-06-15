var Api = require("../../Api/Api.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    a:"",
    type:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.setData({
      a: options.a
    })
    this.getMsgList()
    if (options.a == 2){
      wx.setNavigationBarTitle({
        title: '系统通知'
      })
    } else if (options.a == 3){
      Api.PraiseSwitch(this.data.a).then((res) => {
        console.log(res)
      })
      wx.setNavigationBarTitle({
        title: '收益通知'
      })
    }
  },
  getMsgList(){
    Api.MsgList(this.data.a).then((res)=>{
      var data = res.data.q.msgs;
      this.setData({
        list: data
      })
    })
  },
  goToDetail(e){
    var item = e.currentTarget.dataset;
    if (item.num == 1){
        console.log("商品")
        console.log(item)
        this.PraiseSwitch(e)
        wx.navigateTo({
          url: '../goodsDetail/goodsDetail?skuId=' + item.skuid + "&spuId=" + item.spuid + '&type=' + this.data.type
        })
    } else if (item.num == 2){
        console.log("文章")
        this.PraiseSwitch(e)
        wx.navigateTo({
          url: '../ArticleDetails/ArticleDetails?id=' + item.spuid
        })
      }

  },
  PraiseSwitch(e){
    Api.PraiseSwitch(this.data.a, e.currentTarget.dataset.id).then((res)=>{
      console.log(res)
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
    this.getMsgList()
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