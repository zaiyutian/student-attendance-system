const app = getApp()

Page({
  data: {
    currentDate: '',
    weekDay: '',
    attendances: [],
    stats: {
      present: 0,
      absent: 0,
      late: 0,
      leave: 0
    }
  },

  onLoad: function () {
    this.initDate()
    this.loadAttendances()
  },

  onShow: function () {
    this.loadAttendances()
  },

  initDate: function () {
    const now = new Date()
    const year = now.getFullYear()
    const month = String(now.getMonth() + 1).padStart(2, '0')
    const day = String(now.getDate()).padStart(2, '0')
    const weekDays = ['周日', '周一', '周二', '周三', '周四', '周五', '周六']
    
    this.setData({
      currentDate: `${year}年${month}月${day}日`,
      weekDay: weekDays[now.getDay()]
    })
  },

  loadAttendances: function () {
    const attendances = wx.getStorageSync('attendances') || []
    const today = app.formatDate(new Date())
    
    const todayAttendances = attendances.filter(item => item.date === today)
    
    const stats = {
      present: todayAttendances.filter(a => a.status === 'present').length,
      absent: todayAttendances.filter(a => a.status === 'absent').length,
      late: todayAttendances.filter(a => a.status === 'late').length,
      leave: todayAttendances.filter(a => a.status === 'leave').length
    }

    this.setData({
      attendances: todayAttendances,
      stats: stats
    })
  },

  getStatusText: function (status) {
    const statusMap = {
      present: '出勤',
      absent: '缺勤',
      late: '迟到',
      leave: '请假'
    }
    return statusMap[status] || status
  },

  goAddAttendance: function () {
    wx.navigateTo({
      url: '/pages/add-attendance/add-attendance'
    })
  },

  goDetail: function (e) {
    const id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: `/pages/detail/detail?id=${id}`
    })
  }
})