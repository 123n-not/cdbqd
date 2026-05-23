App({
    globalData: {
        userInfo: null,
        token: null,
        baseUrl: 'http://127.0.0.1:8080/api'
    },

    onLaunch() {
        console.log('小程序启动')
        this.checkLogin()
    },

    onShow() {
        console.log('小程序显示')
    },

    onHide() {
        console.log('小程序隐藏')
    },

    checkLogin() {
        const token = wx.getStorageSync('token')
        if (token) {
            this.globalData.token = token
        }
    }
})