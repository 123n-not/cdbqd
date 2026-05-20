const request = require('../../utils/request')

Page({
    data: {
        stationId: null,
        station: null,
        powerBanks: [],
        loading: true
    },

    onLoad(options) {
        if (options.id) {
            this.setData({
                stationId: options.id
            })
            this.loadStationDetail()
            this.loadPowerBanks()
        }
    },

    async loadStationDetail() {
        try {
            const res = await request.get(`/station/${this.data.stationId}`)

            if (res.code === 200) {
                this.setData({
                    station: res.data
                })
            }
        } catch (error) {
            console.error('加载投放点详情失败:', error)
        }
    },

    async loadPowerBanks() {
        this.setData({ loading: true })

        try {
            const res = await request.get('/powerbank/list', {
                stationId: this.data.stationId,
                status: 0
            })

            if (res.code === 200) {
                this.setData({
                    powerBanks: res.data || [],
                    loading: false
                })
            }
        } catch (error) {
            console.error('加载充电宝列表失败:', error)
            this.setData({ loading: false })
        }
    },

    onRentPowerBank(e) {
        const powerBankId = e.currentTarget.dataset.id
        wx.navigateTo({
            url: `/pages/rent/rent?powerBankId=${powerBankId}&stationId=${this.data.stationId}`
        })
    },

    onPullDownRefresh() {
        this.loadStationDetail()
        this.loadPowerBanks()
        wx.stopPullDownRefresh()
    }
})
