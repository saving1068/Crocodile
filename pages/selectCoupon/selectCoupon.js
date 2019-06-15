// pages/selectCoupon/selectCoupon.js
const Api = require('../../Api/Api')
const App = getApp()


Page({

  /**
   * 页面的初始数据
   */
  data: {
    skuId:0,
    spuId:0,
    type:0,
    currentTab:0,
    leftNum:21,
    width:8,
    couponId:0
   
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   this.setData({
     skuId: options.skuId,
     spuId: options.spuId,
     type: options.type

   })
  
   this.getData()
  },
  goPer(e){
  this.setData({
    couponId: e.currentTarget.dataset.couponid
  })
  App.globalData.couponId = this.data.couponId
  console.log(e)
   wx.navigateBack({
     delta: 1
   })
  },
  swichNav(e){
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      if (e.target.dataset.current==0){
        this.setData({
          currentTab: e.target.dataset.current,
          leftNum:21,
          width:8
        })
      }else{
        this.setData({
          currentTab: e.target.dataset.current,
          leftNum: 68,
          width: 14
        })
      }

     
    }


  },

  getData(){
   var obj={
     "a": this.data.type,
     "note": "",
     "skuId": this.data.skuId,
     "spuId": this.data.spuId,
     "num": 1
   }
  Api.getOrderSubmit(obj).then((res)=>{
    console.log(res)
    let list = res.data.q
    this.data.catusecoupons = list.catusecoupons
    this.data.nocatusecoupons = list.nocatusecoupons
    this.setData({
      catusecoupons: this.data.catusecoupons,
      nocatusecoupons: this.data.nocatusecoupons
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