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
        this.startFeeTimer()
    },

    onHide() {
        this.stopFeeTimer()
    },

    onUnload() {
        this.stopFeeTimer()
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
                this.startFeeTimer()
            }
        } catch (error) {
            console.error('加载订单列表失败:', error)
            this.setData({ loading: false })
        }
    },

    startFeeTimer() {
        this.stopFeeTimer()
        const hasActive = this.data.orders.some(o => o.status === 1)
        if (hasActive) {
            this.updateRunningFees()
            this.feeTimer = setInterval(() => {
                this.updateRunningFees()
            }, 1000)
        }
    },

    stopFeeTimer() {
        if (this.feeTimer) {
            clearInterval(this.feeTimer)
            this.feeTimer = null
        }
    },

    updateRunningFees() {
        const orders = this.data.orders.map(order => {
            if (order.status === 1) {
                const result = util.calcRunningFee(order.rentTime)
                return {
                    ...order,
                    runningDuration: result.duration,
                    runningFee: result.fee
                }
            }
            return order
        })
        this.setData({ orders })
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