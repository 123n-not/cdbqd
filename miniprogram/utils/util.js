
function formatTime(date) {
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    const hour = date.getHours()
    const minute = date.getMinutes()
    const second = date.getSeconds()

    return `${[year, month, day].map(formatNumber).join('-')} ${[hour, minute, second].map(formatNumber).join(':')}`
}

function formatDate(date) {
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()

    return `${[year, month, day].map(formatNumber).join('-')}`
}

function formatNumber(n) {
    n = n.toString()
    return n[1] ? n : `0${n}`
}

function formatMoney(amount) {
    return parseFloat(amount).toFixed(2)
}

function formatTimeAgo(timestamp) {
    const now = Date.now()
    const diff = now - timestamp
    const minute = 60 * 1000
    const hour = 60 * minute
    const day = 24 * hour

    if (diff < minute) {
        return '刚刚'
    } else if (diff < hour) {
        return `${Math.floor(diff / minute)}分钟前`
    } else if (diff < day) {
        return `${Math.floor(diff / hour)}小时前`
    } else {
        return `${Math.floor(diff / day)}天前`
    }
}

function getOrderStatusText(status) {
    const statusMap = {
        0: '已取消',
        1: '使用中',
        2: '已归还',
        3: '已完成'
    }
    return statusMap[status] || '未知'
}

function getOrderStatusColor(status) {
    const colorMap = {
        0: '#999',
        1: '#4CAF50',
        2: '#FF9800',
        3: '#2196F3'
    }
    return colorMap[status] || '#333'
}

function getPowerBankStatusText(status) {
    const statusMap = {
        0: '可借用',
        1: '使用中',
        2: '维护中'
    }
    return statusMap[status] || '未知'
}

function calcRunningFee(rentTimeStr) {
    if (!rentTimeStr) return { duration: '--', fee: 0 }
    const rentTime = new Date(rentTimeStr.replace(/-/g, '/')).getTime()
    const now = Date.now()
    const diffMs = now - rentTime
    if (diffMs < 0) return { duration: '--', fee: 0 }
    const totalMinutes = Math.floor(diffMs / 60000)
    const hours = Math.floor(totalMinutes / 60)
    const minutes = totalMinutes % 60
    const duration = hours + '小时' + minutes + '分钟'
    const feeHours = Math.ceil(diffMs / 3600000)
    const fee = feeHours * 1
    return { duration, fee }
}

module.exports = {
    formatTime,
    formatDate,
    formatMoney,
    formatTimeAgo,
    getOrderStatusText,
    getOrderStatusColor,
    getPowerBankStatusText,
    calcRunningFee
}