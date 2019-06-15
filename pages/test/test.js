var Api = require('../../Api/Api.js')
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    animationData: {},
    playMiuce:{},
    activity:16,
    ifWin:1,
    joinNum:0,
    surplusNum:0,
    firtPrice:60,
    thank1:120,
    thirdPrice:180,
    thank2: 240,
    secondPrice:300,
    thank3:360,
    flag:true,
    perPrice:0,
    num:0,
    explain: false,//活动说明
    nowPrice:0,
    fail:false,//没有抽中时弹出
    success:false,//中奖时弹出
    currentTab:0,
    explain_top:true,
    myAwards:[],
    content:"您已没有抽奖机会",
    ifPlay:false,
    or:0,
    n:0,
    musicFlag:true,
    timer:null,
    stop_line:false,
    musicPath:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    new app.ToastPannel();
    var userId = options.shareBy
    if (userId != "" && userId != undefined) {
      app.globalData.userId = userId
    } else {
      console.log(app.globalData.userId, "userId", "没有ID")
    }
      if (app.globalData.isBindMobile) {
        this.getActivityInfo()
      } else {
        this.dialog = this.selectComponent("#dialog");
        this.dialog.showDialog();

      }
    // }


  },
  gotoAi(){
    wx.navigateTo({
      url: '../game/game',
    })
  },
  again() {//再来一次
    if (this.data.surplusNum <=0){
     
      this.show(this.data.content)
      this.setData({
        surplusNum:0,
      })
    }else{
      this.setData({
        fail:false,
      })
      this.rotate()
    }
  },
  _cancelEvent() {//取消让组件消失
    this.dialog.hideDialog();
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
  getActivityInfo(){//获取活动信息

    Api.ActivityInfo().then((res) => {
      if (res.data.q.d !="操作成功"){
        this.show('活动已过期')
      }else{
        if (res.data.q.s == 0) {
          var that = this;
          this.setData({
            activity: res.data.q.info.id,//活动ID
            joinNum: res.data.q.info.joinNum,//参加人数
            surplusNum: res.data.q.info.surplusNum,//抽奖机会
            myAwards: res.data.q.info.myAwards,//我的奖品列表
            musicPath: res.data.q.info.musicPath,//音乐地址
            startDate: res.data.q.info.startDate,//开始时间
            endDate: res.data.q.info.endDate,//结束时间
            awards: res.data.q.info.awards,//活动奖品
            times: res.data.q.times//每天抽奖次数
          })
          setTimeout(() => {
            this.playMusic()
          }, 500)
        } else {
          Api.untilGetSessionId()//获取sessionId
          this.getActivityInfo()
        }
      }   
    })
  },
  rotate(){//抽奖
    if (this.data.surplusNum<=0){//机会为0
      this.show(this.data.content)
      this.setData({
        surplusNum:0,
      })
    }else{//还有机会
      var num = null;
      if (this.data.flag) {
        this.setData({
          flag: false
        })


        Api.BeganToDraw(this.data.activity).then((res) => {//开始抽奖
         
          if (res.data.q.s == 0) {
            var data = res.data.q.award
            this.setData({
              code: data.code,//奖品编码
              deadline: data.deadline,//兑奖期限
              gradeName: data.gradeName,//中奖等级名称
              name: data.name,//奖品名称
              id: data.id//奖品id
            })









            var animation = wx.createAnimation({//创造动画
              duration: 5000,
              timingFunction: "ease",
              delay: 100
            })
            var data = res.data.q;
            this.data.ifWin = data.isWin

            if (this.data.ifWin == 0) {//没有抽到奖
              let random = Math.floor(Math.random() * 3)//随机抽到三个谢谢参与的其中一个
             
              if (random == 0) {
                this.data.nowPrice = this.data.thank3
              } else if (random == 1) {
                this.data.nowPrice = this.data.thank1
              } else {
                this.data.nowPrice = this.data.thank2
              }
            } else {
              if (data.award.gradeName == "三等奖") {
                this.data.nowPrice = this.data.thirdPrice
              } else if (data.award.gradeName == "二等奖") {
                this.data.nowPrice = this.data.secondPrice
              } else if (data.award.gradeName == "一等奖") {
                this.data.nowPrice = this.data.firtPrice
              }

            }

            this.animation = animation;
            this.data.num += 20 + this.data.nowPrice / 180 + (360 - this.data.perPrice) / 180
            this.setData({
              perPrice: this.data.nowPrice,
              num: this.data.num
            })



            animation.rotate((this.data.num) * 180).step()

            this.setData({
              animationData: animation.export()
            })


            setTimeout(() => {
              this.setData({
                flag: true
              })
              if (this.data.flag) {
              
                if (this.data.ifWin == 0) {
                  this.setData({
                    fail: true
                  })
                } else {
                  this.setData({
                    success: true
                  })
                }
              } else {
               
              }
            }, 5000)
          } else {
            this.show("抽奖失败，请稍后重试")
          }
          Api.ActivityInfo().then((res) => {
         
            if (res.data.q.s == 0) {
              var that = this;
              this.setData({
                activity: res.data.q.info.id,//活动ID
                joinNum: res.data.q.info.joinNum,//参加人数
                surplusNum: res.data.q.info.surplusNum,//抽奖机会
                myAwards: res.data.q.info.myAwards,//我的奖品列表
                musicPath: res.data.q.info.musicPath//音乐地址
              })
            } else {
              Api.untilGetSessionId()
              this.getActivityInfo()
            }

          })

        })
      } else {
        this.show("正在抽奖，请稍等")
      }
    }
  },
  closeSuccess(){
    this.setData({
      success:false
    })
  },
  closeFail() {
    this.setData({
      fail: false
    })
  },
  goToExplain(){
    this.setData({
      explain:true
    })
  },
  closeExplain(){
    this.setData({
      explain: false
    });
  },
  goDrawDetail(e){
    console.log(e)
    if (e.currentTarget.dataset.status == 0){
      wx.navigateTo({
        url: '../prize/prize?code=' + e.currentTarget.dataset.code,
      })
    }else{
      this.show('该奖品已兑换')
    }
  },
  goToDrawDetail(){
   
    wx.navigateTo({
      url: '../prize/prize?code=' + this.data.code,
    })
  },
  changeItem(e){
   
    this.setData({ currentTab: e.currentTarget.dataset.num})
    if (e.currentTarget.dataset.num == 0){
     
      this.setData({ explain_top: true})
    }else{
    
      this.setData({ explain_top: false })
    }
  },
  playOr(){
    this.data.or++
    if (this.data.or % 2 == 1) {
      this.innerAudioContext.pause()
        this.setData({
          stop_line:true
        })
  
        
    
    } else {
      this.innerAudioContext.play()
      this.setData({
        stop_line: false,
      })
        
        
    
    }
  },
  playMusic(){
 
    this.innerAudioContext = wx.createInnerAudioContext()
    this.innerAudioContext.autoplay = true;
    this.innerAudioContext.loop = true;
    this.innerAudioContext.src = this.data.musicPath;
    var timer=null
    this.innerAudioContext.onPlay(() => {
      var paly = wx.createAnimation({
        duration: 100,
        timingFunction: 'linear',
      })


       timer = setInterval(() => {
     
         if (!this.data.stop_line){
          this.data.n++
          paly.rotate(360 * this.data.n/10).step()
          this.setData({
            playMiuce: paly.export()
          })
        }else{
          clearInterval(timer)
        }
          
       
          
       

      }, 100)
    })
    
    this.innerAudioContext.onPause(()=>{
      clearInterval(timer)
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
    this.setData({
      success: false
    });
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    this.innerAudioContext.pause()
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    this.innerAudioContext.pause()
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