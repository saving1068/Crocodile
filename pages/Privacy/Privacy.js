// pages/Privacy/Privacy.js
const Api = require('../../Api/Api');
const WxParse = require('../../wxParse/wxParse.js');
const App = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
        title:"",
        content:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this
    Api.getQuerySetting("用户隐私").then((res)=>{
    if(res.data.q.s==0){
      Api.ArticleDetails(res.data.q.settings.value).then((res)=>{
        console.log(res)
        if (res.data.q.s == 0){
          WxParse.wxParse('article', 'html', res.data.q.article.content, that, 5);
         this.setData({
           title: res.data.q.article.title

         })

        }
      })

    }
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