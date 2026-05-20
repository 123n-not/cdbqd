const request = require('../../utils/request')

Page({
    data: {
        orderId: null,
        order: null,
        stations: [],
        selectedStationId: null,
        loading: true
    },

    onLoad(options) {
        if (options.orderId) {
            this.setData({
                orderId: options.orderId
            })
            this.loadOrderDetail()
            this.loadStations()
        }
    },

    async loadOrderDetail() {
        try {
            const res = await request.get(`/order/${this.data.orderId}`)

            if (res.code === 200) {
                this.setData({
                    order: res.data
                })
            }
        } catch (error) {
            console.error('加载订单详情失败:', error)
        }
    },

    async loadStations() {
        this.setData({ loading: true })

        try {
            const res = await request.get('/station/list')

            if (res.code === 200) {
                this.setData({
                    stations: res.data || [],
                    loading: false
                })
            }
        } catch (error) {
            console.error('加载投放点列表失败:', error)
            this.setData({ loading: false })
        }
    },

    onStationSelect(e) {
        const stationId = e.currentTarget.dataset.id
        this.setData({
            selectedStationId: stationId
        })
    },

    async onConfirmReturn() {
        if (!this.data.selectedStationId) {
            wx.showToast({
                title: '请选择归还投放点',
                icon: 'none'
            })
            return
        }

        wx.showModal({
            title: '确认归还',
            content: '确认要归还充电宝吗？',
            success: async (res) => {
                if (res.confirm) {
                    await this.returnPowerBank()
                }
            }
        })
    },

    async returnPowerBank() {
        wx.showLoading({
            title: '归还中...'
        })

        try {
            const res = await request.post('/order/return', {
                orderId: this.data.orderId,
                stationId: this.data.selectedStationId
            })

            if (res.code === 200) {
                wx.showToast({
                    title: '归还成功',
                    icon: 'success'
                })

                setTimeout(() => {
                    wx.switchTab({
                        url: '/pages/orders/orders'
                    })
                }, 1500)
            }
        } catch (error) {
            console.error('归还失败:', error)
        } finally {
            wx.hideLoading()
        }
    },

    onCancel() {
        wx.navigateBack()
    }
})