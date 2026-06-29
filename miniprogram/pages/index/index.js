const request = require('../../utils/request')
const storage = require('../../utils/storage')

Page({
    data: {
        stations: [],
        keyword: '',
        loading: false,
        mapLatitude: 39.9139,
        mapLongitude: 116.3914,
        mapScale: 14,
        markers: []
    },

    onLoad() {
        this.checkLogin()
        this.loadStations()
    },

    onShow() {
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
                const stations = res.data || []
                const markers = this.buildMarkers(stations)
                this.setData({
                    stations: stations,
                    markers: markers
                })
            }
        } catch (error) {
            console.error('加载投放点失败:', error)
        } finally {
            this.setData({ loading: false })
        }
    },

    buildMarkers(stations) {
        return stations
            .filter(item => item.latitude && item.longitude)
            .map((item, index) => ({
                id: item.id,
                latitude: item.latitude,
                longitude: item.longitude,
                title: item.name,
                width: 30,
                height: 30,
                callout: {
                    content: item.name + '\n可用 ' + item.availableSlots + '/' + item.totalSlots,
                    fontSize: 13,
                    borderRadius: 8,
                    padding: 8,
                    display: 'ALWAYS'
                }
            }))
    },

    onMarkerTap(e) {
        const stationId = e.detail.markerId
        wx.navigateTo({
            url: `/pages/station/station?id=${stationId}`
        })
    },

    onStationTap(e) {
        const stationId = e.currentTarget.dataset.id
        wx.navigateTo({
            url: `/pages/station/station?id=${stationId}`
        })
    }
})