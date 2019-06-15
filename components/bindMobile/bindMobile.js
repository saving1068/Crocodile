// pages/components/bindMobile/bindMobile.js
const Api = require('../../Api/Api')
const App=getApp()
const $check = {
  trim: (str) => {
    return (str.replace(/\s+/g, '').length > 1)
  },
  //验证字符串长度
  len: (str, min=0 , max=100000 ) =>{
    return (str.length < min || str.length > max)?false:true
  },
}


Component({
  properties: {
    // 这里定义了innerText属性，属性值可以在组件使用时指定
    ShowType: {
      type: Boolean,
      value: false
    },
  total:{
    type: Number,
    value: 0
  },
    showCancel: {
      type: Boolean,
      value: false
    },
    haveCash:{
      type: Number,
      value: 0
    },
    mobile:{
      type: String,
      value: ''
    },
    orderId:{
      type:Number,
      value:0
    },
    skuId: {
      type: Number,
      value: 0
    },
    spuId: {
      type: Number,
      value: 0
    }
    
  },
  data: {
    // 这里是一些组件内部数据
  
    code: '',
    smskey: null,
    count: 0,
    content:"手机验证码错误",
    flag:'',
    sendFlag:false,
    sendErr:'验证码已发送，请稍后',
    sendErr2:'发送验证码失败，请稍后重试'
  },
  methods: {
    // 这里是一个自定义方法
 
    bindCode(e){
      this.setData({
        code: e.detail.value
      })
    },

    getSmsCode(){

      console.log(this.data.mobile)
      if (this.data.sendFlag == false){
        Api.SMSCode(1, 10, this.data.mobile).then((res) => {
      if(res.data.q.s==0){
        this.setData({
          count: 60,
          sendFlag:true,
          flag: '发送成功'
        })
        this.countDown();
      }else{
        wx.showModal({
          content: '发送验证码失败，请稍后重试',
              showCancel: false
            })
      }
         
         
        })
      }else{
        wx.showModal({
          content: '验证码已发送，请稍后',
          showCancel: false
        })
      }
      
      // Api.getSmsCode({a:1, type: 1, mobile: this.data.mobile}).then((res) => {
      //   // console.log(res)
      //   if(res.data.q.s == 0){
      //     if(res.data.q.result){
      //       this.getUserDetails();
      //       this.setData({
      //         ShowType: ''
      //       })
      //       wx.showModal({
      //         content: '绑定成功',
      //         showCancel: false
      //       })
      //     }else{
      //       this.setData({
      //         count: 60,
      //       })
      //       this.countDown();
      //     }
      //   }else{
      //     wx.showModal({
      //       content: res.data.q.d,
      //       showCancel: false,
      //     })
      //   }
      // })
    },
    MobileBind(){
      if(!$check.trim(this.data.code)){
        wx.showModal({
          content: '请输入手机验证码',
          showCancel: false
        })
        return;
      }

        
      
      if(this.data.haveCash < this.data.total){
        wx.showModal({
          content: '您的余额不足',
          showCancel: false
        })
        return;
      }
      console.log(this.data.id)
     
      if (this.data.sendFlag  && this.data.flag=='发送成功'){
        this.setData({
          flag: '正在验证'
        })
        wx.showLoading({ title: '加载中' })
        Api.SMSCode(2, 10, this.data.mobile, this.data.code).then((res) => {
          console.log(res)
          
          if (res.data.q.s == 0) {
            this.setData({
              flag: '验证成功'
            })
            if (this.data.flag=='验证成功'){
              Api.PaySubmit({ orderId: this.data.orderId, payment: 3 }).then((res) => {
                console.log(res)
                if (res.data.q.s == 0) {
                  this.setData({
                    ShowType: false
                  })
                  wx.hideLoading()
                  wx.redirectTo({
                    url: '../buysuccess/buysuccess?skuId=' + this.data.skuId + "&spuId=" + this.data.spuId + "&orderId=" + this.data.orderId,
                  })
                }

              })
            }
             


          } else {
            this.close()
            wx.showModal({
              content: '手机验证码错误',
              showCancel: false
            })
           wx.hideLoading()

          }


        })
      } else if (this.data.sendFlag  && this.data.flag != '发送成功'){
        wx.showModal({
          content: '正在支付请稍后',
          showCancel: false
        })
      }
      else{
        wx.showModal({
          content: '请先发送验证码',
          showCancel: false
        })
      }
      
    },
    //60s倒计时
    countDown: function (){
      let c = this.data.count;
      //console.log(c);
      var cd = setInterval( () => {
         if (this.data.count < 1) {
          this.data.count = 0;
          this.setData({
            count:0,
            sendFlag:false
          })
          clearInterval(cd);
        }else{
           c--;
           this.setData({
             count: c
           });
        }
      
       
      }, 1000)
    },
    close() {
      this.setData({
        ShowType: false,
        code:'',
        count:0
      })
    },
    /*获取用户信息*/
    getUserDetails(){
      Api.getMyInfo().then((res) => {
        console.log(res)
        // if(res.data.q.s == 0){
        //   wx.setStorageSync('user', res.data.q.user)
        // }
      })
    },
  }

})