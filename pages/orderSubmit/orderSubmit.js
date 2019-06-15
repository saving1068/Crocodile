// pages/orderSubmit/orderSubmit.js
const Api = require('../../Api/Api')
const App=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    havesite:true,
    spuId:0,
    skuId:0,
    type:0,
    id:0,
    address:{},
    pointsCash:0,
    cash:0,
    goods:{},
    list:{},
    textareaNum:0,
    text:"",
    content:'请先添加收货地址',
    content1:'您的积分不够，请选择其他商品',
    err:"提交订单错误",
    textarea:true,
    couponId:0,
    isShow:true,
    flag:false
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    new App.ToastPannel();
    this.setData({
      spuId: options.spuId,
      skuId: options.skuId,
      type: options.type
      
    })

    if (!wx.getStorageSync("order") || wx.getStorageSync("order") == "") {
      wx.setStorageSync("order", "false")

    }
    if (wx.getStorageSync("order") == "true") {
      this.setData({
        isShow: false,
        flag: true
      })
    } else if (wx.getStorageSync("order") == "false" && this.data.type == 0) {
      this.setData({
        isShow: true,
        flag: false
      })

    }

    this.getAddress()
    this.getPrice()
    
    this.getDetails()
  },
  comfirm() {
    this.setData({
      isShow: false,

    })
    if (this.data.flag) {
      wx.setStorageSync("order", "true")
    } else {
      wx.setStorageSync("order", "false")
    }

  },
  checkboxChange(e){
    this.setData({
      flag: !this.data.flag
    })

  },
  
  selectAddress(){//跳转选择地址页面
    wx.navigateTo({
      url: '../addSite/addSite',
    })

  },
  showDialog(){
   this.setData({
     isShow: true
   })
  },
  changeNum(e){
   console.log(e)
   this.setData({
     textareaNum: e.detail.value.length,
     text: e.detail.value
   })
  },
  descInput(){
  this.setData({
    textarea:false
  })

  },
  getDetails() {//获取商品详情
    var obj = {
      "spuId": this.data.spuId,
      "skuId": this.data.skuId
    }
    Api.GoodsDetails(obj).then((res) => {
      console.log(res)
      this.setData({
        goods: res.data.q.goods
      })
      

    })


  },
  getData(){
   var obj={
     "a": 0,
     "note": "",
     "skuId": this.data.skuId,
     "spuId": this.data.spuId,
     "num": 1,
     "couponid": 0
   }
   console.log(this.data.type)
   if (this.data.type==1){
     obj.a = 5
   } else if (this.data.type == 2){
     obj.a = 6
   } else if (this.data.type == 3) {
     obj.a = 7
   } else if (this.data.type == 4) {
     obj.a = 8
   }
   if (this.data.couponId!=0){
     obj.couponid = this.data.couponId
   }

  Api.getOrderSubmit(obj).then((res) => {
    this.setData({
      list:res.data.q
    })
    
     console.log(res)
     
   })

    
  },
  goToselect(){
wx.navigateTo({
  url: '../selectCoupon/selectCoupon?skuId=' + this.data.skuId + "&spuId=" + this.data.spuId+"&type=5",
})
  },


  submit(){
    if (this.data.havesite){
      this.show(this.data.content)
      
    }else{
      var obj = {
        "a": 0,
        "note": this.data.text,
        "skuId": this.data.skuId,
        "spuId": this.data.spuId,
        "num": 1,
        "addresId": this.data.address.id,
        "couponid": 0
      }
      if(this.data.type==1){

        obj.a = 1
      } else if (this.data.type == 2){
        obj.a = 2
      } else if (this.data.type == 3) {
        obj.a = 3
      } else if (this.data.type == 4) {
        obj.a = 4
      }
      if (this.data.pointsCash < this.data.list.integralAmount) {
        this.show(this.data.content1)
        return false
      }
      
      if (this.data.type == 1 && this.data.couponId == 0 && this.data.list.catusecoupons.length>0){
        obj.couponid = this.data.list.catusecoupons[0].id
      } else if (this.data.couponId && this.data.couponId!=0){
        obj.couponid = this.data.couponId
      }

      console.log(20)
      Api.getOrderSubmit(obj).then((res)=>{
        console.log(res)
        if(res.data.q.s==0){
          wx.redirectTo({
            url: '../cashier/cashier?cash=' + this.data.list.realAmount + "&orderId=" + res.data.q.orderId + "&skuId=" + this.data.skuId + "&spuId=" + this.data.spuId + "&type=" + this.data.type,
          })

          
        }else{
          this.show(this.data.err)
        }
        
      })

     
    }
 

  
  },


  getAddress(){//获取地址
    Api.getShippingAddressList().then((res)=>{
      console.log(res)
      if (res.data.q.addresses.length>0){
        if (this.data.id != 0) {
          for(var i=0;i<res.data.q.addresses.length;i++){
            if (res.data.q.addresses[i].id == this.data.id) {
              this.data.havesite = false
              this.data.address = res.data.q.addresses[i]
            }
          }
          this.setData({
            havesite: this.data.havesite,
            address: this.data.address
          })
          console.log(1)
        }else{
          for (var i = 0; i < res.data.q.addresses.length; i++) {
            if (res.data.q.addresses[i].selected == 1) {
              this.data.havesite = false
              this.data.address = res.data.q.addresses[i]
            }

          }
          this.setData({
            havesite: this.data.havesite,
            address: this.data.address
          })

        }
      }else{
        this.setData({
          havesite: true
         
        })
      }
      
      console.log(res)
    })

  },
  getPrice(){//获取余额
    Api.getMyAccountList(0).then((res)=>{
      for (var i = 0; i < res.data.q.Accounts.length; i++) {
        if (res.data.q.Accounts[i].typeName == "积分") {//积分余额
          this.data.pointsCash = res.data.q.Accounts[i].balanceCash
        } else if (res.data.q.Accounts[i].typeName == "系统内钱包") {//金额余额
          this.data.cash = res.data.q.Accounts[i].balanceCash

        }
       this.setData({
         pointsCash: this.data.pointsCash,
         cash: this.data.cash
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
    
    let pages = getCurrentPages();
  
    let currPage = pages[pages.length-1];
    console.log(currPage.data)
    if (App.globalData.addressId!=0){
      this.setData({
        id: App.globalData.addressId
      })
    
    }
    if (App.globalData.couponId != 0) {
      this.setData({
        couponId: App.globalData.couponId
      })

    }
    this.getData()
    this.getAddress()
    
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