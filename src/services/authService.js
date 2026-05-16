import apiClient from "./apiClient";
import { ENDPOINTS } from "./endpoints";

const publicRequest = { skipAuth: true };

export const authService = {
  register: (payload) => apiClient.post(ENDPOINTS.auth.register, payload, publicRequest),
  verifyOtp: (payload) => apiClient.post(ENDPOINTS.auth.verifyOtp, payload, publicRequest),
  resendOtp: (payload) => apiClient.post(ENDPOINTS.auth.resendOtp, payload, publicRequest),
  getProfile: () => apiClient.get(ENDPOINTS.auth.profile),
  updateProfile: (payload) => apiClient.put(ENDPOINTS.auth.profile, payload),
  studentLogin: (payload) => apiClient.post(ENDPOINTS.auth.studentLogin, payload, publicRequest),
  teacherLogin: (payload) => apiClient.post(ENDPOINTS.auth.teacherLogin, payload, publicRequest),
  guestLogin: (payload) => apiClient.post(ENDPOINTS.auth.guestLogin, payload, publicRequest),
  changePassword: (payload) => apiClient.post(ENDPOINTS.auth.changePassword, payload),
  requestPasswordOtpLogout: (payload) =>
    apiClient.post(ENDPOINTS.auth.requestPasswordOtpLogout, payload, publicRequest),
  confirmPasswordOtp: (payload) =>
    apiClient.post(ENDPOINTS.auth.confirmPasswordOtp, payload, publicRequest),
  requestPasswordOtp: (payload) => apiClient.post(ENDPOINTS.auth.requestPasswordOtp, payload),
  logout: (payload) => apiClient.post(ENDPOINTS.auth.logout, payload),
  deleteAccount: () => apiClient.post(ENDPOINTS.auth.deleteAccount),
};
