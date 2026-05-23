const request = require('../../utils/request')
const storage = require('../../utils/storage')

Page({
    data: {
        username: '',
        password: '',
        isLogin: true
    },

    onUsernameInput(e) {
        this.setData({
            username: e.detail.value
        })
    },

    onPasswordInput(e) {
        this.setData({
            password: e.detail.value
        })
    },

    toggleMode() {
        this.setData({
            isLogin: !this.data.isLogin
        })
    },

    async handleSubmit() {
        const { username, password, isLogin } = this.data

        if (!username || !password) {
            wx.showToast({
                title: '请输入用户名和密码',
                icon: 'none'
            })
            return
        }

        if (password.length < 6) {
            wx.showToast({
                title: '密码至少6位',
                icon: 'none'
            })
            return
        }

        wx.showLoading({
            title: '处理中...'
        })

        try {
            let res
            if (isLogin) {
                res = await request.post('/user/login', { username, password })
            } else {
                res = await request.post('/user/register', { username, password })
            }

            if (res.code === 200) {
                storage.setToken(res.data.id.toString())
                storage.setUserInfo(res.data)

                wx.showToast({
                    title: isLogin ? '登录成功' : '注册成功',
                    icon: 'success'
                })

                setTimeout(() => {
                    wx.switchTab({
                        url: '/pages/index/index'
                    })
                }, 1500)
            }
        } catch (error) {
            console.error('操作失败:', error)
        } finally {
            wx.hideLoading()
        }
    }
})