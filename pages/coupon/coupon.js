var Api = require("../../Api/Api.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentTab: 0,   // tab切换  
    leftNum: 0,
    swiperHeight: 0,
    allList:[],
    list:[],
    oldDate:[],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getCouponList()
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
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
      // console.log(res)
      that.setData({
        swiperHeight: (res[0].height) * 2 + "rpx"
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
        swiperHeight: (res[0].height) * 2 + "rpx"
      })
    })
  },
  bindChange: function (e) {
    var that = this;
    that.setData({
      currentTab: e.detail.current,
      leftNum: e.detail.current * 33
    });
    this.gainHeight(e)//获取元素高度
  },
  swichNav: function (e) {
    // console.log(e.target.dataset.current)
    var that = this;
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current,
        leftNum: e.target.dataset.current * 33
      })
    }

  },
  goToGoodList(){
   wx.switchTab({
     url: '../../pages/goods/goods',
   })
  },
  getCouponList(){
    Api.getCouponList(1,10,1,1,0).then((res)=>{
      console.log(res)
      var data = res.data.q.coupons;
      if(data.length == 0){
        this.setData({
          swiperHeight:1180+"rpx"
        })
      }else{
        var nowday = []
        var oldDate = [];
        var CouponEdList = [];
        //   var s = '2012-08-22 12:12:12';
        //   var a = s.split(/[^0-9]/);
        //   var d = new Date(a[0], a[1] - 1, a[2], a[3], a[4], a[5]);
        //  console.log(d.getTime());
        for (var i = 0; i < data.length; i++) {
          if (data[i].status == 2) {
            oldDate.push(data[i])
          } else if (data[i].status == 1) {
            nowday.push(data[i])
          } else if (data[i].status == 3){
            CouponEdList.push(data[i])
          }
        }
        this.setData({
          allList: data,
          list: nowday,
          oldDate,
          CouponEdList
        })
        this.gainOneHeight()
      }
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