App({
  onLaunch: function () {
    this.initData()
  },
  initData: function () {
    const students = wx.getStorageSync('students')
    const attendances = wx.getStorageSync('attendances')
    
    if (!students || students.length === 0) {
      const defaultStudents = [
        { id: '1', name: '张三', class: '高一(1)班', studentId: '2024001' },
        { id: '2', name: '李四', class: '高一(1)班', studentId: '2024002' },
        { id: '3', name: '王五', class: '高一(2)班', studentId: '2024003' },
        { id: '4', name: '赵六', class: '高一(2)班', studentId: '2024004' },
        { id: '5', name: '钱七', class: '高一(3)班', studentId: '2024005' }
      ]
      wx.setStorageSync('students', defaultStudents)
    }
    
    if (!attendances || attendances.length === 0) {
      const now = new Date()
      const defaultAttendances = [
        { id: '1', studentId: '1', studentName: '张三', date: this.formatDate(now), status: 'present', remark: '' },
        { id: '2', studentId: '2', studentName: '李四', date: this.formatDate(now), status: 'absent', remark: '请假' },
        { id: '3', studentId: '3', studentName: '王五', date: this.formatDate(now), status: 'late', remark: '迟到10分钟' },
        { id: '4', studentId: '4', studentName: '赵六', date: this.formatDate(now), status: 'present', remark: '' },
        { id: '5', studentId: '5', studentName: '钱七', date: this.formatDate(now), status: 'leave', remark: '病假' }
      ]
      wx.setStorageSync('attendances', defaultAttendances)
    }
  },
  formatDate: function (date) {
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    return `${year}-${month}-${day}`
  },
  globalData: {
    students: [],
    attendances: []
  }
})