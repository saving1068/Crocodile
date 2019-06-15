// pages/orders.js
var Api = require("../../Api/Api.js")
const app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentTab: 0,   // tab切换  
    swiperHeight: 320,
    swiperList: [],
    content:"已提醒发货"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // new app.ToastPannel();
    
    
  },
  _confirmEvents() {//组件确定
    wx.getUserInfo({
      success: (res) => {
        console.log(this.data.shopId)
        Api.OrderUpdate(4, this.data.shopId).then((res) => {
          console.log(res)
          if (res.data.q.d == "操作成功") {
            console.log("组件确定成功")
            this.getOrderList()
            this.dialogs.hideDialog();
          }
        })
       
      }
    })
  },
  _cancelEvents() {//取消让组件消失
    console.log("用户取消")
    this.dialogs.hideDialog();
  },
  confirmOrder(e){//确认收货
    this.data.shopId = e.currentTarget.dataset.shopid;
    console.log(this.data.shopId)
    this.dialogs.showDialog();
  },
  remindOrder(e){//提醒收货
    Api.OrderUpdate(5,e.currentTarget.dataset.shopid).then((res) => {
      console.log(res)
      if (res.data.q.d == "操作成功") {
        this.show(this.data.content)
        
      }else{
        console.log("操作失败")
      }
    })
    
  },
  deleteOrder(e) {//删除订单，在组件调用函数
    this.data.shopId = e.currentTarget.dataset.shopid;
    this.dialog.showDialog();
  },
  goToLogistics(e){
    if (e.currentTarget.dataset.isShowLogistics == 1){
      wx.navigateTo({
        url: '../Logistics/Logistics',
      })
    }else{
      this.show("目前小程序不开通此订单物流查询，请下载app查看")
    }
   
  },
  getOrderList(){
    Api.getOrderList({status:99}).then((res)=>{
      var data = res.data.q.orders
      console.log(data)
      var waitArr = [] //待收货
      var Consignment = [] //待发货
      for(var i=0;i<data.length;i++){
        if (data[i].status == 3) {//待发货
          Consignment.push(data[i])
        } else if (data[i].status == 6){
          waitArr.push(data[i])//待收货
        }
      }
      this.setData({
        swiperList: data,
        waitArr,
        Consignment
      })
      // this.gainOneHeight()
    })
    console.log(this.data.waitArr,"待收货")
    console.log(this.data.swiperList,"全部订单")
    console.log(this.data.Consignment,"待发货")
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
      if (that.data.swiperList.length == 0){
        console.log("没有数据")
        that.setData({
          swiperHeight: 1090 + "rpx"
        })
      }else{
        that.setData({
          swiperHeight: (res[0].height) * 2 + "rpx"
        })
      }
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
      that.setData({
        swiperHeight: (res[0].height) * 2 + "rpx"
      })
    })
  },
  bindChange: function (e) {
    var that = this;
    // console.log(e.detail.current,121321)
    that.setData({ 
      currentTab: e.detail.current,
      leftNum: e.detail.current * 33
    });
  },
  swichNav: function (e) {
    console.log(e.target.dataset.current)
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
  goToOrdersD(e){
    console.log(e)
    wx.navigateTo({
      url: '../ordersD/ordersD?id=' + e.currentTarget.dataset.id,
    })
  },
  goToGoodListD(e){
    console.log(e.currentTarget.dataset.spuid)
    wx.navigateTo({
      url: '../goodsDetail/goodsDetail?skuId=' + e.currentTarget.dataset.skuid + '&spuId=' + e.currentTarget.dataset.spuid+"&type=0",
    })
  },
  goToGoodList(){
    wx.switchTab({
      url: '../goods/goods',
    })
  },
  _confirmEvent() {//组件确定删除
    wx.getUserInfo({
      success: (res) => {
        Api.OrderUpdate(2,this.data.shopId).then((res) => {
          console.log(res)
          if (res.data.q.d == "操作成功") {
            this.dialog.hideDialog();
            this.getOrderList()
          }
        })
        
      }

    })

  },
  _cancelEvent() {//取消让组件消失
    this.dialog.hideDialog();
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
    this.dialog = this.selectComponent("#dialog");//删除订单组件
    this.dialogs = this.selectComponent("#dialogs");//确认收货组件
    new app.ToastPannel();

    this.getOrderList()
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