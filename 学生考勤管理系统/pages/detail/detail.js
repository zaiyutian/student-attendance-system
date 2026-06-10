Page({
  data: {
    attendance: null
  },

  onLoad: function (options) {
    if (options.id) {
      this.loadAttendance(options.id)
    }
  },

  loadAttendance: function (id) {
    const attendances = wx.getStorageSync('attendances') || []
    const attendance = attendances.find(a => a.id === id)
    this.setData({
      attendance: attendance
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

  editAttendance: function () {
    const attendance = this.data.attendance
    wx.navigateTo({
      url: `/pages/add-attendance/add-attendance?studentId=${attendance.studentId}&studentName=${attendance.studentName}&editId=${attendance.id}`
    })
  },

  deleteAttendance: function () {
    const that = this
    wx.showModal({
      title: '确认删除',
      content: `确定要删除 ${this.data.attendance.studentName} 的考勤记录吗？`,
      confirmColor: '#f44336',
      success: function (res) {
        if (res.confirm) {
          const attendances = wx.getStorageSync('attendances') || []
          const filtered = attendances.filter(a => a.id !== that.data.attendance.id)
          wx.setStorageSync('attendances', filtered)
          
          wx.showToast({
            title: '删除成功',
            icon: 'success'
          })

          setTimeout(() => {
            wx.navigateBack()
          }, 1500)
        }
      }
    })
  },

  goBack: function () {
    wx.navigateBack()
  }
})