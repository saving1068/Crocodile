var Api = require("../../Api/Api.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    num:0,
    currentTab:0,
    a:0,
    type:0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getMarketingMemberList(this.data.a,this.data.type)
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
        swiperHeight: (res[0].height) * 2 + "rpx"
      })
    })
  },
  gainHeight(e) {//获取元素高度
    var that = this;
    var query = wx.createSelectorQuery()
    var nodeID = "#item_" + e.detail.current;
    console.log(e.detail.current)
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
  gainHeight_ohter() {//获取元素高度
    var that = this;
    var query = wx.createSelectorQuery()
    var nodeID = "#item_0";
    console.log()
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
    // console.log(e.detail.current)
    that.setData({
      currentTab: e.detail.current,
      leftNum: e.detail.current * 33
    });
    this.gainHeight(e)//获取元素高度
  },
  swichNav: function (e) {
    // console.log(e.target.dataset.current,"type")
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
  bindChange_1(i){
    if (i.currentTarget.dataset.num == 0){
      console.log("全部代言人")
      this.setData({
        num:0,
        currentTab:0,
        a:0,
      })
      this.getMarketingMemberList(this.data.a, this.data.type)
      this.gainHeight_ohter()
    } else if (i.currentTarget.dataset.num == 1){
      console.log("一级代言人")
      this.setData({
        num:1,
        currentTab: 0,
        a: 1,
      })
      this.getMarketingMemberList(this.data.a, this.data.type)
      this.gainHeight_ohter()
    } else if (i.currentTarget.dataset.num == 2){
      console.log("二级代言人")
      this.setData({
        num:2,
        currentTab: 0,
        a: 2,
      })
      this.getMarketingMemberList(this.data.a, this.data.type)
      this.gainHeight_ohter()
    }
  },
  getMarketingMemberList(a,type){//全部代言人
    Api.getMarketingMemberList(a,0).then((res)=>{
      var data = res.data.q.memberList;
      console.log(data)
      var otherArr =[];
      var VipArr = [];
      for (var i = 0; i < data.length;i++){
        if (data[i].grade ==1){
          // console.log("普通用户")
          otherArr.push(data[i])
        }else{
          // console.log("vip用户")
          VipArr.push(data[i])
        }
      }
      // console.log(otherArr)
      // console.log(VipArr)
      var OneNum = [];
      var TwoNum = [];
      for (var i = 0; i < data.length; i++){
        if (data[i].weight==1){
          OneNum.push(data[i])
        }else{
          TwoNum.push(data[i])
        }
      }
      this.setData({
        allList:data,
        otherArr,
        VipArr,
        allNum:data.length,
        OneNum: OneNum.length,
        TwoNum: TwoNum.length
      })
      this.gainOneHeight()
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