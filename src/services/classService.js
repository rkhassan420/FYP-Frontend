import apiClient from "./apiClient";
import { ENDPOINTS } from "./endpoints";

export const classService = {
  createClass: (payload) => apiClient.post(ENDPOINTS.classes.root, payload),
  getClasses: (params) => apiClient.get(ENDPOINTS.classes.root, { params }),
  getClassByCode: (code) => apiClient.get(ENDPOINTS.classes.byCode(code)),
  updateClass: (code, payload) => apiClient.patch(ENDPOINTS.classes.byCode(code), payload),
  deleteClass: (code) => apiClient.delete(ENDPOINTS.classes.byCode(code)),
  getEnrolledStudents: (code) => apiClient.get(ENDPOINTS.classes.enrolledStudents(code)),  
  removeStudentFromClass: (code, studentId) => apiClient.post(ENDPOINTS.classes.removeStudent(code), { student_id: studentId }),
  createAssignment: (code, payload) => apiClient.post(ENDPOINTS.classes.createAssignment(code), payload),
  getClassAssignments: (code) => apiClient.get(ENDPOINTS.classes.getAssignments(code)),
  deleteAssignment: (id) => apiClient.delete(ENDPOINTS.classes.deleteAssignment(id)),
  updateAssignment: (id, payload) => apiClient.patch(ENDPOINTS.classes.updateAssignment(id), payload),
  enrollInClass: (code) => apiClient.post(ENDPOINTS.classes.enroll(code)),
  getEnrolledClasses: () =>  apiClient.get(ENDPOINTS.classes.enrolledClasses),
  leaveClass: (code) => apiClient.post(ENDPOINTS.classes.leaveClass(code)),

  // POST /api/submissions/ — multipart/form-data
  // Fields: file, assignment (id), assignment_name (title)
 submitAssignment: (assignmentId, assignmentName, file) => {
  const formData = new FormData();
  formData.append("assignment", assignmentId);
  formData.append("assignment_name", assignmentName);
  formData.append("file", file);

  return apiClient.post(ENDPOINTS.submissions.root, formData);
  // ✅ No headers — axios detects FormData and sets Content-Type + boundary automatically
},


 guestSubmitAssignment: (assignmentId, assignmentName, file) => {
  const formData = new FormData();
 
  formData.append("assignment_name", assignmentName);
  formData.append("file", file);

  return apiClient.post(ENDPOINTS.submissions.root, formData);
  // ✅ No headers — axios detects FormData and sets Content-Type + boundary automatically
},




 // GET /api/submissions/:id/status/
getSubmissionStatus: (id) => apiClient.get(ENDPOINTS.submissions.status(id)),


    // GET /api/submissions/assignment/?assignment=<id>  (teacher only)
getAssignmentSubmissions: (assignmentId) =>
    apiClient.get(ENDPOINTS.submissions.byAssignment(assignmentId)),

  // services/classService.js  (or wherever your service lives)
getResults: (params = {}) => {
  const query = new URLSearchParams(params).toString();
  return apiClient.get(`results/${query ? "?" + query : ""}`);
},




terminateSubmission: (id) => apiClient.post(`/submissions/${id}/terminate/`),





};