import { ToastPannel } from 'components/toastTest/toastTest'
// Api.js

const Api = require('./Api/Api');

//app.js
App({ToastPannel,

  onLaunch: function () {
    // 展示本地存储能力

    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        console.log(res,"获取微信CODE")//获取微信CODE
        // console.log(this,"this")
         

       
        var that = this;
        // setTimeout(function(){
          Api.UserPartnerLogin(res.code, that.globalData.userId).then((res) => {
            console.log(that.globalData.userId, "userId")
            console.log(res, "第三方登陆")
            var res_data = res
            if (res.data.q.s == 0) {


              Api.setSessionId(res.data.s)
              Api.untilSetSessionId(res.data.s)
              if (res.data.q.isBindMobile == 1) {
                that.globalData.isBindMobile = true
              } else {
                that.globalData.isBindMobile = false
              }
            }
          })
        // },1000)
        

        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
   
  },
  globalData: {
    userInfo: null,
    isBindMobile:null,
    goHome:false,
    addressId:0,
    couponId:0,
    goodsFlag:"",
    successFlag:false,
    userId:0,
  }

})