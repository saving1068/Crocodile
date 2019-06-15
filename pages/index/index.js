
//获取应用实例
const app = getApp()
var Api = require("../../Api/Api.js")
Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    head_swiper:[],
    type:0,
    adsImg_1:"",
    adsImg_2: "",
    adsImg_3:"",
    adsImg_4: "",
    con_item:[],
    shop_List:[
      { img: "../../images/A0001_Home_002.png", name: "面霜", price: 208, text: "焕活青春 塑造美颜" },
      { img: "../../images/A0001_Home_002.png", name: "爽肤水", price: 208, text: "焕活青春 塑造美颜" },
      { img: "../../images/A0001_Home_002.png", name: "眼霜", price: 208, text: "焕活青春 塑造美颜" },
      { img: "../../images/A0001_Home_002.png", name: "洁面乳", price: 208, text: "焕活青春 塑造美颜" },
    ],
    animate: false,		
    notices: ["c******23小时前成为鳄鱼密码用户1","32132134214"],			
    animates: false,
    noticess: [],
    type:0,	
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../../pages/logs/logs'
    })
  },
  onLoad: function (options) {
    new app.ToastPannel();
    // var scene = decodeURIComponent(options.scene)
      var userId = options.shareBy
      console.log(userId)
      if (userId != "" && userId != undefined){
        app.globalData.userId = userId
      // console.log(app.globalData.userId, "userId","有ID")
        // this.show(userId)
    }else{
      // console.log("没有userID")
      console.log(app.globalData.userId,  "userId","没有ID")
      // this.show("没有ID")
    }
    
  },
  goToActionName(e){
    console.log(e.currentTarget.dataset.type)
    var item = e.currentTarget.dataset
    if (item.type == 2) {
        console.log("商品")
        wx.navigateTo({
          url: '../goodsDetail/goodsDetail?skuId=' + item.skuid + "&spuId=" + item.spuid + '&type=' + this.data.type
        })
    } else if (item.type == 4) {
        console.log("文章")
        wx.navigateTo({
          url: '../ArticleDetails/ArticleDetails?id=' + item.spuid
        })
      }
  },
  goTo(i) {
    console.log(i)
    var num = i.currentTarget.dataset.num
    if (num==0){
      //to商品列表
      console.log("to商品列表")
      wx.switchTab({
        url: '../goods/goods'
      })
    } else if (num == 1){
      wx.navigateTo({
        url: '../../pages/sister/sister',
      })
    } else if (num == 2){
      wx.navigateTo({
        url: '../../pages/sharevip/sharevip',
      })
    } else if (num ==3){
      wx.navigateTo({
        url: '../../pages/show/show',
      })
    } else if (num == 4){
      this.downApp = this.selectComponent("#downApp");
      this.downApp.showDialog();
    } else if (num ==5){
      wx.navigateTo({
        url: '../../pages/question/question',
      })
    }
  },
  go_detail(e) {
    wx.navigateTo({

      url: '../../pages/goodsDetail/goodsDetail?skuId=' + e.currentTarget.dataset.skuid + '&spuId=' + e.currentTarget.dataset.spuid + '&type=' + this.data.type,


    })
    console.log(e.currentTarget.dataset.skuid)
  },
  go_name(e){
    if (e.currentTarget.dataset.name == "rich"){
        console.log("toRich")
        wx.navigateTo({
          url: '../../pages/ranking/ranking',
        })
    } else if (e.currentTarget.dataset.name == "sister"){
      console.log("toSister")
      wx.navigateTo({
        url: '../../pages/sister/sister',
      })
    } else if (e.currentTarget.dataset.name == "show"){
      console.log("toShow")
      wx.navigateTo({
        url: '../../pages/show/show',
      })
    }
    // console.log(e.currentTarget.dataset.name)
  },
  getcontent_1() {
    Api.getAdList(1).then((res => {
      var data_img = res.data.q.ads
     
      this.setData({
        notices: data_img
      })
      console.log(res)//系统公告
    }))
  },
  getcontent_2(){
    Api.getAdList(2).then((res => {
      var data_img = res.data.q.ads
      this.setData({
        head_swiper: data_img
      })
      // console.log(res)//首页轮播图
    }))
  },
  getcontent_3() {

    Api.getAdList(3).then((res => {
      var data_img = res.data.q.ads
      this.setData({
        adsImg_1: data_img[0].imagePath,
        adsImg_2: data_img[1].imagePath,
        adsImg_3: data_img[2].imagePath,
        VipId: data_img[0].actionContent,
        advertis_b_id: data_img[1].actionContent,
        advertis_c_id: data_img[2].actionContent
      })
      // console.log(res)//图片广告位
    }))
  },
   getcontent_4() {
     Api.getAdList(4).then((res => {
       var data_img = res.data.q.ads
       this.setData({
         con_item: data_img
       })
       // console.log(res)//导航广告位
     }))
  },
   getcontent_5() {
     Api.getAdList(5).then((res => {
       console.log(res.data.q.ads)
       var data_img = res.data.q.ads;
       var Arr= [];
       Arr = this.getArr(data_img)
       this.setData({
         noticess: data_img
       })
     
       console.log(Arr,'arr')
       this.setData({
         Arr,
       })
       // console.log(res)//5.	鳄鱼快报
     }))
   },
   getArr(arr){
     if (arr.length%2!=0){
       arr.push(arr[0])
     }
     var newArr=[]
      for(var i=0;i<arr.length;i++){
        if(i%2!=0){
          var minArr=[]
          minArr.push(arr[i-1])
          minArr.push(arr[i])
          newArr.push(minArr)
        }
      }
      return newArr
   },
   getcontent_6() {
     Api.GoodsList({ a: 1 }).then((res => {
       var vipArr = res.data.q.goodses.slice(0, 2)
       var OtherArr = res.data.q.goodses.slice(2, 6)
       this.setData({
         vipArr: vipArr,
         shop_List: OtherArr,
       })
      //  console.log(vipArr)
      //  console.log(OtherArr)
       // this.setData({
       //   noticess: data_img
       // })//未完成
       // console.log(res)//	6.	商品列表
     }))
   },
   getcontent_7() {
     Api.getAdList(7).then((res => {
       var imgArr = [];
       imgArr.push({ img: res.data.q.ads[1], num: "../../Images/home_icon_NO.2@2x.png" })
       imgArr.push({ img: res.data.q.ads[0], num: "../../Images/home_icon_NO.1@2x.png" })
       imgArr.push({ img: res.data.q.ads[2], num: "../../Images/home_icon_NO.3@2x.png" })
      //  console.log(imgArr,"鳄鱼财富星")
       this.setData({
         richList: imgArr
       })
       //		7.	鳄鱼财富星
     }))
   },
   getcontent_8() {
     Api.getAdList(8).then((res => {
       var data_img = res.data.q.ads
       this.setData({
         sisterList: data_img
       })
       // console.log(res)//	8.	姐言妹语
     }))
   },
   getcontent_9() {
     Api.getAdList(9).then((res => {
       var data_img = res.data.q.ads[0]
       this.setData({
         adsImg_4: data_img.imagePath
       })
       // console.log(res)//	9.	鳄鱼秀场
     }))
   },
   getcontent_10() {
     Api.getAdList(10).then((res => {
       var data_img = res.data.q.ads
       this.setData({
         btnList: data_img
       })
       // console.log(res)//10.	底部广告位
     }))
   },
   goToArticleDetails_b(){
    wx.navigateTo({
      url: '../ArticleDetails/ArticleDetails?id=' + this.data.advertis_b_id,
    })
   },
   goToArticleDetails_c() {
     wx.navigateTo({
       url: '../ArticleDetails/ArticleDetails?id=' + this.data.advertis_c_id,
     })
   },
  onReady(){},
  goToArticleDetails(e){
    wx.navigateTo({
      url: '../ArticleDetails/ArticleDetails?id=' + e.currentTarget.dataset.id,
    })
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  goRich(){
    wx.navigateTo({
      url: '../ArticleDetails/ArticleDetails?id='+this.data.VipId,
    })
  },
  goGoods(){
    wx.switchTab({
      url: '../goods/goods',
    })
  },
  scroll() {//公告1
    this.setData({
      animate: true // 因为在消息向上滚动的时候需要添加css3过渡动画，所以这里需要设置true
    })
    setTimeout(() => {      //  这里直接使用了es6的箭头函数，省去了处理this指向偏移问题，代码也比之前简化了很多
      this.data.notices.push(this.data.notices[0]);  // 将数组的第一个元素添加到数组的
      this.data.notices.shift();               //删除数组的第一个元素
      this.setData({
        animate: false,  // margin-top 为0 的时候取消过渡动画，实现无缝滚动
        notices: this.data.notices
      })
    }, 1500)
  },
 
  onShow(){//重新进入是刷新
    this.getcontent_1()
    this.getcontent_2()
    this.getcontent_3()
    this.getcontent_4()
    this.getcontent_5()
    this.getcontent_6()
    this.getcontent_7()
    this.getcontent_8()
    this.getcontent_9()
    this.getcontent_10()
  
    // setInterval(this.scroll, 2500)//公告1
    // setInterval(this.scrolls, 3000)//公告2
    app.globalData.successFlag = false
  },
  onShareAppMessage: function () {

  }
})

