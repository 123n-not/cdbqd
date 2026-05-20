const storage = require('../../utils/storage')

Page({
    data: {
        userInfo: null
    },

    onShow() {
        this.loadUserInfo()
    },

    loadUserInfo() {
        const userInfo = storage.getUserInfo()
        this.setData({
            userInfo: userInfo
        })
    },

    onOrdersTap() {
        wx.switchTab({
            url: '/pages/orders/orders'
        })
    },

    onAboutTap() {
        wx.showModal({
            title: '关于我们',
            content: '共享充电宝系统 v1.0\n\n方便快捷的充电宝租借服务',
            showCancel: false
        })
    },

    onLogout() {
        wx.showModal({
            title: '退出登录',
            content: '确定要退出登录吗？',
            success: (res) => {
                if (res.confirm) {
                    storage.clearUserInfo()
                    wx.showToast({
                        title: '已退出登录',
                        icon: 'success'
                    })
                    setTimeout(() => {
                        wx.redirectTo({
                            url: '/pages/login/login'
                        })
                    }, 1500)
                }
            }
        })
    }
})