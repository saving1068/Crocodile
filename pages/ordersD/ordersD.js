var Api = require("../../Api/Api.js")


const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:"",
    type:0,
    list:{},
    content: "已提醒发货"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.dialog = this.selectComponent("#dialog");//删除订单组件
    this.dialogs = this.selectComponent("#dialogs");//确认收货组件
    new app.ToastPannel();
    console.log(options)
    var userId = options.shareBy
    if (userId != "" && userId != undefined) {
      app.globalData.userId = userId
    } else {
      console.log(app.globalData.userId, "userId", "没有ID")
    }
    this.setData({
      id: options.id//获取订单id
    })
    if (options.type){
      this.setData({
        type: options.type
      })
    }
    this.getOrderDetails(options.id)
    
  },
  getOrderDetails(id){
    Api.getOrderDetails(id).then((res)=>{
      
      var data = res.data.q.order;
      var payment = res.data.q.payment;
      var logistics = res.data.q.logistics;
      this.setData({
        list: res.data.q,
        name: logistics.name, //收货人
        mobile: logistics.mobile,//收货人号码
        street: logistics.regionInfo[0].region.name + logistics.regionInfo[1].region.name + logistics.regionInfo[2].region.name+logistics.street,//收货人地址
        order_img: data.imagePath,//商品图片
        order_name: data.name,//商品名字
        order_goodsAmount: data.goodsAmount,//商品总价格
        order_time: payment.createTime,//下单时间
        order_payType: payment.payType,//支付方式
        order_payTime: payment.payTime,//支付时间
        order_Type:payment.deliveryType,//配送方式
        order_reductionAmount: data.reductionAmount,//优惠金额
        order_realAmount: data.realAmount,//实付金额
        order_distributionAmount: data.distributionAmount,//运费
        order_taxesDues: data.taxesDues,//税费
        orderType: data.orderType,//订单类型
        status: data.status,//状态
        skuId: data.skuId,
        spuId: data.spuId,
        orderType: data.orderType,//支付类型
        integralAmount: data.integralAmount,//扣除积分
        integralPrice: data.integralPrice,//商品积分价格
        isShowLogistics: data.isShowLogistics,//是否查询物流
        isContinued: data.isContinued,//VIP是否可续领
        isPassMuster: data.isPassMuster,//是否符合续领要求
        leaveMsg: data.leaveMsg,//备注
        sn: logistics.sn,//物流订单号
      })
    })
  },
  goToLogistics() {
    if (this.data.isShowLogistics==1){
      wx.navigateTo({
        url: '../Logistics/Logistics?sn=' + this.data.sn + '&id=' + this.data.id,
      })
    }else{
      this.show("目前小程序不开通此订单物流查询，请下载app查看")
    }
    
  },
  _confirmEvents() {//组件确定
    wx.getUserInfo({
      success: (res) => {
        console.log(this.data.id)
        Api.OrderUpdate(4,this.data.id).then((res) => {
          console.log(res)
          if (res.data.q.d == "操作成功") {
            console.log("组件确定成功")
            this.dialogs.hideDialog();
            wx.navigateBack({
              delta: 1
            })
          }
        })
        
      }
    })
  },
  _cancelEvents() {//取消让组件消失
    console.log("用户取消")
    this.dialogs.hideDialog();
  },
  confirmOrder() {//确认收货
    this.dialogs.showDialog();
  },
  deleteOrder(){
    console.log(this.data.id)
    this.dialog.showDialog();
  },
  remindOrder() {//提醒收货
    Api.OrderUpdate(5, this.data.id).then((res) => {
      console.log(res)
      if (res.data.q.d == "操作成功") {
        this.show(this.data.content)
      } else {
        console.log("操作失败")
      }
    })
  },
  goToGoodListD(){
    wx.navigateTo({
      url: '../goodsDetail/goodsDetail?skuId=' + this.data.skuId + '&spuId=' + this.data.spuId + "&type=0",
    })
  },
  _confirmEvent() {//组件确定删除
    wx.getUserInfo({
      success: (res) => {
        Api.OrderUpdate(2, this.data.id).then((res) => {
          console.log(res)
          if (res.data.q.d == "操作成功") {
            this.dialog.hideDialog();
            wx.navigateBack({
              delta: 1
            })
            
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