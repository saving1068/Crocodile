const Api = require("../../Api/Api.js")
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    conten:"兑奖期限已过"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    new app.ToastPannel();
    this.setData({
      code: options.code
    })
    this.getDrawDetail(options.code)
   
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },
  getDrawDetail(code){
    Api.DrawDetail(code).then((res)=>{
      var data = res.data.q.award;
      this.setData({
        userfulLife: data.userfulLife,//奖品有效期
        remark: data.remark,//奖品使用说明
        deadline: data.deadline//奖品兑奖期限

      })
    })
  },
  claimPrize() {//4.	立即兑奖
    Api.ClaimPrize(this.data.code).then((res)=>{
      if (res.data.q.d !="操作成功"){
        console.log('兑奖期限已过')
        this.show(res.data.q.d)
      }else{
        if (res.data.q.s == 0) {
          this.show("兑奖成功")
          console.log("兑奖成功")
          wx.navigateTo({
            url: '../prizeWin/prizeWin',
          })
        }
      }
    })
  },
  makePhone(){
    wx.makePhoneCall({
      phoneNumber: '1340000' //仅为示例，并非真实的电话号码
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