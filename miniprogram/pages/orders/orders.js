const request = require('../../utils/request')
const util = require('../../utils/util')
const storage = require('../../utils/storage')

Page({
    data: {
        orders: [],
        filteredOrders: [],
        loading: false,
        activeTab: 'all'
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

    /* --- 筛选 --- */
    onFilterTap(e) {
        const tab = e.currentTarget.dataset.tab
        this.setData({ activeTab: tab })
        this.applyFilter()
    },

    applyFilter() {
        const { orders, activeTab } = this.data
        let filtered = orders
        switch (activeTab) {
            case 'renting':
                filtered = orders.filter(o => o.status === 1)
                break
            case 'returned':
                filtered = orders.filter(o => o.status === 2)
                break
            case 'completed':
                filtered = orders.filter(o => o.status === 3)
                break
        }
        this.setData({ filteredOrders: filtered })
    },

    /* --- 加载订单 --- */
    async loadOrders() {
        this.setData({ loading: true })

        try {
            const userInfo = storage.getUserInfo()
            if (!userInfo || !userInfo.id) {
                wx.redirectTo({ url: '/pages/login/login' })
                return
            }

            const res = await request.get('/order/list', { userId: userInfo.id })

            if (res.code === 200) {
                const orders = res.data || []
                this.setData({ orders, loading: false })
                this.applyFilter()
                this.startFeeTimer()
            }
        } catch (error) {
            console.error('加载订单列表失败:', error)
            this.setData({ loading: false })
        }
    },

    /* --- 实时计费 --- */
    startFeeTimer() {
        this.stopFeeTimer()
        const hasActive = this.data.orders.some(o => o.status === 1)
        if (hasActive) {
            this.updateRunningFees()
            this.feeTimer = setInterval(() => this.updateRunningFees(), 1000)
        }
    },

    stopFeeTimer() {
        if (this.feeTimer) {
            clearInterval(this.feeTimer)
            this.feeTimer = null
        }
    },

    updateRunningFees() {
        if (!this.data || !this.data.orders) return
        const orders = this.data.orders.map(order => {
            if (order.status === 1) {
                const result = util.calcRunningFee(order.rentTime)
                return { ...order, runningDuration: result.duration, runningFee: result.fee }
            }
            return order
        })
        try { this.setData({ orders }); this.applyFilter() } catch (e) {}
    },

    /* --- 事件 --- */
    onOrderTap(e) {
        const orderId = e.currentTarget.dataset.id
        wx.navigateTo({ url: `/pages/orderDetail/orderDetail?id=${orderId}` })
    },

    onReturnOrder(e) {
        const orderId = e.currentTarget.dataset.id
        wx.navigateTo({ url: `/pages/returnPage/returnPage?orderId=${orderId}` })
    },

    /* --- 工具 --- */
    getStatusText(status) {
        return util.getOrderStatusText(status)
    },

    getStatusColor(status) {
        return util.getOrderStatusColor(status)
    },

    getStatusBg(status) {
        const bgMap = {
            0: '#F5F5F5',
            1: '#E8F5E9',
            2: '#FFF3E0',
            3: '#E3F2FD'
        }
        return bgMap[status] || '#F5F5F5'
    }
})
