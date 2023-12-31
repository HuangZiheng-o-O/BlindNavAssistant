// components/authorCard/wh-authorCard.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        isHidden: {
            type: [Boolean, String],
            default: true
        }
    },

    /**
     * 组件的初始数据
     */
    data: {
      blindNum: '',
      blindId: ''
    },

    onShow() {
      if(getApp().globalData.blindId != ''){
        this.data.blindNum=getApp().globalData.blindNum
        this.data.blindId=getApp().globalData.blindId
      }
    },

    /**
     * 组件的方法列表
     */
    methods: {
        /**
         * 防止蒙版组件冒泡
         */
        prevent() {
            console.log("防止冒泡");
            var self = this;
            this.callBlind();
        },
        callBlind() {
          // 拨打电话!TODO:只是模拟?尚未能完全实现,可能是因为没有发布上线!待查
          wx.makePhoneCall({
          phoneNumber: this.data.blindNum
          })
        },
        //空方法,防止<input>输入框冒泡,作用类似prevent
        emptyMethod(){
        },
        // 获取输入值,在Mask遮罩关闭后,将会上传更新number
        bindIdInput: function (e) {
          this.setData({
            blindNum: e.detail.value
          })
        },
        bindNumInput: function (e) {
          console.log(this.data.blindId);
          console.log(e.detail.value);
          this.setData({
            blindId: e.detail.value
          })
        },
        showMask() {
            // console.warn("showMask...")
            this.setData({
                isHidden: false,
            });
            var animation = wx.createAnimation({
                duration: 1000,
                timingFunction: 'ease',
                delay: 0
            });
            animation.opacity(1).translate(wx.getSystemInfoSync().windowWidth, 0).step()
            this.setData({
                ani: animation.export()
            })
        },
        closeMask() {
            // console.warn("closeMask...")
            var that = this;
            var animation = wx.createAnimation({
                duration: 1000,
                timingFunction: 'ease',
                delay: 0
            });
            animation.opacity(0).translate(-wx.getSystemInfoSync().windowWidth, 0).step()
            that.setData({
                ani: animation.export()
            });
            //关闭遮罩时,更新本地数据
            console.log(that.data.blindId);
            // console.log(getApp().globalData.blindId);

            getApp().globalData.blindId=that.data.blindId;
            getApp().globalData.blindNum=that.data.blindNum;
            wx.setStorageSync('blindId', that.data.blindId);
            wx.setStorageSync('blindNum', that.data.blindNum);

            //TODO:关闭遮罩时,更新本地云端数据库数据

            setTimeout(function () {
                that.setData({
                    isHidden: true,
                });
            }, 600);
        }
    },
    /**
     * 通过组件的生命周期函数执行代码
     */
    lifetimes: {
        attached: function () {
            // 在组件实例进入页面节点树时执行
            this.setData({
                isHidden: true,
            });
        },
        detached: function () {
            // 在组件实例被从页面节点树移除时执行
        },
    },
})
