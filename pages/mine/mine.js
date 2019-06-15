// pages/mine/mine.js
var Api = require("../../Api/Api.js")
const App=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    privilegeList:[],
    list: [
      "小活动", "我的优惠卷", "订单记录", "排行榜", "收货地址"
    ],
    cashList: [{
      name: "累计奖励",
      money: 0
    },
    {
      name: "待审核奖励",
      money: 0
    },
    {
      name: "已提现奖励",
      money: 0
    },
    {
      name: "可提现奖励",
      money: 0,

    }
    ],
    type:0,
    points:0,
    cash:0,
    show:false,
    now:"游客",
    Myinfo_flag:true,
    lv_img:false,
    Myinfo_img:'',
    total:0,
    message_num:0,
    ifLogin:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },
  getMyInfo(){//获取个人信息
    Api.getMyInfo().then((res)=>{
      console.log(res)
      if(res.data.q.s==0){
        var data = res.data.q.user;
        this.setData({
          ifLogin:true,
          Myinfo_flag: false,
          Myinfo_img: data.imagePath,
          Myinfo_name: data.name,
          lv: data.lv
        })
        if (data.lv == 1) {
          this.setData({
            now: "普通用户",
          })
        } else if (data.lv == 2) {
          this.setData({
            now: "VIP用户",
          })
        }else{
          this.setData({
            now: "游客",
            lv_img: true
          })

        }
      }else{
        // wx.reLaunch({
        //   url:"../index/index"
        // })
      //  App.onLaunch()
        // this.getMyInfo()
      }
      
    })
  },
  getMarketingMemberList(a, type) {//全部代言人
    Api.getMarketingMemberList(0, 0).then((res) => {
     
        var data = res.data.q.memberList;
        this.setData({
          total: res.data.q.total
        })
     
    })
  },
  goLogin(){//条登陆
    wx.getUserInfo({
      success: (res) => {
       
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
  goSpokesperson(){//到代言人3
    console.log(this.downApp)
    this.downApp = this.selectComponent("#downApp");
    this.downApp.showDialog();
    
  },
  goMyInfo(){//我的头像
    if (App.globalData.isBindMobile) {
      wx.navigateTo({
        url: '../../pages/myInfo/myInfo',
      })
    } else {
      this.dialog = this.selectComponent("#dialog");
      this.dialog.showDialog();
    }
  },
  goMassage() {//我的通知
    if (App.globalData.isBindMobile) {
      wx.navigateTo({
        url: '../../pages/massage/massage',
      })
    } else {
      this.dialog = this.selectComponent("#dialog");
      this.dialog.showDialog();
    }
  },
  _confirmEvent() {//组件确定
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
  _cancelEvent() {//取消让组件消失
    this.dialog.hideDialog();
  },
  goRich(){
    
      // wx.navigateTo({
      //   url: '../../pages/rich/rich',
      // })
  
  },
  goTo(i){
    var num = i.currentTarget.dataset.num
    console.log(i.currentTarget.dataset.num)
    if (App.globalData.isBindMobile) {
      if (num == 0) {
        //to小活动
        console.log("to小活动，未完成")
        // wx.switchTab({
        //   url: '../goods/goods'
        // })
        wx.navigateTo({
          url: '../../pages/test/test',
        })
      } else if (num == 1) {
        wx.navigateTo({//优惠卷
          url: '../../pages/coupon/coupon',
        })
      } else if (num == 2) {
        wx.navigateTo({//订单记录
          url: '../../pages/orders/orders',
        })
      } else if (num == 3) {
        wx.navigateTo({//排行榜
          url: '../../pages/ranking/ranking',
        })
      } else if (num == 4) {
        console.log("收货地址")
        wx.navigateTo({
          url: '../../pages/addSite/addSite?from=1',
        })
      }
    } else {
      this.dialog.showDialog();
    }
 
  },
  go_detail(e) {//到商品详情
    wx.navigateTo({
      url: '../../pages/goodsDetail/goodsDetail?skuId=' + e.currentTarget.dataset.skuid + '&spuId=' + e.currentTarget.dataset.spuid + '&type=' + this.data.type,
    })
    console.log(e.currentTarget.dataset.skuid)
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },
  getGoodsList(){//获取商品列表
    Api.GoodsList({ a: 1 }).then((res => {
      var OtherArr = res.data.q.goodses.slice(0, 7)
      this.setData({
        privilegeList: OtherArr,
      })
      console.log(OtherArr)//	6.	商品列表
    }))
  },  /**
   * 生命周期函数--监听页面显示
   */
  showMore(){
    this.setData({
      show:!this.data.show
    })
  },
  onShow: function () {
    this.dialog = this.selectComponent("#dialog");
    this.getGoodsList()
    if (App.globalData.isBindMobile) {
      this.getMyInfo()//给信息
      this.getCount()//获取积分
      this.getMarketingMemberList()//代言人人数
      this.getQueryAdvices()//通知总数
    }

 
  },
  goDate(){//签到
    if (App.globalData.isBindMobile) {
      wx.navigateTo({
        url: '../../pages/date/date',
      })
    } else {
      this.dialog.showDialog();
    }
  },
  getCount(){//获取积分和可提现金
    Api.getMyAccountList(0).then((res)=>{
     
      for (var i = 0; i < res.data.q.Accounts.length; i++) {
        if (res.data.q.Accounts[i].typeName == "积分") {
          this.data.points = res.data.q.Accounts[i].balanceCash
        } else if (res.data.q.Accounts[i].typeName == "系统内钱包") {
          this.data.cash = res.data.q.Accounts[i].balanceCash
          this.data.cashList[0].money = res.data.q.Accounts[i].balanceTotal
          this.data.cashList[1].money = res.data.q.Accounts[i].balanceFronzen
          this.data.cashList[2].money = res.data.q.Accounts[i].canWithdraw
          this.data.cashList[3].money = res.data.q.Accounts[i].balanceCash
        }
      }
      this.setData({
        points: this.data.points,
        cash: this.data.cash,
        cashList: this.data.cashList

      })

    })
  
  

  },
  getQueryAdvices() {//获取通知总数
    Api.QueryAdvices().then((res) => {
      console.log(res)
      var data = res.data.q.advices;
      this.setData({
        message_num: res.data.q.total,
      })
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