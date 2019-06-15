// pages/customerservice/customerservice.js
const Api = require('../../Api/Api')
const WxParse = require('../../wxParse/wxParse.js');
const App=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    nowDate:"",
    list:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var date = new Date().getFullYear() + "-" + (new Date().getMonth() + 1) + "-" + new Date().getDate() + " " + new Date().getHours() + ":" + new Date().getMinutes() + ":" + new Date().getSeconds()
    this.dialog = this.selectComponent("#dialog");
    // this.dialog.showDialog();
    // var o = {
    //   "M+": new Date().getMonth() + 1,
    //   "d+": new Date().getDate(),
    //   "H+": new Date().getHours(),
    //   "m+": new Date().getMinutes(),
    //   "s+": new Date().getSeconds(),
    //   "S+": new Date().getMilliseconds()
    // };  
    if (App.globalData.isBindMobile){
      this.setData({
        nowDate: date
      })
      var obj = {
        "a": 1,
        "type": 2
      }
      Api.QuestionAnswering(obj).then((res) => {
        console.log(res)
        this.setData({
          list: res.data.q.questions
        })

      })

    }else{

      this.dialog.showDialog();
    }
    











  },
  _cancelEvent() {
    this.dialog.hideDialog();
  },
  _confirmEvent(){
    wx.getUserInfo({
     success:(res)=>{
       this.dialog.hideDialog();
     console.log(res)
     Api.SaveUnionid(res.encryptedData,res.iv).then((res)=>{
       console.log(res)
       wx.redirectTo({
         url: '../login/login',
       })
     })
     }

    })

  },
  showAnswer(e){
  var obj={
    "a": 2,
    "type": 2,
    "id": e.currentTarget.dataset.id
  }
  var that=this
    Api.QuestionAnswering(obj).then((res)=>{
      WxParse.wxParse('article', 'html', res.data.q.answer, that, 5);
      console.log(res)
    })
  console.log(e.currentTarget.dataset.id)
  
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