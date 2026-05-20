const request = require('../../utils/request')
const storage = require('../../utils/storage')

Page({
    data: {
        stations: [],
        keyword: '',
        loading: false
    },

    onLoad() {
        this.checkLogin()
        this.loadStations()
    },

    onPullDownRefresh() {
        this.loadStations()
        wx.stopPullDownRefresh()
    },

    checkLogin() {
        const token = storage.getToken()
        if (!token) {
            wx.redirectTo({
                url: '/pages/login/login'
            })
        }
    },

    onSearchInput(e) {
        this.setData({
            keyword: e.detail.value
        })
    },

    onSearch() {
        this.loadStations()
    },

    async loadStations() {
        this.setData({ loading: true })

        try {
            const params = {}
            if (this.data.keyword) {
                params.keyword = this.data.keyword
            }

            const res = await request.get('/station/list', params)

            if (res.code === 200) {
                this.setData({
                    stations: res.data || []
                })
            }
        } catch (error) {
            console.error('加载投放点失败:', error)
        } finally {
            this.setData({ loading: false })
        }
    },

    onStationTap(e) {
        const stationId = e.currentTarget.dataset.id
        wx.navigateTo({
            url: `/pages/station/station?id=${stationId}`
        })
    }
})