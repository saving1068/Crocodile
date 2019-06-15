// pages/cashier/cashier.js
const Api = require('../../Api/Api')
const App = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cash:0,
    haveCash:0,
    ShowType:false,
    mobile:"",
    orderId:0,
    spuId:0,
    skuId:0,
    payFlag:false
  },
  popup(){
    Api.PaySubmit({ orderId: this.data.orderId, payment: 12 }).then((res)=>{
      if(res.data.q.s==0){
       
        var wxJson = JSON.parse(res.data.q.wxPay)
        console.log(wxJson)
        wx.requestPayment({
          'timeStamp': wxJson.timeStamp,
          'nonceStr': wxJson.nonceStr,
          'package': wxJson.package,
          'signType': 'MD5',
          'paySign': wxJson.paySign,
          'success':(res)=>{
            wx.redirectTo({
            url: '../buysuccess/buysuccess?skuId=' + this.data.skuId + "&spuId=" + this.data.spuId + "&orderId=" + this.data.orderId,

   })
          },
          fail: (res)=>{
            console.log(res)
          },
          complete:(res)=>{
            console.log(res)
          }
        })

      }
     
      

    })
  
   
  },
  popup2(){
    this.setData({
      ShowType:true
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    new App.ToastPannel();
  this.setData({
    cash: options.cash,
    orderId: options.orderId,
    spuId: options.spuId,
    skuId: options.skuId
  })
 
  this.getPrice()
  this.getUserDetails()
  },
  getPrice() {//获取余额
    Api.getMyAccountList(0).then((res) => {
      for (var i = 0; i < res.data.q.Accounts.length; i++) {
        if (res.data.q.Accounts[i].typeName == "积分") {//积分余额
          this.data.pointsCash = res.data.q.Accounts[i].balanceCash
        } else if (res.data.q.Accounts[i].typeName == "系统内钱包") {//金额余额
          this.data.haveCash = res.data.q.Accounts[i].balanceCash

        }
        this.setData({
          pointsCash: this.data.pointsCash,
          haveCash: this.data.haveCash
        })

      }
    })

  },
  getUserDetails() {
    Api.getMyInfo().then((res) => {
      console.log(res)
      if(res.data.q.s == 0){
      this.setData({
        mobile: res.data.q.user.mobile
      })
      }
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