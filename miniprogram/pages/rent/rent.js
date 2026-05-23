const request = require('../../utils/request')
const storage = require('../../utils/storage')

Page({
    data: {
        powerBankId: null,
        stationId: null,
        powerBank: null,
        station: null,
        loading: true
    },

    onLoad(options) {
        if (options.powerBankId && options.stationId) {
            this.setData({
                powerBankId: options.powerBankId,
                stationId: options.stationId
            })
            this.loadPowerBankDetail()
            this.loadStationDetail()
        }
    },

    async loadPowerBankDetail() {
        try {
            const res = await request.get(`/powerbank/${this.data.powerBankId}`)

            if (res.code === 200) {
                this.setData({
                    powerBank: res.data
                })
            }
        } catch (error) {
            console.error('加载充电宝详情失败:', error)
        }
    },

    async loadStationDetail() {
        try {
            const res = await request.get(`/station/${this.data.stationId}`)

            if (res.code === 200) {
                this.setData({
                    station: res.data,
                    loading: false
                })
            }
        } catch (error) {
            console.error('加载投放点详情失败:', error)
            this.setData({ loading: false })
        }
    },

    async onConfirmRent() {
        wx.showModal({
            title: '确认借用',
            content: '确认要借用这个充电宝吗？',
            success: async (res) => {
                if (res.confirm) {
                    await this.rentPowerBank()
                }
            }
        })
    },

    async rentPowerBank() {
        wx.showLoading({
            title: '借用中...'
        })

        try {
            const userInfo = storage.getUserInfo()
            if (!userInfo || !userInfo.id) {
                wx.redirectTo({
                    url: '/pages/login/login'
                })
                return
            }

            const res = await request.post('/order/rent', {
                userId: userInfo.id,
                powerbankId: this.data.powerBankId,
                stationId: this.data.stationId
            })

            if (res.code === 200) {
                wx.showToast({
                    title: '借用成功',
                    icon: 'success'
                })

                setTimeout(() => {
                    wx.switchTab({
                        url: '/pages/orders/orders'
                    })
                }, 1500)
            }
        } catch (error) {
            console.error('借用失败:', error)
        } finally {
            wx.hideLoading()
        }
    },

    onCancel() {
        wx.navigateBack()
    }
})