// const BaseUrl = 'http://192.168.1.77:8080/CrocodileSecret';https://api.meililingba.com/CrocodileSecret
const BaseUrl = 'https://api.meililingba.com/CrocodileSecret';
const ApiUrl = BaseUrl + '/api/'; //配置的api地址
const md5 = require('../utils/md5.min.js');
var Util = require('../utils/util');
const md5Key ='cssH5-8149537095';
var sessionId;

function getSessionId() {
	let app = getApp();
	//sessionId = app.globalData.sessionId;
	sessionId = wx.getStorageSync('sessionId');
 
	return sessionId;
}

/**
 * 封装请求函数
 * 
 * @param {url} 请求地址
 * @param {data} 请求数据
 * @param {method} 请求方法
 * @param {completeFn} 调用完成执行函数
 * @returns  返回promise函数，使用then获取数据，catch获取error
 */
function request({
	url,
	data,
	method = 'POST',
	completeFn,
	header,
	isShowLoading = false
}) {
	return new Promise((resolve, reject) => {

		// if (method == 'POST'){

		//   data = Util.json2Form(data)

		// }

		//显示loading效果
		if(isShowLoading) {
			wx.showLoading({
				title: '加载中'
			})
		}

		wx.request({
			url,
			data,
			method,
			header,
			success: function(res) {
       
      
          
      
        
          resolve(res)
      
				
			},
			fail: function(err) {
				reject(err);
				console.log('request出错了');
				console.log('--------');
				console.log(err);
				console.log('--------');
			},
			complete: function() {
				if(isShowLoading) {
					wx.hideLoading();
				}
				
			}
		})
	})
}

const Api = {

	

	setSessionId: (session) => {
		sessionId = session

	},

	//
	// ──────────────────────────────────────────────── I ──────────
	//   :::::: B A S E 基础底层接口
	// ──────────────────────────────────────────────────────────
	//

	/**
	 * 1.  获取会话 SessionId
	 * 
	 * @param {code} 微信登录凭证
	 * @param {mobile} 用户手机号
	 * @param {smskey} 短信验证 smsKey
	 * @param {key} 头部md5key值
	 * @returns 
	 */
	getSessionId: (deviceToken) => {
		return request({
			url: ApiUrl + 'base/Session',
			method: "POST",
			data: {
				'json': JSON.stringify({
					m: '123',
					n: 'Session',
					q: {
						deviceToken,
						deviceType: 8
					}
				})
			},
			header: {
				'content-type': 'application/x-www-form-urlencoded'
			} // 设置请求的 header
		})
	},

	//发送验证码，验证码登录
	//a，1：获取验证码；2：进行验证；
	//type 1登录注册；(验证码直接登陆)   9.第三方绑定   11.第三方绑定（APP）
	//mobile  手机号
	//code    验证码

	SMSCode: (a, type, mobile, code) => {
    var obj = {n:'SMSCode',
      s:sessionId?sessionId:getSessionId(),
      q:{a,type,mobile,w:{code}}}
    obj.m = md5(md5Key+md5(JSON.stringify(obj)));

    return request(
      {
        url: ApiUrl + 'cis/SMSCode',
        method: 'POST',
        data: {
          'json': JSON.stringify(obj)
        },
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        }
      }

    )

	},
  
	//第三方绑定
	UserBindingSubmit: (a, mobile, checkKey) => {
    var obj = {
      n: 'UserBindingSubmit',
      s: sessionId ? sessionId : getSessionId(),
      q: {
        a,
        mobile,
        checkKey,
        partner: "18"
      }
    }
    obj.m = md5(md5Key+md5(JSON.stringify(obj)));

		return request({
			url: ApiUrl + 'cis/UserBindingSubmit',
			method: 'POST',
			data: {
        'json': JSON.stringify(obj)
			},
			header: {
				'content-type': 'application/x-www-form-urlencoded'
			}

		})

	},

	//第三方登录
  UserPartnerLogin: (openId,shareBy) => {
    var obj={
      n: 'UserPartnerLogin',
      s: '',
      q: {
        partner: "18",
        openId,
        shareBy,
      }
    }
    obj.m = md5(md5Key+md5(JSON.stringify(obj)));
		return request({
			url: ApiUrl + 'cis/UserPartnerLogin',
			method: 'POST',
			data: {
				'json': JSON.stringify(obj)
			},
			header: {
				'content-type': 'application/x-www-form-urlencoded'
			}

		})

	},
  //传数据给后台 获得Unionid
  SaveUnionid: (encryptedData, iv)=>{
    var obj={
      n: 'SaveUnionid',
      s: sessionId ? sessionId : getSessionId(),
      q: {
        encryptedData,
        iv
      }
    }
    obj.m = md5(md5Key+md5(JSON.stringify(obj)));
   return request({
     url: ApiUrl + 'cis/SaveUnionid',
     method: 'POST',
     data: {
       'json': JSON.stringify(obj)
     },
     header: {
       'content-type': 'application/x-www-form-urlencoded'
     }


   
   
   })
  


  },
  
  //签到领积分SignAndGetIntegral
  SignAndGetIntegral: ({ a, date })=>{
    var obj={
     
      n: 'SignAndGetIntegral',
      s: sessionId ? sessionId : getSessionId(),
      q: {
        a,
        date

      }
    }
    obj.m = md5(md5Key + md5(JSON.stringify(obj)));

   return request({
     url: ApiUrl + 'fina/SignAndGetIntegral',
     method: 'POST',
    data:{
      'json': JSON.stringify(obj)
    },
    header: {
      'content-type': 'application/x-www-form-urlencoded'
    }
   })

  },

  //
  getMyAccountList:(a)=>{
   var obj={
  
     n: 'MyAccountList',
     s: sessionId ? sessionId : getSessionId(),
     q: {
       a
     }
   }
   obj.m = md5(md5Key + md5(JSON.stringify(obj)));
  return request({
    url: ApiUrl + 'fina/MyAccountList',
    method: 'POST',
    data:{
      'json': JSON.stringify(obj)
    },
    header: {
      'content-type': 'application/x-www-form-urlencoded'
    }


  })


  },
   
  PaySubmit: ({ orderId, payment})=>{
    var obj={
     
      n: 'PaySubmit',
      s: sessionId ? sessionId : getSessionId(),
      q: {
        'a': 1,
        orderId,
        payment
      }
    }
    obj.m = md5(md5Key + md5(JSON.stringify(obj)));
  return request({
    url: ApiUrl + 'fina/PaySubmit',
    method: 'POST',
    data:{
      'json': JSON.stringify(obj)




    },
    header: {
      'content-type': 'application/x-www-form-urlencoded'
    }




  })


  },
  

  //获取地址信息
  getShippingAddressList:()=>{
    var obj={
      
      n: 'ShippingAddressList',
      s: sessionId ? sessionId : getSessionId(),
      q: {

      }
    }
    obj.m = md5(md5Key + md5(JSON.stringify(obj)));
    return request({
      url: ApiUrl + 'cis/ShippingAddressList',
      method: 'POST',
      data: {
        'json': JSON.stringify(obj)
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      }
    
    
    })


  },
  getShippingAddressSwitch: ({ a, id })=>{
    var obj={
     
      n: 'ShippingAddressSwitch',
      s: sessionId ? sessionId : getSessionId(),
      q: {
        a,
        id
      }
    }
    obj.m = md5(md5Key + md5(JSON.stringify(obj)));
    return request({
      url: ApiUrl + 'cis/ShippingAddressSwitch',
      method: 'POST',
      data: {
        'json': JSON.stringify(obj)
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      }




    })


  },
 
  getShippingAddressSubmit:({address})=>{
    var obj={
   
      n: 'ShippingAddressSubmit',
      s: sessionId ? sessionId : getSessionId(),
      q: {
        address
      }
    }
    obj.m = md5(md5Key + md5(JSON.stringify(obj)));
  return request({
    url: ApiUrl + 'cis/ShippingAddressSubmit',
    method: 'POST',
    data: {
      'json': JSON.stringify(obj)
    },
    header: {
      'content-type': 'application/x-www-form-urlencoded'
    }




  })



  },


//获取订单信息
  getOrderSubmit: ({ a, note, skuId, spuId, num, addresId, couponid })=>{
    var obj={
      
      n: 'OrderSubmit',
      s: sessionId ? sessionId : getSessionId(),
      q: {
        a, note, skuId, spuId, num, addresId, couponid
      }
    }
    obj.m = md5(md5Key + md5(JSON.stringify(obj)));
    return request({
      url: ApiUrl + 'order/OrderSubmit',
      method: 'POST',
      data: {
        'json': JSON.stringify(obj)
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      }

    })
  },


  uploadFiles: (tempFilePaths) => {
    return new Promise((resolve, reject) => {
      wx.showLoading({
        title: '上传图片中'
      })
      try {
        wx.uploadFile({
          url: ApiUrl + 'Base/UploadFiles',
          filePath: tempFilePaths[0],
          name: 'file[]',
          header: {
            'Content-Type': 'multipart/form-data'
          },
          formData: {
            q: JSON.stringify({a:1})
          },
          success(res) {
            console.log(res)
            resolve(res)
            wx.hideToast();
          },
          fail(err) {
            reject(err)
            wx.hideToast();
          }
        })
      } catch (error) {
        wx.hideToast();
        wx.showToast({
          title: '出错了，请重试',
          image: '../images/error.png'
        })
      }
      
    })
  },


  //getAdList的方法获取数据
  // 1.	系统公告
  // 2.	首页轮播图
  // 3.	图片广告位
  // 4.	导航广告位
  // 5.	鳄鱼快报
  // 6.	商品列表
  // 7.	鳄鱼财富星
  // 8.	姐言妹语
  // 9.	鳄鱼秀场
  // 10.	底部广告位

  getAdList: (a) => {
    return request({
      url: ApiUrl + 'ads/AdList',
      method: "GET",
      data: {
        a
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      } // 设置请求的 header
    })
  },


//get的方法 获取
// type=0 系统文章（注册协议、XX 协议、关于我们、版本说明，规则说明，提现说明, 成为 VIP 等）
// type=1 公告栏（系统消息）
// type =2 商品文章
// type= 4 订单消息
// type= 6 会员特权文章
// type = 7 广告位文章
// type = 8 姐言妹语
// type= 9 鳄鱼秀场
// type= 10 护肤小秘招(首页底部栏)
// type=11 预设智能问答
// type= 12 使用指南的问答文章
// type= 13 代言福利的问答文章
// type= 14 产品说明的问答文章
// type= 15 超值 VIP 文章

  getArticleListDate: (a, type, pa, li) => {
    return request({
      url: ApiUrl + 'cms/ArticleList',
      method: "GET",
      data: {
        a,
        type,
        pa,
        li
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      } // 设置请求的 header
    })
  },



  /**
   * 26. 文章详情 ArticleDetails
   * @param a
   * @param id {文章id}
   *
   *
   * */
  ArticleDetails: (id) => {
    return request({
      url: ApiUrl + 'cms/article',
      method: 'GET',
      data: {
         id
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      } 
    })
  },



//获取财富排行榜
  getStarRanking: () => {
    return request({
      url: ApiUrl + 'ads/StarRanking',
      method: "GET",
      data: {
        
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      } // 设置请求的 header
    })
  },
   
  /**
    * 查询系统设置QuerySetting
    *
    */
  getQuerySetting: (key) => {
   var obj={
     'n': 'QuerySetting',
     's': sessionId ? sessionId : getSessionId(),
     'q': {
       a:1,
       key,
     }
   }
   obj.m = md5(md5Key + md5(JSON.stringify(obj)));
   return request({ 
     url: ApiUrl + 'base/QuerySetting',
     method: 'POST',
      data: {
        'json':JSON.stringify(obj)
        
     },
     header: {
       'content-type': 'application/x-www-form-urlencoded'
     } 
    })
  },


//获取优惠卷
  getCouponList: (pa, li, ob, ot, status,couponId) => {
    var obj = {
     
      n: 'CouponList',
      s: sessionId ? sessionId : getSessionId(),
      q: {
        "a": 1,
        'ta': {
          pa: pa,
          li: li,
          ob: ob,
          ot: ot,
          status: status,
          couponId: couponId,
        }
      },
    }
    obj.m = md5(md5Key + md5(JSON.stringify(obj)));
  return request({
    url: ApiUrl + 'coupon/CouponList',
    method: 'POST',
    data: {
      "json":JSON.stringify(obj) 
    },
    header: {
      'content-type': 'application/x-www-form-urlencoded'
    } 
  })
},

//获取代言人
  getMarketingMemberList: (a, type) => {
    var obj={
     
      n: 'MarketingMemberList',
      s: sessionId ? sessionId : getSessionId(),
      q: {
        a,
        type,
      }
    }
    obj.m = md5(md5Key + md5(JSON.stringify(obj)));
    return request({
      url: ApiUrl + 'mkt/MarketingMemberList',
      method: 'POST',
      data: {
        'json': JSON.stringify(obj)
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      }
    })

  },



//获取个人信息
  getMyInfo: () => {
    var obj={

    
        n: 'UserDetails',
          s: sessionId ? sessionId : getSessionId(),
        
    }
    obj.m = md5(md5Key + md5(JSON.stringify(obj)));
    return request({
      url: ApiUrl + 'cis/UserDetails',
      method: 'POST',
      data: {
        'json': JSON.stringify(obj)
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      }
    })

  },

//获取订单记录
  getOrderList: ({status}) => {
      var obj={
       
        n: 'OrderList',
        s: sessionId ? sessionId : getSessionId(),
        q: {
          a: 1,
          status,
        }
      }
      obj.m = md5(md5Key + md5(JSON.stringify(obj)));
    return request({
      url: ApiUrl + 'order/OrderList',
      method: 'POST',
      data: {
        'json': JSON.stringify(obj)
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      }
    })

  },
  getLogisticsTicketInfo: ({ sn }) => {//物流信息
    var obj = {
      n: 'LogisticsTicketInfo',
      s: sessionId ? sessionId : getSessionId(),
      q: {
        a: 1,
        sn,
      }
    }
    obj.m = md5(md5Key + md5(JSON.stringify(obj)));
    return request({
      url: ApiUrl + 'order/LogisticsTicketInfo',
      method: 'POST',
      data: {
        'json': JSON.stringify(obj)
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      }
    })

  },

//订单更新
  OrderUpdate(a, orderId){
    var obj={
    
      n: "OrderUpdate",
      s: sessionId ? sessionId : getSessionId(),
      q: {
        a,
        orderId
      }
    }
    obj.m = md5(md5Key + md5(JSON.stringify(obj)));
    return request({
      url: ApiUrl + 'order/OrderUpdate',
      method: 'POST',
      data:{
        "json": JSON.stringify(obj)
      },
      header:{
        'content-type': 'application/x-www-form-urlencoded'
      }
    })
  },


//查询消息 QueryAdvices
  QueryAdvices() {
    var obj = {
     
      n: "QueryAdvices",
      s: sessionId ? sessionId : getSessionId(),
      q: {
        a: 1
      }
    }
    obj.m = md5(md5Key+md5(JSON.stringify(obj)))

    return request({
      url: ApiUrl + 'cms/QueryAdvices',
      method: 'POST',
      data: {
        "json": JSON.stringify(obj)
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      }
    })
  },
  //已读信息
  PraiseSwitch(a,id){
     var obj={
      
       n: "PraiseSwitch",
       s: sessionId ? sessionId : getSessionId(),
       q: {
         a,
         open: 1,
         id,
       }

     }
     obj.m = md5(md5Key + md5(JSON.stringify(obj)))
    return request({
      url: ApiUrl + 'cms/PraiseSwitch',
      method: 'POST',
      data: {
        "json": JSON.stringify(obj)
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      }
    })
  },

//信息列表
  MsgList(a){
    var obj={
      
      n: "MsgList",
      s: sessionId ? sessionId : getSessionId(),
      q: {
        a
      }
    }
    obj.m = md5(md5Key + md5(JSON.stringify(obj)))
    return request({
      url: ApiUrl + 'cms/MsgList',
      method: 'POST',
      data: {
        "json": JSON.stringify(obj)
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      }
    })
  },
//获取二维码
  MyCode() {
    var obj={
    
      n: "MyCode",
      s: sessionId ? sessionId : getSessionId(),
      q: {

      }
    }
    obj.m = md5(md5Key + md5(JSON.stringify(obj)))
    return request({
      url: ApiUrl + 'cis/MyCode',
      method: 'POST',
      data: {
        "json": JSON.stringify(obj)
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      }
    })
  },
  //1.	活动信息
  ActivityInfo(){
    var obj={
      
      n: "ActivityInfo",
      s: sessionId ? sessionId : getSessionId(),
      q: {
        a: 0
      }
    }
    obj.m = md5(md5Key + md5(JSON.stringify(obj)))
    return request({
      url: ApiUrl + 'activity/ActivityInfo',
      method: 'POST',
      data: {
        "json": JSON.stringify(obj)
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      }
    })
  },


//开始抽奖
  BeganToDraw(id){
    var obj={
      
      n: "BeganToDraw",
      s: sessionId ? sessionId : getSessionId(),
      q: {
        a: 0,
        id
      }
    }
    obj.m = md5(md5Key + md5(JSON.stringify(obj)))
    return request({
      url: ApiUrl + 'activity/BeganToDraw',
      method: 'POST',
      data: {
        "json": JSON.stringify(obj)
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      }
    })
  },



//中奖详情
  DrawDetail(code) {
    var obj={
      
      n: "DrawDetail",
      s: sessionId ? sessionId : getSessionId(),
      q: {
        a: 0,
        code
      }
    }
    obj.m = md5(md5Key + md5(JSON.stringify(obj)))
    return request({
      url: ApiUrl + 'activity/DrawDetail',
      method: 'POST',
      data: {
        "json": JSON.stringify(obj)
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      }
    })
  },





  ClaimPrize(code) {//4.	立即兑奖
  var obj={
    
    n: "ClaimPrize",
    s: sessionId ? sessionId : getSessionId(),
    q: {
      a: 0,
      code
    }
  }
  obj.m = md5(md5Key + md5(JSON.stringify(obj)))
    return request({
      url: ApiUrl + 'activity/ClaimPrize',
      method: 'POST',
      data: {
        "json": JSON.stringify(obj)
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      }
    })
  },



  QuestionAnswering: ({ a, id, type})=>{
    // let formData = new FormData();
   var obj={
    
     n: 'QuestionAnswering',
     s: sessionId ? sessionId : getSessionId(),
     q: {
       a,
       id,
       type
     }
   }
   obj.m = md5(md5Key + md5(JSON.stringify(obj)))
     return request({
       url: ApiUrl + 'sns/QuestionAnswering',
        method :'POST',
        data:  {
          'json': JSON.stringify(obj)
        },
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        } 
     })
  },









  //
  // ────────────────────────────────────────────── II ──────────
  //   ::::::   Product  产品系统
  // ────────────────────────────────────────────────────────
  //

  /**
   * 2. 商品列表 ProductList
   *
   * @param action (a){1：获取验证码；2：进行验证}
   * @param categoryId {分类id}
   * @param isFree {是否只查看包邮 0 否 1 是}
   * @param  points {积分 1：DESC  2： ASC}
   * @param pa {页码}
   * @param li {每页数据条数}
   * @param ob {排序字段 默认最新  3：最热  4：积分 }
   * @param ot {1：DESC  2： ASC}
   * @returns
   */
  GoodsList: ({a}) => {
    return request({
      url: ApiUrl + 'mall/GoodsList',
      data: {
        n: 'GoodsList ',
        sessionId: sessionId ? sessionId : getSessionId(),
       
          a
        
      },
      method: "get"
    })
  
  },
  GoodsDetails:({ spuId,
    skuId})=>{
  return request({
    url: ApiUrl + 'mall/GoodsDetails',
    data: {
      n: 'GoodsDetails ',
      sessionId: sessionId ? sessionId : getSessionId(),
      
        spuId,
        skuId
      
    },
    method: "get"


  })





  },


  /**
   * 24.称 更新用户头像昵称 UserUpdate
   * @returns
   */
  UserUpdate: (name,sex) => {
    var obj={
     
      n: 'UserUpdate',
      s: sessionId ? sessionId : getSessionId(),
      q: {
        a:1,
        user: {
          name,
          sex: sex
        }
      }
    }
    obj.m = md5(md5Key + md5(JSON.stringify(obj)))
    return request({
      url: ApiUrl + 'cis/UserUpdate',
      data: {
        'json':JSON.stringify(
          obj
        )
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      } 
    })
  },



  //
  // ────────────────────────────────────────────── II ──────────
  //   :::::: C M S 内容系统
  // ────────────────────────────────────────────────────────
  //
  /**
   * 25. 文章列表 ArticleList
   * @param action (a){1：热门；2：最新}
   * @param categoryId {分类id}
   * @param pa {页码}
   * @param li {每页数据条数}
   * @param type
   *          type=1公告栏（系统消息）
              type =2 商品文章
              type=4 订单消息
              type=6 会员特权文章
              type =7 广告位文章
              type =8 姐言妹语
              type=9 鳄鱼秀场
              type=10 护肤小秘招(首页底部栏)
              type=11预设智能问答
              type=12 使用指南的问答文章
              type=13 代言福利的问答文章
              type=14 产品说明的问答文章
              type=15 超值VIP文章
   * */
  ArticleList: ({a,type,pa, li}) => {
    return request({
      url: ApiUrl + 'cms/ArticleList',
      method:"GET",
      data: {
        n: 'ArticleList',
        s: sessionId?sessionId:getSessionId(),
        q: {
          a,
          type,
            pa,
            li,
           
         
        }
      }
    })
  },


  
  

  //
  // ────────────────────────────────────────────── II ──────────
  //   :::::: ORDER 订单系统
  // ────────────────────────────────────────────────────────
  //



  /**
   * 33. 订单详情 OrderDetails
   * 
   * @param {id}
   * @returns 
   */
  getOrderDetails: (orderId) => {
    var obj={
      n: 'OrderDetails',
      s: sessionId ? sessionId : getSessionId(),
      q: {
        orderId
      }
    }
    obj.m = md5(md5Key + md5(JSON.stringify(obj)))

    return request({
      url: ApiUrl + 'order/OrderDetails',
      method:"POST",
      data: {
        "json": JSON.stringify(obj)
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      }
    })
  },


  untilGetSessionId: () => {
    return new Promise((resolve, reject) => {
      var timer = setInterval(getSessionId, 50);
      //let app = getApp();

      function getSessionId() {
        if(wx.getStorageSync('sessionId')) {
          clearInterval(timer);
          resolve()
        }
      }
    })
  },
  untilSetSessionId: (session) => {
    return new Promise((resolve, reject) => {
     
      wx.clearStorageSync("sessionId")
      var timer = setInterval(setSessionId, 50);
      function setSessionId() {
        wx.setStorageSync('sessionId', session)
        if (wx.getStorageSync('sessionId') == session) {
          sessionId = wx.getStorageSync('sessionId')
          clearInterval(timer);
          resolve()
        }
      }
      //let app = getApp();
      
     
    })
  },

  getBaseUrl: () => {
    return BaseUrl;
  }


}

module.exports = Api;