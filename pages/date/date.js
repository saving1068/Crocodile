const Api = require('../../Api/Api')
const app = getApp();  
Page({
  data: {
    currentDate: "2017年05月03日",
    dayList: '',
    score: 0,
    points:0,
    currentDay: new Date().getDate(),
    currentMonth: new Date().getMonth() + 1,
    currentYear: new Date().getFullYear(),
    currentWeek: new Date().getDay(),
    nowMonth: new Date().getMonth() + 1,
    nowDay: new Date().getDate() ,
    nowYear: new Date().getFullYear() ,
    days: [],
    list: [],
    isShow:true

  },
  onLoad: function (options) {
    this.getData()
   
  
  },
  getData(){
    var obj = {
      "a": 2,
      "date": this.data.currentYear + "-" + this.data.currentMonth
    }
    Api.SignAndGetIntegral(obj).then((res)=>{
      console.log(res)
       
      this.data.score = res.data.q.totalNum
      if (res.data.q.logs.length > 0) {
        for (var i = 0; i < res.data.q.logs.length; i++) {
          this.data.list.push(new Date(res.data.q.logs[i]))

        }
        var newDate = this.data.list.filter(this.selData)
        if (newDate.length > 0) {
          var d = new Date(this.formatDate(this.data.currentYear, this.data.currentMonth + 1, 1));
          d.setDate(0);
          this.initData(this.formatDate(d.getFullYear(), d.getMonth() + 1, 1));

        } else {
         this.sign()

        }
        console.log(newDate)

      } else {
        console.log(2)
        if (this.data.currentMonth == this.data.nowMonth && this.data.currentYear == this.data.nowYear && this.data.currentDay == this.data.nowDay) {
          console.log(1)
           this.sign()
        }

      }

      this.setData({
        score: this.data.score
      })



    })
  },
  selData(data) {
    return data.getFullYear() == new Date().getFullYear() && data.getMonth() == new Date().getMonth() && data.getDate() == new Date().getDate()

  },
  sign() {
    var obj = {
      "a": 1,
    }
    Api.SignAndGetIntegral(obj).then((res) => {
      console.log(res)

      if (res.data.q.s == 0) {
        
       
        this.data.points = res.data.q.num
       this.setData({
         isShow:false
       })
        this.setData({
       
          points: this.data.points

        })
       
        this.getData()
      }

    })
  },
  confirmEvent(){
    this.setData({
     isShow:true
   })
    var d = new Date(this.formatDate(this.data.currentYear, this.data.currentMonth + 1, 1));
    d.setDate(0);
    this.initData(this.formatDate(d.getFullYear(), d.getMonth() + 1, 1));
  },

  initData: function (cur) {
    //				var mon;
    var date;
    date = new Date(cur);


    this.data.currentDay = new Date(cur).getDate();
    this.data.currentYear = date.getFullYear();
    this.data.currentMonth = date.getMonth() + 1;
    this.data.currentWeek = date.getDay(); // 1...6,0
    if (this.data.currentWeek == 0) {
      this.data.currentWeek = 7;
    }

    var str = this.formatDate(this.data.currentYear, this.data.currentMonth, this.data.currentDay);
   
    this.data.days.length = 0;

    // 今天是周日，放在第一行第7个位置，前面6个
    for (var i = this.data.currentWeek - 1; i >= 0; i--) {
      var d = new Date(str);
      d.setDate(d.getDate() - i);
      console.log("y:" + d.getDate());
      var obj = {
        date: d,
        day:d.getDate(),
        month: d.getMonth()+1,
        flag: false
      }
      this.data.days.push(obj);
    }
    for (var i = 1; i <= 42 - this.data.currentWeek; i++) {
      var d = new Date(str);
      d.setDate(d.getDate() + i);
      var obj = {
        date: d,
        day: d.getDate(),
        month:d.getMonth()+1,
        flag: false
      }
      this.data.days.push(obj);
    }
    for (var i = 0; i < this.data.days.length; i++) {
      for (var j = 0; j < this.data.list.length; j++) {
        if (this.data.days[i].date.getFullYear() == this.data.list[j].getFullYear() && this.data.days[i].date.getMonth() == this.data.list[j].getMonth() && this.data.days[i].date.getMonth() == this.data.currentMonth - 1 && this.data.days[i].date.getDate() == this.data.list[j].getDate()) {
          this.data.days[i].flag = true
        }

      }

    }
   this.setData({
     days: this.data.days,
     currentDay: this.data.currentDay,
     currentYear:this.data.currentYear,
     currentMonth: this.data.currentMonth,
     currentWeek: this.data.currentWeek,


   })
   console.log(this.data.days)
  },
  pickPre: function () {
    // setDate(0); 上月最后一天
    // setDate(-1); 上月倒数第二天
    // setDate(dx) 参数dx为 上月最后一天的前后dx天
    var d = new Date(this.formatDate(this.data.currentYear, this.data.currentMonth, 1));
    d.setDate(0);
    this.initData(this.formatDate(d.getFullYear(), d.getMonth() + 1, 1));

    this.getData()
  },
  pickNext: function () {
    var d = new Date(this.formatDate(this.data.currentYear, this.data.currentMonth, 1));
    d.setDate(42);
    this.initData(this.formatDate(d.getFullYear(), d.getMonth() + 1, 1));
    this.getData()
  },
  formatDate: function (year, month, day) {
    var y = year;
    var m = month;
    if (m < 10) m = "0" + m;
    var d = day;
    if (d < 10) d = "0" + d;
    return y + "-" + m + "-" + d
  },
  goGood(){
    console.log(1)
    app.globalData.goodsFlag="false"
    wx.switchTab({
      url: '../goods/goods',
      success: function (e) {
        var page = getCurrentPages().pop();
        if (page == undefined || page == null) return;
        page.onLoad();
      } 
    })
      
    

  }





})  