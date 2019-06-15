var Api = require("../../Api/Api.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[
      { img: "../../images/home_icon_gold@3x.png", name: "烟杆", price: 5656585},
      { img: "../../images/home_icon_silver@3x.png", name: "烟杆", price: 5656585 },
      { img: "../../images/home_icon_bronze@3x.png", name: "烟杆", price: 5656585 },
      { name: "烟杆", price: 5656585 }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getStarRanking()
  },
  getStarRanking(){
    Api.getStarRanking().then((res)=>{
      this.setData({
        list: res.data.q.rankings
      })
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