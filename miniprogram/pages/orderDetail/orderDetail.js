const request = require('../../utils/request')
const util = require('../../utils/util')

Page({
    data: {
        orderId: null,
        order: null,
        loading: true,
        runningDuration: '',
        runningFee: 0
    },

    onLoad(options) {
        if (options.id) {
            this.setData({
                orderId: options.id
            })
            this.loadOrderDetail()
        }
    },

    onShow() {
        this.startFeeTimer()
    },

    onHide() {
        this.stopFeeTimer()
    },

    onUnload() {
        this.stopFeeTimer()
    },

    async loadOrderDetail() {
        this.setData({ loading: true })

        try {
            const res = await request.get(`/order/${this.data.orderId}`)

            if (res.code === 200) {
                this.setData({
                    order: res.data,
                    loading: false
                })
                this.startFeeTimer()
            }
        } catch (error) {
            console.error('加载订单详情失败:', error)
            this.setData({ loading: false })
        }
    },

    startFeeTimer() {
        this.stopFeeTimer()
        if (this.data.order && this.data.order.status === 1) {
            this.updateFee()
            this.feeTimer = setInterval(() => {
                this.updateFee()
            }, 1000)
        }
    },

    stopFeeTimer() {
        if (this.feeTimer) {
            clearInterval(this.feeTimer)
            this.feeTimer = null
        }
    },

    updateFee() {
        const result = util.calcRunningFee(this.data.order.rentTime)
        this.setData({
            runningDuration: result.duration,
            runningFee: result.fee
        })
    },

    onReturnOrder() {
        wx.navigateTo({
            url: `/pages/returnPage/returnPage?orderId=${this.data.orderId}`
        })
    },

    getStatusText(status) {
        return util.getOrderStatusText(status)
    },

    getStatusColor(status) {
        return util.getOrderStatusColor(status)
    },

    onPullDownRefresh() {
        this.loadOrderDetail()
        wx.stopPullDownRefresh()
    }
})