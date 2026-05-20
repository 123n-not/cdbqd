const request = require('../../utils/request')
const util = require('../../utils/util')

Page({
    data: {
        orderId: null,
        order: null,
        loading: true
    },

    onLoad(options) {
        if (options.id) {
            this.setData({
                orderId: options.id
            })
            this.loadOrderDetail()
        }
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
            }
        } catch (error) {
            console.error('加载订单详情失败:', error)
            this.setData({ loading: false })
        }
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