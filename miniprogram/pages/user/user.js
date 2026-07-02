const storage = require('../../utils/storage')
const request = require('../../utils/request')

Page({
    data: {
        userInfo: null,
        stats: {
            totalOrders: 0,
            activeOrders: 0,
            totalSpent: 0
        }
    },

    onShow() {
        this.loadUserInfo()
        this.loadStats()
    },

    loadUserInfo() {
        const userInfo = storage.getUserInfo()
        if (userInfo) {
            const name = userInfo.nickname || userInfo.username || 'U'
            userInfo.avatarLetter = name.charAt(0).toUpperCase()
        }
        this.setData({ userInfo })
    },

    async loadStats() {
        const userInfo = storage.getUserInfo()
        if (!userInfo || !userInfo.id) return

        try {
            const res = await request.get('/order/list', { userId: userInfo.id })
            if (res.code === 200) {
                const orders = res.data || []
                const activeOrders = orders.filter(o => o.status === 1).length
                const totalSpent = orders
                    .filter(o => o.amount)
                    .reduce((sum, o) => sum + parseFloat(o.amount || 0), 0)

                this.setData({
                    stats: {
                        totalOrders: orders.length,
                        activeOrders,
                        totalSpent: totalSpent.toFixed(2)
                    }
                })
            }
        } catch (error) {
            console.error('加载统计数据失败:', error)
        }
    },

    /* --- 菜单跳转 --- */
    onOrdersTap() {
        wx.switchTab({ url: '/pages/orders/orders' })
    },

    onWalletTap() {
        wx.showToast({ title: '钱包功能开发中', icon: 'none' })
    },

    onFavoritesTap() {
        wx.showToast({ title: '收藏功能开发中', icon: 'none' })
    },

    onHelpTap() {
        wx.showModal({
            title: '帮助中心',
            content: '1. 扫码或点击投放点选择充电宝\n2. 确认借用后取出充电宝\n3. 使用完毕后在任意投放点归还\n4. 系统自动计算费用',
            showCancel: false
        })
    },

    onAboutTap() {
        wx.showModal({
            title: '关于我们',
            content: '共享充电宝系统 v1.0\n\n方便快捷的充电宝租借服务\n随时随地 · 扫码即借',
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
                    wx.showToast({ title: '已退出登录', icon: 'success' })
                    setTimeout(() => {
                        wx.redirectTo({ url: '/pages/login/login' })
                    }, 1200)
                }
            }
        })
    }
})
