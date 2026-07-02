const request = require('../../utils/request')

Page({
    data: {
        stationId: null,
        station: null,
        powerBanks: [],
        loading: true,
        loadingPowerBanks: true
    },

    onLoad(options) {
        if (options.id) {
            this.setData({ stationId: options.id })
            this.loadStationDetail()
            this.loadPowerBanks()
        }
    },

    async loadStationDetail() {
        try {
            const res = await request.get(`/station/${this.data.stationId}`)
            if (res.code === 200) {
                const station = res.data
                station.availRate = Math.round(station.availableSlots / station.totalSlots * 100)
                this.setData({ station })
            }
        } catch (error) {
            console.error('加载投放点详情失败:', error)
        }
    },

    async loadPowerBanks() {
        this.setData({ loading: true, loadingPowerBanks: true })

        try {
            const res = await request.get('/powerbank/list', {
                stationId: this.data.stationId,
                status: 0
            })

            if (res.code === 200) {
                const powerBanks = (res.data || []).filter(item => item.batteryLevel >= 20)
                this.setData({
                    powerBanks,
                    loading: false,
                    loadingPowerBanks: false
                })
            }
        } catch (error) {
            console.error('加载充电宝列表失败:', error)
            this.setData({ loading: false, loadingPowerBanks: false })
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
