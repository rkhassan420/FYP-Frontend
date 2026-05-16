export const ENDPOINTS = {
  auth: {
    register: "/auth/register/",
    verifyOtp: "/auth/verify_otp/",
    resendOtp: "/auth/resend_otp/",
    profile: "/auth/profile/",
    studentLogin: "/auth/student_login/",
    teacherLogin: "/auth/teacher_login/",   
    guestLogin: "/auth/guest_login/",   
    changePassword: "/auth/change_password/",
    requestPasswordOtpLogout: "/auth/change_password_otp_logout/",
    confirmPasswordOtp: "/auth/confirm_password_otp/",
    requestPasswordOtp: "/auth/change_password_otp/",
    logout: "/auth/logout/",
    deleteAccount: "/auth/delete_account/",
  },

  

  students: {
    root: "/students",
    byId: (id) => `/students/${id}`,
  },

  classes: {
    root: "/classes/",
    byCode: (code) => `/classes/${code}/`,
    enrolledStudents: (code) => `/classes/${code}/students/`,
    enroll: (code) => `/classes/${code}/enroll/`,
    removeStudent: (code) => `/classes/${code}/remove_student/`,  // POST { student_id }
    createAssignment: (code) => `/classes/${code}/assignments/`,  // POST
    getAssignments: (code) => `/classes/${code}/assignment/`,     // GET
    deleteAssignment: (id) => `/classes/assignments/${id}/`,
    updateAssignment: (id) => `/classes/assignments/${id}/`,  
    enrolledClasses: "/classes/enrolled/",   
    leaveClass: (code) => `/classes/${code}/leave/`,  // POST - none  
  },


 submissions: {
    root: "/submissions/",
    status: (id) => `/submissions/${id}/status/`,
    byAssignment: (assignmentId) => `/submissions/assignment/?assignment=${assignmentId}`,
    

  },

};