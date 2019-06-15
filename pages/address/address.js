// pages/address/address.js
const CityData = require('../../utils/citys');
const Api = require('../../Api/Api')
const App=getApp()
const $check = {
  //验证字符串是否为空
  trim: (str) => {
    return (str.replace(/\s+/g, '').length > 1)
  },
  //验证手机号
  mobile: (str) => {
    return /^[1][3,4,5,7,8][0-9]{9}$/.test(str)
  },
  //验证字符串长度
  len: (str, min = 0, max = 100000) => {
    return (str.length < min || str.length > max) ? false : true
  },
  //正整数
  intNum: (n) => {
    return /^[1-9]\d*|0$/.test(n)
  },
}
Page({

  /**
   * 页面的初始数据
   */
  data: {
    region: '',
    customItem:'请选择',
    regionId:'',
    regionList: [],
    isShowPicker: false,
    id: 0,
    name: '',
    mobile: '',
    regionId: '',
    address: '',
    postCode: '',
    selected:false,
    err1:'请填写收货人姓名',
    err2: '请填写有效姓名',
    err3: '请填写手机号码',
    err4: '请填写有效手机号码',
    err5: '请选择地区',
    err6: '请填写详细地址',
    err7: '请填写有效邮政编码',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    new App.ToastPannel();
    if (options.id){
      console.log(options)
      wx.setNavigationBarTitle({
        title: '编辑收获地址'
      })
      this.setData({
        id: options.id
      })
      this.getData(options.id)
    }


  },
  getData(id){
    Api.getShippingAddressList().then((res) => {
      for (var i = 0; i < res.data.q.addresses.length;i++){
        if (id == res.data.q.addresses[i].id){
          var arr=[]
          for (var j = 0; j < res.data.q.addresses[i].regionInfo.length;j++){
            arr.push(res.data.q.addresses[i].regionInfo[j].region)
          }
          if (res.data.q.addresses[i].zipcode==0){
            this.data.postCode=''
          }else{
            this.data.postCode = res.data.q.addresses[i].zipcode
          }
          this.setData({
            mobile: res.data.q.addresses[i].mobile,
            name: res.data.q.addresses[i].name,
            regionList: arr,
            selected: res.data.q.addresses[i].selected,
            postCode: this.data.postCode,
            address: res.data.q.addresses[i].street
          })
        }
      }

     console.log(res)
     

    })


  },
  getRegion(event) {
    this.setData({
      region: event.detail.value,
      regionId: event.detail.regionId
    })
  },
  
  setRegion(){
    this.setData({
      isShowPicker: true
    })

  },
  switch1Change(e){
  this.setData({
    selected: e.detail.value
  })

  },
  bindName(e) {
    this.setData({
      name: e.detail.value
    })
  },
  bindMobile(e) {
    this.setData({
      mobile: e.detail.value
    })
  },
  bindAddress(e) {
    this.setData({
      address: e.detail.value
    })
  },
  bindPostCode(e) {
    this.setData({
      postCode: e.detail.value
    })
  },
  delAddr(){
   
  },
  saveAddr(){
    var regEn = /[`~!@#$%^&*()_+<>?:"{},.\/;'[\]]/im,
      regCn = /[·！#￥（——）：；“”‘、，|《。》？、【】[\]]/im;
    if (this.data.name=="") {
      this.show(this.data.err1)
      return;
    } else if (!$check.trim(this.data.name) || regEn.test(this.data.name) || regCn.test(this.data.name)){
      this.show(this.data.err2)
      return;
      
    }else if(this.data.mobile==''){
      this.show(this.data.err3)
      return;
    }
    
    else if (!$check.trim(this.data.mobile) || !$check.mobile(this.data.mobile) || !$check.len(this.data.mobile, 11, 11)) {
      this.show(this.data.err4)
      return;
    } 
    
    else if (!$check.trim(this.data.regionId)) {
      this.show(this.data.err5)
      return;
    } else if (!$check.trim(this.data.address)) {
      this.show(this.data.err6)
      return;
    }

    if (this.data.postCode!='') {
      if (!$check.len(this.data.postCode, 6, 6) || !$check.intNum(this.data.postCode)) {
        this.show(this.data.err7)
        return;
      }
    }else{
      this.data.postCode=null
    }
   
    var obj={
     "address":{
       "id": this.data.id,
       "name": this.data.name,
       "email": "",
       "mobile": this.data.mobile,
       "regionId": Number(this.data.regionId),
       "zipcode": this.data.postCode,
       "street": this.data.address,
       "selected": 0
     }

    }
    if (this.data.selected){
      obj.address.selected=1
    }else{
      obj.address.selected = 0
    }
    Api.getShippingAddressSubmit(obj).then((res)=>{
      console.log(res)
      if(res.data.q.s==0){
        wx.showToast({
          title: '成功',
          icon: 'success',
          duration: 2000,
          success:(res)=>{
           setTimeout(()=>{
             wx.navigateBack({
               delta: 1
             })

           },300)
          }
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