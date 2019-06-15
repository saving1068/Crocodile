// pages/goods/goods.js
const Api = require('../../Api/Api')
const app = getApp();  
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    flag:true,
    type:0,
    lv:1
  },
 
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.data.list = []
    console.log(app.globalData.goodsFlag)
    
    if (app.globalData.goodsFlag=="false"){
      this.setData({
        flag: false
       
      })
      app.globalData.goodsFlag ==""
      wx.setNavigationBarTitle({
        title: '积分商品'
      })
      this.getData(3)
    }else{
      wx.setNavigationBarTitle({
        title: '全部商品'
      })
      this.getData(0)

     
    }
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
    let pages = getCurrentPages();
    let currPage = pages[pages.length - 1];
    console.log(currPage.data)

    this.data.list = []
    if (currPage.data.flag == false) {
      this.setData({
        flag: false

      })
      app.globalData.goodsFlag == ""
      wx.setNavigationBarTitle({
        title: '积分商品'
      })
      this.getData(3)
    } else {
      wx.setNavigationBarTitle({
        title: '全部商品'
      })
      this.getData(0)
      if (app.globalData.isBindMobile) {
        this.getUserDetails()
      }
    }
  },
  getUserDetails(){
    Api.getMyInfo().then((res) => {
      console.log(res)
      var data = res.data.q.user;
      this.setData({
       
        lv: data.lv
      })
     
    })

  },
  changeType(e) {
    this.data.list=[]
    

   this.data.flag=!this.data.flag
   this.setData({
     flag: this.data.flag,
     list: this.data.list
   })
   if(this.data.flag){
     wx.setNavigationBarTitle({
       title: '全部商品'
     })
     this.getData(0)  
   }else{
     wx.setNavigationBarTitle({
       title: '积分商品'
     })
     this.getData(3)  
   }
  },
  go_detail(e){
    if(this.data.flag){
     this.setData({
      type:0
     })

    }else{
      this.setData({
      type:3
     })
    }
  if(this.data.type==3){
    wx.navigateTo({
      url: '../../pages/goodsDetail/goodsDetail?skuId=' + e.currentTarget.dataset.skuid + '&spuId=' + e.currentTarget.dataset.spuid
    })
  }else{
    wx.navigateTo({
      url: '../../pages/goodsDetail/goodsDetail?skuId=' + e.currentTarget.dataset.skuid + '&spuId=' + e.currentTarget.dataset.spuid
    })
  }
  


   
  },

getData(num){
   var obj={
       "a":num
   }
   this.data.list=[]
   Api.GoodsList(obj).then((res)=>{
     console.log(res)
     this.data.list = res.data.q.goodses
    //  for (let i = 0; i < res.data.q.goodses.length;i++){
    //    this.data.list.push(res.data.q.goodses[i])
    //  }
        this.setData({
          list: this.data.list
        })
   })
},
serve(){
 wx.switchTab({
   url: '../customerservice/customerservice',
 })
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