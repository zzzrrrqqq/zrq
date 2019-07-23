// pages/spdetail/spdetail.js
var formatDate = require('../../utils/util.js');
Page({

      /**
       * 页面的初始数据
       */
      data: {
            indicatorDots: true,
            autoplay: true,

            height: 0,

            //屏幕宽度
            screenWidth: 0,

            goodsDetailData: {},

            // 购物车商品个数
            shopcartCount: 0
      },

      /**
       * 生命周期函数--监听页面加载
       */
      onLoad: function (options) {
        //参数都保存在 options
        console.log('options ==> ', options);

        //初始化数据
        //获取商品缓存数据
        var goodsList = wx.getStorageSync('goodsList');

        for (var i = 0; i < goodsList.length; i++) {
          if (goodsList[i].goodsId == options.goodsId) {
            this.setData({
              goodsDetailData: goodsList[i]
            })

            break;
          }
        }

        //获取系统信息
        var res = wx.getSystemInfoSync();

        this.screenWidth = res.screenWidth;


        //获取购物车商品个数
        var shopcartData = wx.getStorageSync('shopcart');



        this.setData({
          shopcartCount: !shopcartData ? 0 : shopcartData.length
        })
      },

      /**
       * 生命周期函数--监听页面初次渲染完成
       */
      onReady: function () {
        console.log('this.data.goodsDetailData ==> ', this.data.goodsDetailData);
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

      },

      imgloaded: function (e) {
        var height = this.screenWidth / e.detail.width * e.detail.height;

        this.setData({
          height
        })

      },

      //加入购物车
      addShopcart: function () {
        var goodsInfo = {};

        var addTime = formatDate(new Date());

        goodsInfo.goodsId = this.data.goodsDetailData.goodsId;
        goodsInfo.goodsName = this.data.goodsDetailData.goodsName;
        goodsInfo.goodsImage = this.data.goodsDetailData.goodsImage;
        goodsInfo.goodsCount = 1;
        goodsInfo.goodsPrice = this.data.goodsDetailData.goodsPrice;
        goodsInfo.addtime = addTime;

        console.log('goodsInfo ==> ', goodsInfo);

        //获取购物数据
        var shopcartData = wx.getStorageSync('shopcart');

        shopcartData = !shopcartData ? [] : shopcartData;

        shopcartData.unshift(goodsInfo);

        wx.setStorageSync('shopcart', shopcartData);

        this.setData({
          shopcartCount: ++this.data.shopcartCount
        })

        wx.showToast({
          title: '成功加入',
          icon: 'success',
          duration: 2000
        })

      },

      //前往商称
      productCity: function () {
        wx.switchTab({
          url: '../../pages/index/index'
        })
      },

      //前往支付
      pay: function () {
        wx.switchTab({
          url: '../../pages/car/car'
        })
      }

})