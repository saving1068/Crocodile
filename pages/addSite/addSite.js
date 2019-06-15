// pages/addSite/addSite.js
const Api = require("../../Api/Api.js");
const App=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    Address:true,
    from:false,
    list:[],
    id:0,
    delId:0,
    delIndex:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options.from){
      this.setData({
        from:true
      })
      wx.setNavigationBarTitle({
        title: '编辑我的地址',
      })
    }else{
      this.setData({
        from: false
      })
      wx.setNavigationBarTitle({
        title: '选择我的地址',
      })
    }

    this.getData()
  },
  getData(){
    Api.getShippingAddressList().then((res)=>{
      console.log(res)
      if (res.data.q.addresses.length > 0) {
        this.data.list = res.data.q.addresses
        this.data.Address = true
        for (var i = 0; i < this.data.list.length;i++){
          if (this.data.list[i].selected==0){
            this.data.list[i].checked=false
          }else{
            this.data.list[i].checked = true
          }
        }

      }else{
        this.data.Address = false
      }
      this.setData({
        list:this.data.list,
        Address: this.data.Address
      })
    })


  },
  changeSelect(e){
   
    var obj={
      "a": 2,
      "id": e.currentTarget.dataset.id
    }
    for (var i = 0; i < this.data.list.length;i++){
      this.data.list[i].checked=false
    }
    this.data.list[e.currentTarget.dataset.index].checked = true
    this.setData({
      list: this.data.list
    })
    Api.getShippingAddressSwitch(obj).then((res) => {
      console.log(res)
      
    })
  },

  address(){
  wx.navigateTo({
    url: '../address/address',
  })


  },
  changeAddress(e){
    

    wx.navigateTo({
      url: '../address/address?id=' + e.currentTarget.dataset.id,
    })

  },
  change(e){
   if(this.data.from){
     var obj = {
       "a": 2,
       "id": e.currentTarget.dataset.id
     }
     
     for (var i = 0; i < this.data.list.length; i++) {
       this.data.list[i].checked = false
     }
     this.data.list[e.currentTarget.dataset.index].checked = true
     this.setData({
       list: this.data.list
     })
     Api.getShippingAddressSwitch(obj).then((res) => {
       console.log(res)

     })


   }else{
     
     App.globalData.addressId=e.currentTarget.dataset.id
     
     wx.navigateBack({
       delta: 1
     })
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
    this.dialog = this.selectComponent("#dialog");
    let pages = getCurrentPages();
    let currPage = pages[pages.length - 1];
    console.log(currPage.data)
    this.setData({
      from: currPage.data.from
    })
    this.getData()
  },
  del(e){
    this.setData({
      delId: e.currentTarget.dataset.id,
      delIndex: e.currentTarget.dataset.index
    })
    this.dialog.showDialog()


  },
  _cancelEvent(){

    this.dialog.hideDialog()
  },
  _confirmEvent(){
   var obj={
     "a": 1,
     "id": this.data.delId
   }
   Api.getShippingAddressSwitch(obj).then((res)=>{
     if(res.data.q.s==0){
       this.data.list.splice(this.data.delIndex,1)
       this.setData({
         list: this.data.list
       })
       if(this.data.list.length>0){

       }else{
         this.setData({
           Address:false
         })
         

       }
       this.dialog.hideDialog()
     }
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