var Api = require("../../Api/Api.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    type:0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getArticleListDate()
    this.getGoodsList()
  },
  getArticleListDate(){
    Api.getArticleListDate(1,15,1,1).then((res)=>{
      console.log(res)
      var data = res.data.q.articles[0]
      this.setData({
        headImg: data.imagePath,
        headText: data.summery,
        hedaId:data.id
      })
    })
  },
  getGoodsList(){
    Api.GoodsList({a:0}).then((res)=>{
      console.log(res)
      var data = res.data.q.goodses;
      this.setData({
        list:data
      })
    })
  },
  goToDetail(){
    wx.navigateTo({
      url: '../ArticleDetails/ArticleDetails?id=' + this.data.hedaId,
    })
  },
  goToGoodDetail(e){
    wx.navigateTo({
      url: '../goodsDetail/goodsDetail?skuId=' + e.currentTarget.dataset.skuid + '&spuId=' + e.currentTarget.dataset.spuid + '&type=' + this.data.type,
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