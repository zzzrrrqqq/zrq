// pages/my/my.js
Page({

      /**
       * 页面的初始数据
       */
      data: {
            mode:["我的收藏","我的订单","我的地址","联系客服","关于我们"]
      },

      /**
       * 生命周期函数--监听页面加载
       */ 
      onLoad: function (options) {
            var _this  = this;
            wx.login({
                  success(res){     
                        if(res.code){
                              // 获取用户信息
                              wx.getUserInfo({
                                    success(res){
                                          console.log(res);
                                          _this.setData(res.userInfo);
                                    }
                              })
                        }else{
                              console.log("登录失败" + res.errMsg);
                        }
                  }    
            })
      },
      bindGetUserInfo(e) {
            console.log(e.detail.userInfo)
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