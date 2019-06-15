var Api = require("../../Api/Api.js")
const WxParse = require('../../wxParse/wxParse.js');
const App = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {0
    var userId = options.shareBy
    if (userId != "" && userId != undefined) {
      App.globalData.userId = userId
    } else {
      console.log(App.globalData.userId, "userId", "没有ID")
    }
    console.log(options.id)
    this.setData({
      id: options.id
    })
    this.getArticleDetails()
    this.PraiseSwitch()
  },
  getArticleDetails(){
    Api.ArticleDetails(this.data.id).then((res)=>{
      var that = this;
      var data = res.data.q.article;
      WxParse.wxParse('article', 'html', data.content, that, 5);
      this.setData({
        title: data.title,
        img: data.converedImageUrl
      })
      console.log(res)
    })
  },
  PraiseSwitch() {
    Api.PraiseSwitch(1, this.data.id).then((res) => {
      console.log(res)
    })
  },
  goToHome(){
    wx.switchTab({
      url: '../index/index',
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
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: '美丽领吧',
      path: 'pages/ArticleDetails/ArticleDetails?id='+this.data.id,
      imageUrl: "../../Images/logo.png"
    }
  }
})