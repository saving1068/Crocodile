// pages/qecode/qecode.js
const Api = require("../../Api/Api.js");
const WxParse = require('../../wxParse/wxParse.js');
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    leftNum: 0,
    currentTab: 0,   // tab切换  
    isShow:false,
    flag:false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if(!this.data.flag){
      this.getMyCode()
      this.setData({
       flag:true
      })
    }
    
    new app.ToastPannel();
  },
  isShow(){
    this.setData({
      isShow:!this.data.isShow
    })
  },
  saveImg(e){
    console.log(this.data.img)
    console.log(e.currentTarget.dataset.num)

    if (this.data.currentTab == e.currentTarget.dataset.num){
      var that = this;
      wx.downloadFile({
        url: this.data.img[e.currentTarget.dataset.num].imagePath, //真实的资源
        success: function (res) {
          
          // 只要服务器有响应数据，就会把响应内容写入文件并进入 success 回调，业务需要自行判断是否下载到了想要的内容
          if (res.statusCode === 200) {
            console.log(res.tempFilePath)
            wx.saveImageToPhotosAlbum({
              filePath: res.tempFilePath,
              success(res) {
                console.log(that)
                that.show("已保存到系统相册")
              }
            })
          }
          
        }
      })
    }
  },
  getMyCode(){
    Api.MyCode().then((res)=>{
      var data = res.data.q
      var that = this;
      WxParse.wxParse('article', 'html', data.content, that, 5);
      console.log(data.images[0])
      this.setData({
        flag:data.flag,
        img: data.images,
        imgHeight: data.images[0].high+"rpx"
      })
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },
  bindChange: function (e) {
    var that = this;
    that.setData({ currentTab: e.detail.current});
    if (e.detail.current == this.data.currentTab){
      this.setData({
        imgHeight: this.data.img[e.detail.current].high+"rpx"
      })
    }
  },
  swichNav: function (e) {
    console.log(e.target.dataset.current)
    var that = this;
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current,
        leftNum: e.target.dataset.current * 20
      })
    }
  },
  _confirmEvent() {
    wx.getUserInfo({
      success: (res) => {
        this.dialog.hideDialog();
        console.log(res)
        Api.SaveUnionid(res.encryptedData, res.iv).then((res) => {
          console.log(res)
          wx.redirectTo({
            url: '../login/login',
          })
        })
      }

    })

  },
  _cancelEvent() {
    this.dialog.hideDialog();
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.dialog = this.selectComponent("#dialog");
    if (app.globalData.isBindMobile) {
      if (!this.data.flag) {
        this.getMyCode()
        this.setData({
          flag: true
        })
      }
    } else {
      this.dialog.showDialog();

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