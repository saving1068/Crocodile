
const Api = require('../../Api/Api')
const app = getApp()
const $check = {
  //验证字符串是否为空
  trim: (str) => {
    return (str.replace(/\s+/g, '').length > 1)
  },
  //验证手机号
  mobile: (str) => {
    return /^1[2|1|3|4|5|8|7|6|7|8|9][0-9]\d{4,8}$/.test(str)
  },
  //验证字符串长度
  len: (str, min = 0, max = 100000) => {
    return (str.length < min || str.length > max) ? false : true
  }
}
Page({

  /**
   * 页面的初始数据
   */
  data: {
    time: 60,
    ifo: false,
    ifgou: false,
    tel:'',
    code:'',
    flag:false,
    checkKey:0,
    count:0,
    errTel:"请输入正确的手机号",
    errCode:'请输入6位验证码',
    errCode1:"请阅读同意用户协议",
    errCode2:"请发送验证码",
    errCode3:"发送验证码失败",
    errCode4:"请点击获取验证码",
    errData:"",
    ifCode:true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    new app.ToastPannel();
  },
  blurTel(e){
  
   this.setData({
     tel: e.detail.value
   })
   this.checkFlag()
  },
  blurCode(e){
    
    this.setData({
      code: e.detail.value
    })
    this.checkFlag()
  },
  login(){
     var that=this
     if (!$check.trim(this.data.tel) || !$check.mobile(this.data.tel) || !$check.len(this.data.tel, 11, 11)) {
       this.show(this.data.errTel)
       return;
     }


     if (!$check.trim(this.data.code)) {
     this.show(this.data.errCode)
       return;
     }
     
     if (!this.data.ifo) {
       this.show(this.data.errCode4);
       return;
     }

     if (!this.data.ifgou) {
       this.show(this.data.errCode1);
       return;
     }

     Api.SMSCode(2, 9, this.data.tel,this.data.code).then((res)=>{
   console.log(res)
  if(res.data.q.s==0){
    Api.UserBindingSubmit(2, this.data.tel, this.data.checkKey).then((res) => {
      if (res.data.q.s != 0) {
       
        this.setData({
          errData: res.data.q.d
        })
        this.show(this.data.errData)
      } else {
        app.globalData.isBindMobile = true;
        wx.switchTab({
          url: '../index/index',
        })
      }
    })
  }else{
    this.show(res.data.q.d)
  }

      })
      



  },
  close(){
   wx.switchTab({
     url: '../index/index',
   })
  },
  getSmsCode() {
    if (this.data.ifCode){
      var that = this
      if (!$check.trim(this.data.tel) || !$check.mobile(this.data.tel) || !$check.len(this.data.tel, 11, 11)) {
        this.show(this.data.errTel)
        return;
      }
      Api.SMSCode(1, 1, this.data.tel).then((res) => {
        console.log(res)
        if (res.data.q.s == 0) {
          this.setData({
            checkKey: res.data.q.checkKey,
            ifo: true,
            ifCode: false,
            count: 60
          })

          this.countDown();
        } else {
          this.show(this.data.errCode3)
        }

      })
    }
  },
  getGou(){
    this.setData({
      ifgou: !this.data.ifgou
    })
    this.checkFlag()
  },
  countDown() {
    let c = this.data.count;
    //console.log(c);
    var cd = setInterval(() => {
      if (this.data.count < 1) {
        this.data.count = 0;
        this.setData({
          ifo:false,
          ifCode:true
        })
        clearInterval(cd);
      } else {
        c--;
        this.setData({
          count: c
        });
      }


    }, 1000)
  },
  goToHome(){
    wx.navigateTo({
      url: '../index/index',
    })
  },
  checkFlag(){
    var myreg = /^[1][3,4,5,7,8][0-9]{9}$/;  
    

    if (this.data.ifgou && this.data.code.length == 6 && myreg.test(this.data.tel) && this.data.ifo){
      this.setData({
        flag:true
      })
    }else{
     

      console.log(this.data.code.length)
      console.log(this.data.ifgou)
      this.setData({
        flag: false
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