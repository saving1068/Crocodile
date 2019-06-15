var Api = require("../../Api/Api.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentTab: 0,   // tab切换  
    swiperHeight: 0,
    swiperList: [1, 2],
    a: 1,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getAdList()
    this.getArticleListDate(this.data.a)
  },
  goToArtucleD(e) {
    console.log(e.currentTarget.dataset.aid)
    wx.navigateTo({
      url: '../ArticleDetails/ArticleDetails?id=' + e.currentTarget.dataset.aid,
    })
  },
  gainOneHeight(e) {
    var that = this;
    var query = wx.createSelectorQuery()
    var nodeID = "#item_0";
    query.select(nodeID).boundingClientRect()
    query.selectViewport().scrollOffset()
    query.exec(function (res) {
      // res[0].top       // #the-id节点的上边界坐标
      // res[1].scrollTop // 显示区域的竖直滚动位置
      console.log(res)
      that.setData({
        swiperHeight: (res[0].height) * 2 + 180+"rpx"
      })
    })
  },
  gainHeight(e) {//获取元素高度
    var that = this;
    var query = wx.createSelectorQuery()
    var nodeID = "#item_" + e.detail.current;
    query.select(nodeID).boundingClientRect()
    query.selectViewport().scrollOffset()
    query.exec(function (res) {
      // res[0].top       // #the-id节点的上边界坐标
      // res[1].scrollTop // 显示区域的竖直滚动位置
      console.log(res)
      that.setData({
        swiperHeight: (res[0].height) * 2 + 180+"rpx"
      })
    })
  },
  bindChange: function (e) {
    var that = this;
    that.setData({ currentTab: e.detail.current });
    this.gainHeight(e)//获取元素高度
    if (e.detail.current == 0) {
      let data = Number(e.detail.current) + 1;
      console.log(data)
      this.getArticleListDate(data)
    } else if (e.detail.current == 1) {
      let data = Number(e.detail.current) + 1;
      console.log(data)
      this.getArticleListDate(data)
    }
  }, 
  swichNav: function (e) {
    // console.log(e.target.dataset.current)
    var that = this;
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current
      })
      if (e.target.dataset.current == 0) {
        let data = Number(e.target.dataset.current) + 1;
        // console.log(data)
        this.getArticleListDate(data)
      } else if (e.target.dataset.current == 1) {
        let data = Number(e.target.dataset.current) + 1;
        // console.log(data)
        this.getArticleListDate(data)
      }
    }
  }, getArticleListDate(a) {
    Api.getArticleListDate(a, 9, 1, 20).then((res => {
      var data = res.data.q.articles
      console.log(data)
      this.setData({
        swiperList: data
      })
      // this.gainOneHeight()
    }))
  },
  getAdList() {
    Api.getAdList(12).then((res => {
      this.setData({
        titleImg: res.data.q.ads[0].imagePath
      })
    }))
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
    console.log(this.data.currentTab)
    if (this.data.currentTab==0){
      this.getArticleListDate(1)
    }else{
      this.getArticleListDate(2)
    }
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