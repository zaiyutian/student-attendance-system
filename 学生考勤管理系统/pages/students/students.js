Page({
  data: {
    students: [],
    filteredStudents: [],
    searchText: '',
    classes: [],
    selectedClass: 'all'
  },

  onLoad: function () {
    this.loadStudents()
  },

  onShow: function () {
    this.loadStudents()
  },

  loadStudents: function () {
    const students = wx.getStorageSync('students') || []
    
    const classSet = new Set()
    students.forEach(s => classSet.add(s.class))
    
    const classes = [{id: 'all', name: '全部班级'}]
    classSet.forEach(c => {
      classes.push({id: c, name: c})
    })

    this.setData({
      students: students,
      filteredStudents: students,
      classes: classes
    })
  },

  onSearchInput: function (e) {
    const searchText = e.detail.value
    this.setData({
      searchText: searchText
    })
    this.filterStudents()
  },

  selectClass: function (e) {
    const classId = e.currentTarget.dataset.id
    this.setData({
      selectedClass: classId
    })
    this.filterStudents()
  },

  filterStudents: function () {
    let result = this.data.students
    
    if (this.data.selectedClass !== 'all') {
      result = result.filter(s => s.class === this.data.selectedClass)
    }
    
    if (this.data.searchText) {
      const keyword = this.data.searchText.toLowerCase()
      result = result.filter(s => 
        s.name.toLowerCase().includes(keyword) || 
        s.studentId.toLowerCase().includes(keyword)
      )
    }
    
    this.setData({
      filteredStudents: result
    })
  },

  showStudentInfo: function (e) {
    const student = e.currentTarget.dataset.student
    wx.showModal({
      title: student.name,
      content: `班级：${student.class}\n学号：${student.studentId}`,
      showCancel: false
    })
  },

  goAddAttendance: function (e) {
    const id = e.currentTarget.dataset.id
    const name = e.currentTarget.dataset.name
    wx.navigateTo({
      url: `/pages/add-attendance/add-attendance?studentId=${id}&studentName=${name}`
    })
  }
})