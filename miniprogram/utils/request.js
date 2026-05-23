const app = getApp()

function request(url, method = 'GET', data = {}) {
    return new Promise((resolve, reject) => {
        console.log('请求开始:', { url, method, data })
        wx.request({
            url: app.globalData.baseUrl + url,
            method: method,
            data: data,
            timeout: 10000,
            header: {
                'Content-Type': 'application/json',
                'Authorization': wx.getStorageSync('token') || ''
            },
            success: (res) => {
                console.log('请求成功:', res)
                if (res.statusCode === 200) {
                    if (res.data.code === 200) {
                        resolve(res.data)
                    } else {
                        wx.showToast({
                            title: res.data.message || '请求失败',
                            icon: 'none'
                        })
                        reject(res.data)
                    }
                } else {
                    wx.showToast({
                        title: '网络错误',
                        icon: 'none'
                    })
                    reject(res)
                }
            },
            fail: (err) => {
                console.error('请求失败:', err)
                wx.showToast({
                    title: '网络连接失败',
                    icon: 'none'
                })
                reject(err)
            }
        })
    })
}

module.exports = {
    get: (url, data) => request(url, 'GET', data),
    post: (url, data) => request(url, 'POST', data),
    put: (url, data) => request(url, 'PUT', data),
    delete: (url, data) => request(url, 'DELETE', data)
}