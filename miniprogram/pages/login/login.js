const request = require('../../utils/request')
const storage = require('../../utils/storage')

Page({
    data: {
        username: '',
        password: '',
        isLogin: true,
        showPassword: false,
        submitting: false
    },

    onUsernameInput(e) {
        this.setData({ username: e.detail.value })
    },

    onPasswordInput(e) {
        this.setData({ password: e.detail.value })
    },

    switchToLogin() {
        this.setData({ isLogin: true })
    },

    switchToRegister() {
        this.setData({ isLogin: false })
    },

    togglePassword() {
        this.setData({ showPassword: !this.data.showPassword })
    },

    toggleMode() {
        this.setData({ isLogin: !this.data.isLogin })
    },

    async handleSubmit() {
        const { username, password, isLogin } = this.data

        if (!username.trim()) {
            wx.showToast({ title: '请输入用户名', icon: 'none' })
            return
        }

        if (!password || password.length < 6) {
            wx.showToast({ title: '密码至少6位', icon: 'none' })
            return
        }

        this.setData({ submitting: true })
        wx.showLoading({ title: '处理中...', mask: true })

        try {
            let res
            if (isLogin) {
                res = await request.post('/user/login', { username: username.trim(), password })
            } else {
                res = await request.post('/user/register', { username: username.trim(), password })
            }

            if (res.code === 200) {
                storage.setToken(res.data.id.toString())
                storage.setUserInfo(res.data)

                wx.showToast({ title: isLogin ? '登录成功' : '注册成功', icon: 'success' })

                setTimeout(() => {
                    wx.switchTab({ url: '/pages/index/index' })
                }, 1200)
            }
        } catch (error) {
            console.error('操作失败:', error)
        } finally {
            this.setData({ submitting: false })
            wx.hideLoading()
        }
    }
})
