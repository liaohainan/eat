//index.js
//获取应用实例
var app = getApp()
var timer=null;
Page({
  data: {
    motto: '查看更多',
    userInfo: {},
    food:'',
    state:true,
    eatBtn:'随便选一个',
    foods:["馄饨","拉面","烩面","热干面","刀削面","油泼面","炸酱面","炒面","米线","土豆粉","螺狮粉","凉皮儿","麻辣烫","肉夹馍","羊肉汤","炒饭","卤肉饭","烤肉饭","黄焖鸡米饭","驴肉火烧","川菜","火锅","烤串","披萨","烤鸭","汉堡","炸鸡"],
    aboutClassName:''
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  eatWhat:function(){
    var sum=this.data.foods.length;
    var that=this;
    // var timer=null;
    if(this.data.state){
      console.log(this.data.state)
        this.setData({
            eatBtn:'吃这个',
            state:false
        })
        clearInterval(timer)
        timer=setInterval(function(){
            var num=parseInt(Math.random()*sum);
            that.setData({
                food:that.data.foods[num]
            })
        },150)
        console.log(this.data.state)
    }else{
        clearInterval(timer)
        this.setData({
            eatBtn:'不行，换一个',
            state:true
        })
    } 
  },
  toMore:function(){
    console.log(111)
    wx.navigateTo({
      url: '../more/more'
    })
  },
  onLoad: function () {
    console.log('onLoad')
    var that = this
    //获取食物列表
    wx.request({
        method:'POST',
        dataType:'json',
        url: 'https://www.nanyanyuyu.com/mp/api.php', 
        data: {
          x: '11111' ,
          y: '11'
        },
        header: {
            'content-type': 'application/json'
        },
        success: function(res) {
          console.log(res.data,'res')
          if(res && res.data && res.data.food){
            that.setData({
              foods: res.data.food
            })
          }
          
        },
        fail:function(err){
          console.log(err,'err')
        }
      });
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo){
      //更新数据
      console.log(userInfo)
      that.setData({
        userInfo:userInfo
      })
    })
  },
  onShareAppMessage: function () {
    return {
      title: '今天吃什么',
      success: function(res) {
        // 分享成功
      },
      fail: function(res) {
        // 分享失败
      }
    }
  },
  aboutJump:function(){
    var that=this;
    this.setData({
      aboutClassName:'about-active'
    })
    setTimeout(function(){
      that.setData({
        aboutClassName:''
      })
      wx.navigateTo({
        url: '../about/about'
      })
    },1000)
  }
})
