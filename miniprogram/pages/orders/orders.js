const request = require('../../utils/request')
const util = require('../../utils/util')
const storage = require('../../utils/storage')

Page({
    data: {
        orders: [],
        loading: false
    },

    onLoad() {
        this.loadOrders()
    },

    onShow() {
        this.loadOrders()
    },

    onPullDownRefresh() {
        this.loadOrders()
        wx.stopPullDownRefresh()
    },

    async loadOrders() {
        this.setData({ loading: true })

        try {
            const userInfo = storage.getUserInfo()
            if (!userInfo || !userInfo.id) {
                wx.redirectTo({
                    url: '/pages/login/login'
                })
                return
            }

            const res = await request.get('/order/list', { userId: userInfo.id })

            if (res.code === 200) {
                this.setData({
                    orders: res.data || [],
                    loading: false
                })
            }
        } catch (error) {
            console.error('加载订单列表失败:', error)
            this.setData({ loading: false })
        }
    },

    onOrderTap(e) {
        const orderId = e.currentTarget.dataset.id
        wx.navigateTo({
            url: `/pages/orderDetail/orderDetail?id=${orderId}`
        })
    },

    onReturnOrder(e) {
        const orderId = e.currentTarget.dataset.id
        wx.navigateTo({
            url: `/pages/returnPage/returnPage?orderId=${orderId}`
        })
    },

    getStatusText(status) {
        return util.getOrderStatusText(status)
    },

    getStatusColor(status) {
        return util.getOrderStatusColor(status)
    }
})