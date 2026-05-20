
function set(key, value) {
    try {
        wx.setStorageSync(key, value)
        return true
    } catch (e) {
        console.error('存储失败:', e)
        return false
    }
}

function get(key, defaultValue = null) {
    try {
        const value = wx.getStorageSync(key)
        return value !== '' ? value : defaultValue
    } catch (e) {
        console.error('读取失败:', e)
        return defaultValue
    }
}

function remove(key) {
    try {
        wx.removeStorageSync(key)
        return true
    } catch (e) {
        console.error('删除失败:', e)
        return false
    }
}

function clear() {
    try {
        wx.clearStorageSync()
        return true
    } catch (e) {
        console.error('清空失败:', e)
        return false
    }
}

function setUserInfo(userInfo) {
    return set('userInfo', userInfo)
}

function getUserInfo() {
    return get('userInfo')
}

function setToken(token) {
    return set('token', token)
}

function getToken() {
    return get('token')
}

function clearUserInfo() {
    remove('userInfo')
    remove('token')
}

module.exports = {
    set,
    get,
    remove,
    clear,
    setUserInfo,
    getUserInfo,
    setToken,
    getToken,
    clearUserInfo
}