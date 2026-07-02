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
            this.setData({ orderId: options.id })
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
                this.setData({ order: res.data, loading: false })
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
            this.feeTimer = setInterval(() => this.updateFee(), 1000)
        }
    },

    stopFeeTimer() {
        if (this.feeTimer) {
            clearInterval(this.feeTimer)
            this.feeTimer = null
        }
    },

    updateFee() {
        if (!this.data || !this.data.order) return
        const result = util.calcRunningFee(this.data.order.rentTime)
        try {
            this.setData({
                runningDuration: result.duration,
                runningFee: result.fee
            })
        } catch (e) {}
    },

    onReturnOrder() {
        wx.navigateTo({
            url: `/pages/returnPage/returnPage?orderId=${this.data.orderId}`
        })
    },

    /* --- 工具 --- */
    getStatusText(status) {
        return util.getOrderStatusText(status)
    },

    getStatusColor(status) {
        return util.getOrderStatusColor(status)
    },

    getStatusCardBg(status) {
        const bgMap = {
            0: 'linear-gradient(135deg, #9e9e9e, #bdbdbd)',
            1: 'linear-gradient(135deg, #4CAF50, #66BB6A, #43A047)',
            2: 'linear-gradient(135deg, #FF9800, #FFB74D, #F57C00)',
            3: 'linear-gradient(135deg, #2196F3, #64B5F6, #1976D2)'
        }
        return bgMap[status] || 'linear-gradient(135deg, #4CAF50, #43A047)'
    },

    getStatusIcon(status) {
        const iconMap = { 0: '❌', 1: '🔋', 2: '✅', 3: '🎉' }
        return iconMap[status] || '🔋'
    },

    getStatusDesc(status) {
        const descMap = { 0: '订单已取消', 1: '充电宝正在使用中', 2: '已归还，请确认费用', 3: '订单已完成' }
        return descMap[status] || ''
    },

    onPullDownRefresh() {
        this.loadOrderDetail()
        wx.stopPullDownRefresh()
    }
})
