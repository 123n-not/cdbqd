const request = require('../../utils/request')
const storage = require('../../utils/storage')

Page({
    data: {
        stations: [],
        keyword: '',
        tag: 'nearby',
        loading: false,
        mapLatitude: 39.9139,
        mapLongitude: 116.3914,
        mapScale: 14,
        markers: []
    },

    onLoad() {
        this.checkLogin()
        this.loadStations()
        this.getCurrentLocation()
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

    /* --- 定位 --- */
    getCurrentLocation() {
        wx.getLocation({
            type: 'gcj02',
            success: (res) => {
                this.setData({
                    mapLatitude: res.latitude,
                    mapLongitude: res.longitude
                })
            },
            fail: () => {
                console.log('获取位置失败，使用默认位置')
            }
        })
    },

    onLocateMe() {
        wx.getLocation({
            type: 'gcj02',
            success: (res) => {
                this.setData({
                    mapLatitude: res.latitude,
                    mapLongitude: res.longitude,
                    mapScale: 16
                })
                wx.showToast({ title: '已定位', icon: 'success', duration: 800 })
            },
            fail: () => {
                wx.showToast({ title: '定位失败，请检查权限', icon: 'none' })
            }
        })
    },

    /* --- 搜索 --- */
    onSearchInput(e) {
        this.setData({ keyword: e.detail.value })
    },

    onClearSearch() {
        this.setData({ keyword: '' })
        this.loadStations()
    },

    onSearch() {
        this.loadStations()
    },

    /* --- 快捷标签 --- */
    onQuickTag(e) {
        const tag = e.currentTarget.dataset.tag
        this.setData({ tag })
        if (tag === 'nearby') {
            this.getCurrentLocation()
        }
        this.loadStations()
    },

    /* --- 加载站点 --- */
    async loadStations() {
        this.setData({ loading: true })

        try {
            const params = {}
            if (this.data.keyword) {
                params.keyword = this.data.keyword
            }

            const res = await request.get('/station/list', params)

            if (res.code === 200) {
                let stations = res.data || []

                // 快捷标签筛选（前端兜底）
                if (this.data.tag === 'highBattery') {
                    stations = stations.filter(s => s.availableSlots > 0)
                }

                const markers = this.buildMarkers(stations)
                this.setData({ stations, markers })
            }
        } catch (error) {
            console.error('加载投放点失败:', error)
        } finally {
            this.setData({ loading: false })
        }
    },

    /* --- 构建地图标记 --- */
    buildMarkers(stations) {
        return stations
            .filter(item => item.latitude && item.longitude)
            .map((item) => ({
                id: item.id,
                latitude: item.latitude,
                longitude: item.longitude,
                title: item.name,
                width: 36,
                height: 36,
                iconPath: item.availableSlots > 0
                    ? '/images/marker-station.png'
                    : '',
                callout: {
                    content: item.name + '\n可用 ' + item.availableSlots + '/' + item.totalSlots,
                    fontSize: 12,
                    borderRadius: 10,
                    padding: 10,
                    display: 'ALWAYS',
                    bgColor: '#ffffff',
                    color: '#333333'
                }
            }))
    },

    /* --- 事件 --- */
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
    },

    onScanCode() {
        wx.scanCode({
            scanType: ['qrCode'],
            success: (res) => {
                let result = decodeURIComponent(res.result)
                result = result.replace('powerbankId', 'powerBankId')
                if (result.indexOf('stationId') !== -1 && result.indexOf('powerBankId') !== -1) {
                    wx.navigateTo({
                        url: `/pages/rent/rent?${result}`
                    })
                } else {
                    wx.showToast({
                        title: '无效的二维码',
                        icon: 'none'
                    })
                }
            },
            fail: (err) => {
                console.log('扫码取消或失败:', err)
            }
        })
    },

    onScanCodeLongPress() {
        wx.showModal({
            title: '调试输入',
            content: '请输入扫码内容（格式：stationId=2&powerbankId=5）',
            editable: true,
            placeholderText: 'stationId=2&powerbankId=5',
            success: (res) => {
                if (res.confirm && res.content) {
                    let result = res.content.trim()
                    result = result.replace('powerbankId', 'powerBankId')
                    if (result.indexOf('stationId') !== -1 && result.indexOf('powerBankId') !== -1) {
                        wx.navigateTo({
                            url: `/pages/rent/rent?${result}`
                        })
                    } else {
                        wx.showToast({
                            title: '格式不对，请输入: stationId=X&powerbankId=Y',
                            icon: 'none',
                            duration: 3000
                        })
                    }
                }
            }
        })
    }
})
