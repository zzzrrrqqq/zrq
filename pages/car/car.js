// pages/car/car.js
var formatDate = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    carList: [],
    totalData: 0,

    allSelectedStatus: true,

    isInit: true,

    //购物车是否存在商品
    isHasGoods: false,

    //放大数字
    scale: 1000000000
  },

  // 减法触发事件
  carReduce: function(e) {
    var index = e.target.dataset.alpha;

    //获取当前购物车商品数据
    var simpleData = this.data.carList[index];

    simpleData.goodsCount = simpleData.goodsCount <= 1 ? 1 : --simpleData.goodsCount;

    this.setData({
      carList: this.data.carList
    })

    this.sum();

  },

  // 加法触发事件
  carAdd: function(e) {
    //获取当前下标
    var index = e.target.dataset.alpha;

    //获取当前购物车商品数据
    var simpleData = this.data.carList[index];
    simpleData.goodsCount++;

    this.setData({
      carList: this.data.carList
    })

    this.sum();
  },

  // 删除商品
  carDel: function(e) {
    var index = e.target.dataset.alpha;

    var currentGoods = this.data.carList.splice(index, 1)[0];

    this.setData({
      carList: this.data.carList
    })

    this.sum();

    //从购物车移除商品
    var shopcartData = wx.getStorageSync('shopcart');
    for (var i = 0; i < shopcartData.length; i++) {
      if (currentGoods.goodsId == shopcartData[i].goodsId) {
        shopcartData.splice(i, 1);
        break;
      }
    }

    wx.setStorageSync('shopcart', shopcartData);

    wx.showToast({
      title: '成功删除',
      icon: 'success',
      duration: 2000
    })

    this.controlAllSelectedStatus();


  },

  //当删除商品时, 控制全选复选框的状态
  controlAllSelectedStatus: function() {

    if (this.data.carList.length == 0) {
      this.setData({
        isHasGoods: false,
        allSelectedStatus: false
      })

      return;
    }

    for (var i = 0; i < this.data.carList.length; i++) {
      if (!this.data.carList[i].isCheck) {
        this.setData({
          allSelectedStatus: false
        })
        return;
      }
    }

    this.setData({
      allSelectedStatus: true
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

    console.log('onload');
    //获取购物车商品

    this.initPageData();
  },

  initPageData: function() {
    var shopcartData = wx.getStorageSync('shopcart');

    shopcartData = !shopcartData ? [] : shopcartData;

    if (shopcartData.length > 0) {
      this.setData({
        isHasGoods: true
      });
    }

    shopcartData.forEach(function(value) {
      value.isCheck = true;
    })

    this.setData({
      carList: shopcartData
    })

    //计算总价格
    this.sum();

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

    if (!this.data.isInit) {
      console.log('onshow');
      this.initPageData();
    }

    this.setData({
      isInit: false
    })
  },

  //全选
  allSelected() {

    //遍历购物车商品数据
    for (var i = 0; i < this.data.carList.length; i++) {
      this.data.carList[i].isCheck = !this.data.allSelectedStatus;
    }

    this.setData({
      carList: this.data.carList
    })

    this.setData({
      allSelectedStatus: !this.data.allSelectedStatus
    })

    //计算总价
    if (this.data.allSelectedStatus) {
      this.sum();
    } else {
      this.setData({
        totalData: 0
      })
    }
  },

  //单选
  simpleSelected(e) {
    var index = e.target.dataset.alpha;
    var isCheck = this.data.carList[index].isCheck;

    this.data.carList[index].isCheck = !isCheck;

    this.setData({
      carList: this.data.carList
    })

    //计算总价
    this.sum();

    if (isCheck) {
      //如果上一次勾选, 则点击后为没有勾选
      this.setData({
        allSelectedStatus: false
      })
    } else {

      for (var i = 0; i < this.data.carList.length; i++) {

        //如果存在一个没有勾选的复选框
        if (!this.data.carList[i].isCheck) {
          this.setData({
            allSelectedStatus: false
          })
          return;
        }
      }

      //如果不存在没有勾选复选框
      this.setData({
        allSelectedStatus: true
      })

    }
  },

  //计算总价格
  sum() {
    this.data.totalData = 0
    this.data.carList.forEach((function(v) {

      if (v.isCheck) {
        this.data.totalData += (v.goodsCount * this.data.scale) * (v.goodsPrice * this.data.scale);
      }

    }).bind(this));



    this.setData({
      totalData: (this.data.totalData / (this.data.scale * this.data.scale)).toFixed(2)
    })
  },

  //下单
  pay: function() {
    var orderInfo = {};

    //订单商品列表
    orderInfo.goods = [];

    //保存商品
    var goodsIds = [];

    //商品字段信息
    var keys = ['goodsId', 'goodsName', 'goodsImage', 'goodsCount', 'goodsPrice'];

    this.data.carList.forEach(function(v) {
      if (v.isCheck) {
        var o = {};
        // o.goodsId = v.goodsId;
        // o.goodsName = v.goodsName;
        // o.goodsImage = v.goodsImage;
        // o.goodsCount = v.goodsCount;
        // o.goodsPrice = v.goodsPrice;

        for (var i = 0; i < keys.length; i++) {
          o[keys[i]] = v[keys[i]];
        }

        orderInfo.goods.push(o);
        goodsIds.push(v.goodsId);
      }
    })

    if (orderInfo.goods.length == 0) {
      //如果没有商品
      wx.showToast({
        title: '请选择商品',
        icon: 'none',
        duration: 2000
      })

      return;
    }

    var time = new Date();

    //加盐：额外添加其他进行加密
    orderInfo.orderId = 'wx' + time.getTime();

    orderInfo.orderTime = formatDate(time);

    console.log('orderInfo ==> ', orderInfo);
    console.log('goodsIds ==> ', goodsIds);

    //获取订单数据
    var orderData = wx.getStorageSync('order');

    orderData = !orderData ? [] : orderData;

    orderData.unshift(orderInfo);

    //保存订单数据
    wx.setStorageSync('order', orderData);

    //移除购车商品
    var shopcartData = wx.getStorageSync('shopcart');

    for (var j = 0; j < shopcartData.length; j++) {

      if (goodsIds.length == 0) {
        break;
      }

      var index = goodsIds.indexOf(shopcartData[j].goodsId);
      goodsIds.splice(index, 1);
      shopcartData.splice(index, 1);
      j--;

    }

    wx.setStorageSync('shopcart', shopcartData);
  },


  //查看商品详情
  previewDetail: function(e) {
    wx.navigateTo({
      url: '../../pages/spdetail/spdetail?goodsId=' + e.currentTarget.dataset.goodsid
    })
  }
})