// pages/goods/goodsDetail/goodsDetail.js
const Api = require('../../Api/Api')
const WxParse = require('../../wxParse/wxParse.js');
const App=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    head_swiper:[],
    name:"",
    originalPrice:0,
    discountPrice:0,
    mailing:"",
    skuList:[],
    free:true,
    bought:false,
    type:0,
    score:0,
    isShow:false,
    flag:false,
    goods:{},
    isShow1:false,
    isShow2:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    var userId = options.shareBy
    if (userId != "" && userId != undefined) {
      App.globalData.userId = userId
    } else {
      console.log(App.globalData.userId, "userId", "没有ID")
    }
    this.dialog = this.selectComponent("#dialog");
    if (!wx.getStorageSync("GoodsDetail") || wx.getStorageSync("GoodsDetail")==""){
      wx.setStorageSync("GoodsDetail", "false")

    }
    

    this.setData({
      spuId: options.spuId,
      skuId: options.skuId
     
    })
    console.log(this.data.spuId)
    
    
  },
  goToHome(){
    wx.switchTab({
      url: '../index/index',
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
    App.globalData.addressId=0
    App.globalData.couponId=0
    this.getData()
      if (wx.getStorageSync("GoodsDetail") == "true") {
          this.setData({
            isShow: false,
            flag: true
          })
        } else if (wx.getStorageSync("GoodsDetail") == "false" && this.data.type == 0) {
          this.setData({
            isShow: true,
            flag: false
          })

        }

  },
  checkboxChange(e){
  console.log(e)
  this.setData({
    flag:!this.data.flag
  })
  },
  comfirm1(){
    this.setData({
      isShow1: false,

    })
  },
  comfirm2(){
    this.setData({
      isShow2: false,

    })

  },
  comfirm(){
    this.setData({
      isShow: false,

    })
    if(this.data.flag){
      wx.setStorageSync("GoodsDetail", "true")
    }else{
      wx.setStorageSync("GoodsDetail", "false")
    }

  },
  cust(){
    if (App.globalData.isBindMobile){
     wx.switchTab({
       url: '../../pages/customerservice/customerservice',
     })
   }else{
     this.dialog.showDialog()

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
  freeGo(){
    if (App.globalData.isBindMobile){
      console.log(this.data.goods.canSampleSack)
     if(this.data.goods.canSampleSack==0){

       wx.navigateTo({//免费试用
         url: '../orderSubmit/orderSubmit?type=2' + '&skuId=' + this.data.skuId + '&spuId=' + this.data.spuId + '&id=0',
       })

     }else{
           this.setData({
             isShow2:true
           })

     }
    }else{
      this.dialog.showDialog()
    }
  
  },
  go_submit(e){
    if (App.globalData.isBindMobile){
      console.log(e)
      if (e.currentTarget.dataset.type=="4"){
        if (e.currentTarget.dataset.ispassmuster==1){
          wx.navigateTo({//免费续领
         url: '../orderSubmit/orderSubmit?type=4' + '&skuId=' + this.data.skuId + '&spuId=' + this.data.spuId + '&id=0',
       })
        } else{
          this.setData({
            isShow1: true,

          })
          return ;
        }
        

      } else if (e.currentTarget.dataset.type == "1"){
        if (this.data.type == 0) {
         wx.navigateTo({
           url: '../orderSubmit/orderSubmit?type=1' + '&skuId=' + this.data.skuId + '&spuId=' + this.data.spuId + '&id=0',
         })
       } else {
         wx.navigateTo({
           url: '../orderSubmit/orderSubmit?type=3' + '&skuId=' + this.data.skuId + '&spuId=' + this.data.spuId + '&id=0',
         })
       }

      }

    //  if (this.data.bought && this.data.type == 0) {
    //    wx.navigateTo({
    //      url: '../orderSubmit/orderSubmit?type=4' + '&skuId=' + this.data.skuId + '&spuId=' + this.data.spuId + '&id=0',
    //    })
    //  } else {
    //    if (this.data.type == 0) {
    //      wx.navigateTo({
    //        url: '../orderSubmit/orderSubmit?type=1' + '&skuId=' + this.data.skuId + '&spuId=' + this.data.spuId + '&id=0',
    //      })
    //    } else {
    //      wx.navigateTo({
    //        url: '../orderSubmit/orderSubmit?type=3' + '&skuId=' + this.data.skuId + '&spuId=' + this.data.spuId + '&id=0',
    //      })
    //    }


    //  }
   }else{
     this.dialog.showDialog()
   }

  },
  getData() {
    var obj = {
      spuId: this.data.spuId,
      skuId: this.data.skuId
    }

    Api.GoodsDetails(obj).then((res) => {
      console.log(res)
      this.setData({
        goods: res.data.q.goods,
        head_swiper:res.data.q.goods.images,
        name: res.data.q.goods.name,
        originalPrice: res.data.q.goods.originalPrice,
        discountPrice: res.data.q.goods.discountPrice,
        discount: res.data.q.goods.discount,
        mailing: res.data.q.goods.mailing,
        skuList: res.data.q.skuList,
        articleId:res.data.q.goods.articleId
      })
      this.getD(res.data.q.goods.articleId)
      if (this.data.discountPrice==0){
        this.setData({
          type:0
        })
      }else{
        this.setData({
          type: 3
        })
      }
      if (this.data.goods.isBought != 1){
          if (wx.getStorageSync("GoodsDetail") == "true") {
          this.setData({
            isShow: false,
            flag: true
          })
        } else if (wx.getStorageSync("GoodsDetail") == "false" && this.data.type == 0) {
          this.setData({
            isShow: true,
            flag: false
          })

        }
      }
      
      if (res.data.q.goods.isContinued == 1 && App.globalData.isBindMobile){
         this.setData({
           bought:true
         })
      }else{
        this.setData({
          bought: false
        })
      }
      
      if (res.data.q.goods.isSampleSack == 0) {
        this.setData({
          free: true
        })
      } else {
        this.setData({
          free: false
        })
      }

    })
    
  },
  getD(id){
    
    Api.ArticleDetails(id).then((res) => {//商品详情
      var that = this;
      var data = res.data.q.article;
      WxParse.wxParse('article', 'html', data.content, that, 5);

    })
  },
  dialogBox(){
   this.setData({
     isShow:true
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