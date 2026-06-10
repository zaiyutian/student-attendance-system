const app = getApp()

Page({
  data: {
    students: [],
    selectedStudent: null,
    selectedDate: '',
    selectedStatus: '',
    remark: '',
    showStudentModal: false,
    statusOptions: [
      { value: 'present', label: '出勤', icon: '✓' },
      { value: 'absent', label: '缺勤', icon: '✗' },
      { value: 'late', label: '迟到', icon: '⏰' },
      { value: 'leave', label: '请假', icon: '📋' }
    ]
  },

  onLoad: function (options) {
    const now = new Date()
    this.setData({
      selectedDate: app.formatDate(now),
      selectedStatus: 'present'
    })

    if (options.studentId && options.studentName) {
      const students = wx.getStorageSync('students') || []
      const student = students.find(s => s.id === options.studentId)
      if (student) {
        this.setData({
          selectedStudent: student
        })
      }
    }

    this.loadStudents()
  },

  loadStudents: function () {
    const students = wx.getStorageSync('students') || []
    this.setData({
      students: students
    })
  },

  selectStudent: function () {
    this.setData({
      showStudentModal: true
    })
  },

  closeModal: function () {
    this.setData({
      showStudentModal: false
    })
  },

  stopPropagation: function () {},

  confirmStudent: function (e) {
    const student = e.currentTarget.dataset.student
    this.setData({
      selectedStudent: student,
      showStudentModal: false
    })
  },

  showDatePicker: function () {
    const that = this
    wx.showActionSheet({
      itemList: ['今天', '昨天', '前天', '选择日期'],
      success: function (res) {
        const now = new Date()
        let date = ''
        switch (res.tapIndex) {
          case 0:
            date = app.formatDate(now)
            break
          case 1:
            now.setDate(now.getDate() - 1)
            date = app.formatDate(now)
            break
          case 2:
            now.setDate(now.getDate() - 2)
            date = app.formatDate(now)
            break
          case 3:
            that.pickDate()
            return
        }
        if (date) {
          that.setData({ selectedDate: date })
        }
      }
    })
  },

  pickDate: function () {
    const that = this
    const now = new Date()
    wx.showModal({
      title: '选择日期',
      editable: true,
      placeholderText: `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`,
      success: function (res) {
        if (res.confirm && res.content) {
          that.setData({ selectedDate: res.content })
        }
      }
    })
  },

  selectStatus: function (e) {
    const value = e.currentTarget.dataset.value
    this.setData({
      selectedStatus: value
    })
  },

  onRemarkInput: function (e) {
    this.setData({
      remark: e.detail.value
    })
  },

  submitAttendance: function () {
    if (!this.data.selectedStudent) {
      wx.showToast({
        title: '请选择学生',
        icon: 'none'
      })
      return
    }

    const attendances = wx.getStorageSync('attendances') || []
    const newAttendance = {
      id: Date.now().toString(),
      studentId: this.data.selectedStudent.id,
      studentName: this.data.selectedStudent.name,
      date: this.data.selectedDate,
      status: this.data.selectedStatus,
      remark: this.data.remark
    }

    attendances.push(newAttendance)
    wx.setStorageSync('attendances', attendances)

    wx.showToast({
      title: '添加成功',
      icon: 'success'
    })

    setTimeout(() => {
      wx.navigateBack()
    }, 1500)
  }
})