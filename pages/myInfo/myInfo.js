var Api = require("../../Api/Api.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    img:"../../Images/my_img_avatar_big@2x.png",
    data_img:"",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getMyInfo()
  },
  getMyInfo(){
    Api.getMyInfo().then((res)=>{
      var data = res.data.q.user
      if(data.sex == 0){
        this.setData({
          sex: "未知"
        })
      } else if (data.sex == 1){
        this.setData({
          sex:"男"
        })
      } else if (data.sex == 2){
        this.setData({
          sex: "女"
        })
      }
      this.setData({
        data_img: data.imagePath,
        name:data.name,
        mobile:data.mobile,
        lv:data.lv
      })
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },
  changeSex(){//改变性别
    this.dialog = this.selectComponent("#dialog");
    this.dialog.showDialog();
  },
  _confirmEvent() {//组件男
      Api.UserUpdate(this.data.name, 1).then((res) => {
        console.log(res,"男")
      })
      this.setData({
        sex: "男"
      })
      this.dialog.hideDialog();
  },
  _cancelEvent() {//组件女
    Api.UserUpdate(this.data.name, 2).then((res) => {
      console.log(res,"女")
    })
    this.setData({
      sex: "女"
    })
    this.dialog.hideDialog();
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