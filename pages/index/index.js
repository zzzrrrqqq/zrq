Page({

  /**
   * 页面的初始数据
   */ 
  data: {
    images: [
      '../../image/swiper1.jpg',
      '../../image/test.jpg',
      '../../image/swiper1.jpg'
    ],
    indicatorDots: true,
    autoplay: true,
    iconArray: [{
        iconurl: "../../image/icon-qiandao.png",
        icontext: "签到"
      },
      {
        iconurl: "../../image/icon-fujin.png",
        icontext: "附近"
      },
      {
        iconurl: "../../image/icon-zhanhui.png",
        icontext: "游展"
      },
      {
        iconurl: "../../image/icon-fuli.png",
        icontext: "福利"
      },
      {
        iconurl: "../../image/icon-muma.png",
        icontext: "玩乐"
      },
      {
        iconurl: "../../image/icon-xingxing.png",
        icontext: "周边"
      },
      {
        iconurl: "../../image/icon-tiyu.png",
        icontext: "体育"
      },
      {
        iconurl: "../../image/icon-qinzi.png",
        icontext: "亲子"
      }
    ],
    movieList: [{
        title: "唐人街探案",
        image: "../../image/movie01.jpg"
      },
      {
        title: "唐人街探案1",
        image: "../../image/movie01.jpg"
      }
    ],
    goodsList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    //测试网易云音乐API接口
    // wx.request({
    //   url: 'https://api.hibai.cn/api/index/index',
    //   method: 'POST',
    //   data: {
    //     "TransCode": "020112",
    //     "OpenId": "123456789",
    //     "Body": {
    //       "SongListId": "141998290"
    //     }
    //   },
    //   success: function (songs) {
    //     console.log('songs ==> ', songs);
    //   }
    // })


    let self = this;

    const goodsList = wx.getStorageSync('goodsList');

    if (!goodsList) {
      //如果没有缓存数据

      wx.request({
        //请求地址
        url: 'http://127.0.0.1:10000',

        //请求类型, GET默认
        method: 'GET',

        success: function(result) {
          self.setData({
            goodsList: result.data
          })

          //缓存数据
          wx.setStorageSync('goodsList', result.data);
        }

      })
    } else {
      //如果存在缓存数据
      this.setData({
        goodsList
      })
    }

  },

  /**
   * 生命周期函数--监听页面初次渲染完成 html+css
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },

  //跳转页面
  goPage(e) {
    //e: 事件对象
    console.log('e ==> ', e);
    wx.navigateTo({
      url: '../../pages/spdetail/spdetail?goodsId=' + e.currentTarget.dataset.goodsid
    })
  }
})