// miniprogram/pages/wehalo/wehalo.js
//获取应用实例
const app = getApp();
const request = require('../../utils/request.js');
Page({

    /**
     * 页面的初始数据
     */
    data: {
        StatusBar: app.globalData.StatusBar,
        CustomBar: app.globalData.CustomBar,
        Custom: app.globalData.Custom,
        skin: app.globalData.skin,
        loading: true,
        animationTime: 1,
        LinksList: '',
        colourList: [{
            colour: 'bg-red'
        }, {
            colour: 'bg-orange'
        }, {
            colour: 'bg-yellow'
        }, {
            colour: 'bg-olive'
        }, {
            colour: 'bg-green'
        }, {
            colour: 'bg-cyan'
        }, {
            colour: 'bg-blue'
        }, {
            colour: 'bg-purple'
        }, {
            colour: 'bg-mauve'
        }, {
            colour: 'bg-pink'
        }, {
            colour: 'bg-lightBlue'
        }],
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

        this.randomNum();
        var urlLinks = app.globalData.url + '/api/content/links';
        var token = app.globalData.token;
        var params = {
            sort: 'id,asc'
        };
        // //@todo Links网络请求API数据;暂时先使用"中国盲人协会的urlLinks"
        // request.requestGetApi(urlLinks, token, params, this, this.successLinks, this.failLinks);
        var ATempLink = {
          url: 'http://www.zgmx.org.cn/',
          logo: 'http://www.zgmx.org.cn/templates/main/images/logo.png',
          name: '中国盲人协会',
          description: '协中国盲人协会是由全国盲人（含低视力）和与盲人工作有关的社会团体、企事业单位及个人自愿结成的非营利性社会组织。的宗旨是：弘扬人道主义思想，发展残疾人事业。代表盲人的共同利益，反映盲人的特殊需求，为盲人服务。维护盲人的合法权益，促进盲人平等充分参与社会生活，共享社会物质文化成果。'

        };
        this.setData({
          LinksList: {ATempLink},
      });
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

    },
    //onload函数中执行的requestGetApi函数 的回调函数,requestGetApi函数暂时被注释,使用该函数暂时未被回调
    successLinks: function (res, selfObj) {
        var that = this;
        console.warn(res.data);
        that.setData({
            LinksList: res.data,
        });
    },

    failLinks: function (res, selfObj) {
        console.error('failLinks', res)
    },

    //获取随机数
    randomNum: function () {
        var num = Math.floor(Math.random() * 10);
        this.setData({
            randomNum: num
        });
    },

    prevent(event) {
        // console.log(event.currentTarget.dataset.url);
        var self = this;
        wx.setClipboardData({
            data: event.currentTarget.dataset.url,
        });

    },
})