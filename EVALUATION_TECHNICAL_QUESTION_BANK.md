# AI Content Evaluator - Technical Evaluation Question Bank

Prepared for evaluation on May 21, 2026.

This document is based on the current frontend project in `FYP Front`. Use it as a viva/interview preparation sheet. The answers are intentionally short so you can speak naturally and then open the related file if the evaluator asks for proof.

## 1. Project Snapshot

**Project purpose:** AI Content Evaluator is a role-based React frontend for detecting AI-generated content in uploaded assignments. It supports landing pages, authentication, teacher dashboards, student dashboards, guest evaluation, class management, assignment submission, and report viewing.

**Frontend stack:** React 19, Vite 7, React Router DOM 7, Axios, lucide-react, react-icons, jsPDF, custom CSS.

**Backend integration:** The frontend calls a backend API using Axios through `src/services/apiClient.js`. The default API base URL is `http://127.0.0.1:8000/api`, configurable with `VITE_API_BASE_URL`.

**Main roles:** Guest, Student, Teacher, Admin.

**Important files to show:**

| Area | File |
|---|---|
| App entry and routing | `src/main.jsx` |
| Landing page composition | `src/App.jsx` |
| Protected route check | `src/components/ProtectedRoute.jsx` |
| API client/interceptors | `src/services/apiClient.js` |
| Endpoints | `src/services/endpoints.js` |
| Auth storage | `src/services/authStorage.js` |
| Auth service | `src/services/authService.js` |
| Class/assignment/submission service | `src/services/classService.js` |
| Reusable evaluator | `src/components/Evaluator/Evaluator.jsx` |
| Teacher dashboard | `src/pages/Teacher/TeacherDashboard/TeacherDashboard.jsx` |
| Teacher classes | `src/pages/Teacher/TeacherManageClasses/TeacherClasses.jsx` |
| Teacher assignments | `src/pages/Teacher/TeacherManageAssignment/AssignAssignment.jsx` |
| Student dashboard shell | `src/pages/Student/StudentDashboard.jsx` |
| Student assignment submission | `src/pages/Student/StudentAssignments.jsx` |
| Student reports | `src/pages/Student/StudentReports.jsx` |
| Guest dashboard | `src/pages/Guest/GuestDashboard.jsx` |
| Theme system | `src/components/Theme/ThemeContext.jsx` |
| Global CSS variables | `src/index.css` |

## 2. Core Project Questions

1. **What is your project?**  
   It is a frontend for an AI Content Evaluator platform where students, teachers, and guests can submit content for AI analysis and view reports. Teachers can manage classes and assignments, students can join classes and submit work, guests can evaluate standalone content, and admins have basic management screens.

2. **Why did you use React?**  
   React fits this project because the UI is component-based: navbar, dashboards, sidebars, forms, modals, evaluator, reports, and tables can all be separated and reused.

3. **Why did you use Vite?**  
   Vite gives a fast development server, simple configuration, hot module replacement, and optimized production builds.

4. **What is the project entry point?**  
   `src/main.jsx` creates the React root, wraps the app with `ThemeProvider`, configures `RouterProvider`, and defines all top-level routes.

5. **What does `App.jsx` do?**  
   It renders the landing page sections: navbar, hero, features, how it works, roles, advantages, security, FAQ, about, scroll-to-top, and footer.

6. **How is your code organized?**  
   Reusable landing/shared UI is in `src/components`, role-specific screens are in `src/pages`, API logic is in `src/services`, global styles are in `src/index.css`, and static assets are in `public`.

7. **What are the main modules?**  
   Landing page, authentication, service layer, protected routing, evaluator, teacher portal, student portal, guest portal, admin portal, theme system.

8. **What is the most important component in the project?**  
   `Evaluator.jsx`, because it handles file/text submission, text-to-PDF conversion, progress display, polling backend status, history, result display, and termination.

9. **Is this only a frontend?**  
   This repository is the frontend. It integrates with backend API endpoints for auth, classes, assignments, submissions, results, and dashboard stats.

10. **Which package handles API calls?**  
    Axios, through the shared `apiClient`.

11. **Which package handles routing?**  
    `react-router-dom`.

12. **Which package handles text-to-PDF conversion?**  
    `jspdf`, used in the evaluator when a user pastes text instead of uploading a PDF.

13. **Which icon library is used?**  
    Mainly `lucide-react`, plus some custom SVG icons in teacher/admin components.

14. **What kind of styling is used?**  
    Custom CSS files with global CSS variables for theme colors, spacing, shadows, and reusable button/card styles.

15. **What is the deployment support file?**  
    `public/_redirects` redirects all routes to `index.html`, useful for SPA hosting where browser refresh must still load the React app.

## 3. Routing And Navigation Questions

16. **Where are routes defined?**  
    In `src/main.jsx` using `createBrowserRouter`.

17. **Why use client-side routing?**  
    It allows fast navigation between pages without full page reloads, and supports nested dashboards for teacher and student roles.

18. **What is the route for the landing page?**  
    `/`, rendered by `App`.

19. **What is the route for role selection?**  
    `/role-selection`.

20. **What are teacher auth routes?**  
    `/login/teacher`, `/signup/teacher`, `/otp/teacher`, `/forgot-password/teacher`, `/set-password/teacher`.

21. **What is the teacher dashboard route?**  
    `/teacher/dashboard/*`, protected by `ProtectedRoute`.

22. **What are student auth routes?**  
    `/signup/student`, `/login/student`, `/student/password-forgot`, `/student/verify-otp`, `/student/reset-password`.

23. **What is the student dashboard route?**  
    `/student/dashboard`, with nested children like `overview`, `join-class`, `my-classes`, `assignments`, `reports`, and `setting`.

24. **What are guest routes?**  
    `/guest/login`, `/guest/signup`, `/guest/forgot-pass`, `/guest/verify-otp`, `/guest/reset-password`, `/guest/dashboard`.

25. **What are admin routes?**  
    `/login/admin` and `/admin/dashboard`.

26. **How does nested routing work in the student dashboard?**  
    `StudentDashboard.jsx` renders the sidebar and an `<Outlet />`. The child route decides which page appears inside the dashboard.

27. **How does nested routing work in the teacher dashboard?**  
    `TeacherDashboard.jsx` uses nested `Routes` inside the dashboard shell and maps routes like `home`, `evaluator`, `create-classes`, `assignments`, and `setting`.

28. **Why use `Navigate`?**  
    It redirects users, for example from `/student/dashboard` to `/student/dashboard/overview` and from `/teacher/dashboard` to `/teacher/dashboard/home`.

29. **How does the sidebar know the active page?**  
    Teacher and student sidebars inspect `location.pathname` and compare it with route segments.

30. **Why use lazy loading and `Suspense`?**  
    Lazy loading splits code so large pages load only when needed. `Suspense` displays the loading component while lazy components load.

31. **Where is lazy loading used?**  
    In `App.jsx` for landing sections and in `main.jsx` for many route components.

32. **What happens if a route has an error?**  
    The root route defines `errorElement: <Error />`, so React Router can show the error component.

## 4. Authentication And Authorization Questions

33. **How is authentication handled on the frontend?**  
    Login calls `authService`, saves access/refresh tokens in `localStorage` through `saveAuthSession`, and the Axios client attaches the access token to protected requests.

34. **Where are tokens stored?**  
    In `localStorage` using keys like `accessToken`, `refreshToken`, `authToken`, and `authUser`.

35. **Why store both `accessToken` and `authToken`?**  
    The code supports both the newer `accessToken` key and an older/fallback `authToken` key for compatibility.

36. **How is a token attached to API requests?**  
    `apiClient` has a request interceptor that reads the access token and sets `Authorization: Bearer <token>`.

37. **How do public API requests skip auth?**  
    Service functions pass `{ skipAuth: true }`; the request interceptor checks `config.skipAuth` and avoids adding the token.

38. **What is `ProtectedRoute`?**  
    A wrapper component that checks for a refresh token. If missing, it redirects to `/login/teacher`.

39. **What is a limitation in `ProtectedRoute`?**  
    It redirects every unauthenticated user to the teacher login, even when a student route is protected. A stronger version would accept a `redirectTo` prop or detect role.

40. **What happens on logout?**  
    Sidebars call `authService.logout` with the refresh token when possible, then call `clearAuthSession` and navigate to the login page.

41. **How does signup work?**  
    Signup validates form fields, calls `authService.register`, passes a role such as `teacher`, `student`, or `guest`, then navigates to the OTP verification page.

42. **How does OTP verification work?**  
    OTP screens store 4 input digits, support paste/navigation behavior, validate numeric input, call `authService.verifyOtp`, and then navigate to login or save session depending on role flow.

43. **How does forgot password work?**  
    Forgot password calls the password OTP endpoint, then OTP verification passes the OTP token to the reset password screen.

44. **Why validate forms in frontend if backend also validates?**  
    Frontend validation improves user experience and prevents obvious invalid requests, while backend validation remains the real security boundary.

45. **What password validation rules exist in signup?**  
    Minimum 8 characters, uppercase, lowercase, number, special character, and no spaces.

46. **How are backend validation errors displayed?**  
    Auth pages parse field errors such as `email`, `password`, `non_field_errors`, and `detail` to show friendly messages.

47. **Is localStorage the most secure token storage?**  
    It is simple and persistent, but vulnerable to XSS if the app has script injection. A more secure production approach is often httpOnly cookies plus CSRF protection.

48. **Does admin login call the backend?**  
    Currently no. `AdminLogin.jsx` navigates directly to `/admin/dashboard`. This is a known incomplete area/mock implementation.

## 5. API Service Layer Questions

49. **Why did you create a services folder?**  
    To centralize API logic so components call readable functions like `authService.teacherLogin()` instead of duplicating Axios calls.

50. **What does `apiClient.js` do?**  
    It creates the Axios instance, sets base URL, timeout, JSON headers, attaches auth tokens, handles FormData headers, and normalizes API errors.

51. **Why delete `Content-Type` for FormData?**  
    The browser must set the multipart boundary automatically. Manually setting `Content-Type: multipart/form-data` can break uploads.

52. **How is the base URL configured?**  
    `import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8000/api"`.

53. **Where are API paths stored?**  
    In `src/services/endpoints.js`.

54. **Why keep endpoints in one file?**  
    If a backend route changes, only the endpoint definition usually needs updating.

55. **What does `authService` include?**  
    Register, OTP verify/resend, profile get/update, student/teacher/guest login, password change/OTP confirmation, logout, and delete account.

56. **What does `classService` include?**  
    Class CRUD, student enrollment, assignment CRUD, assignment submission, guest submission, submission status polling, result fetching, and submission termination.

57. **How are paginated and non-paginated responses handled?**  
    Many components check both `Array.isArray(response)` and `response.results` or `response.data`.

58. **What is the Axios response interceptor doing?**  
    It returns `response.data` directly and rejects errors as a normalized object with `message`, `status`, and `data`.

59. **Why is returning `response.data` useful?**  
    Components receive the actual API payload directly instead of needing `response.data` everywhere.

60. **What is a possible downside of response normalization?**  
    If a component needs headers or status metadata from successful responses, it will not receive the full Axios response.

61. **What timeout is used for API calls?**  
    15 seconds.

62. **Which direct API calls bypass service wrappers?**  
    Some dashboard/report components import `apiClient` directly for `/submissions/`, `/results/`, and `/dashboard/teacher_overview/`.

63. **Is direct `apiClient` usage wrong?**  
    Not always, but for consistency it would be cleaner to wrap these in services.

## 6. Evaluator Component Questions

64. **What does the Evaluator component do?**  
    It lets users upload a PDF or paste text, sends it to the backend, polls processing status, displays AI/human/grammar scores, stores history, opens report PDFs, and allows termination.

65. **Where is the Evaluator used?**  
    Guest dashboard and teacher dashboard. It is reusable through props like `activeSessionId`, `onSessionChange`, and `storagePrefix`.

66. **Why pass `storagePrefix`?**  
    To keep guest and teacher evaluator histories separate, for example `guest_ev_history` vs `teacher_ev_history`.

67. **What input modes are supported?**  
    PDF upload and pasted text.

68. **How is pasted text submitted?**  
    The text is converted to a PDF file using `jsPDF` in `textToPdfFile`, then uploaded like a normal PDF.

69. **Why convert text to PDF?**  
    The backend submission API expects a file, so text mode is adapted into the same file-upload pipeline.

70. **What file validation is performed?**  
    Only PDF files are accepted, checked by MIME type or `.pdf` extension, with a maximum size of 10MB.

71. **What text validation is performed?**  
    Text cannot be empty and must contain at least 10 words. The UI recommends around 50 words for better analysis.

72. **How is upload progress shown?**  
    A local interval increments progress up to 85 percent while the request is pending, then it jumps to 100 percent after success.

73. **Is upload progress exact?**  
    Not exactly. It is a simulated UX progress indicator, not Axios upload progress.

74. **How is backend processing progress shown?**  
    The component polls `classService.getSubmissionStatus(id)` every 3 seconds and reads `processing_percentage` and `is_complete`.

75. **Why polling instead of WebSockets?**  
    Polling is simpler and enough for this workflow. WebSockets could be an improvement for real-time updates at scale.

76. **What happens when processing completes?**  
    The polling interval stops, pending state is cleared from localStorage, results are fetched, and history is updated as complete.

77. **How are results fetched?**  
    `classService.getResults({ submission: submissionId })` is called, and the result matching that submission is selected.

78. **What scores are displayed?**  
    AI percentage, human percentage, grammar score, AI paragraphs, total paragraphs, and report URL if available.

79. **How is a high AI result flagged?**  
    The UI treats AI percentage greater than or equal to 50 as high AI content.

80. **How are circular score rings created?**  
    SVG circles use `strokeDasharray` and `strokeDashoffset` to represent percentages.

81. **What is saved in evaluator history?**  
    Submission id, title, file name, date, processing state, scores, paragraph counts, report URL, and saved time.

82. **Why save in-progress submission to localStorage?**  
    So if the user refreshes the page, the app can restore the processing state and continue polling.

83. **How does history update the sidebar?**  
    The evaluator dispatches a custom `ev_history_updated` event after saving or clearing history.

84. **How is cancel/terminate handled?**  
    The evaluator calls `classService.terminateSubmission(id)`, stops polling, removes pending/history state, and resets the UI.

85. **What is `useRef` used for in Evaluator?**  
    To keep mutable values like processing start time, active job id, file input reference, and polling interval without forcing re-renders.

86. **What is `useCallback` used for?**  
    `startPolling` and `setProcessingStart` are memoized to avoid unnecessary function recreation and to use them inside effects safely.

87. **What is `forceRender` used for?**  
    It triggers a re-render after updating a ref value such as `processingStartRef.current`.

88. **What is one improvement for Evaluator?**  
    Remove old commented duplicate code, replace simulated upload progress with real Axios `onUploadProgress`, and handle role-specific submission endpoints more explicitly.

89. **Why is there a `guestSubmitAssignment` call even in reusable Evaluator?**  
    The evaluator currently submits standalone evaluations through the guest-style endpoint. For teacher-specific evaluator submissions, the code separates history by prefix but still uses the same backend submission path.

90. **What happens if result has no report URL?**  
    The UI shows "No report file available" instead of a link.

91. **How does fullscreen work?**  
    Parent components pass `fullscreen` and `setFullscreen`. The evaluator toggles CSS class `fullscreen`, and Escape can exit fullscreen.

92. **How are processing messages shown?**  
    A timed interval rotates messages like text extraction, AI detection, grammar checks, embeddings, and finalizing results.

93. **Is the AI detection algorithm in the frontend?**  
    No. The frontend only sends files and displays results. Actual AI detection happens in the backend/model layer.

## 7. Teacher Portal Questions

94. **What can a teacher do?**  
    Login/signup, view dashboard stats, run evaluator, create/edit/delete classes, view enrolled students and assignments, create/edit/delete assignments, view submissions and reports, update settings/password, logout.

95. **Where is the teacher dashboard shell?**  
    `src/pages/Teacher/TeacherDashboard/TeacherDashboard.jsx`.

96. **How are teacher dashboard stats loaded?**  
    `TeacherDashboardStats.jsx` calls `/dashboard/teacher_overview/` and displays total classes, students, assignments, and submissions.

97. **How are recent submissions loaded?**  
    `TeacherRecentSubmissions.jsx` fetches `/submissions/` and `/results/` in parallel, merges results by submission id, sorts by date, and displays recent rows.

98. **How does teacher class creation work?**  
    `TeacherClasses.jsx` validates class name and description, then calls `classService.createClass(payload)`.

99. **How does teacher class editing work?**  
    It fetches the latest class by code, fills the form, sets `editingId`, and calls `classService.updateClass(code, payload)`.

100. **How does teacher class deletion work?**  
    It opens a confirm modal, calls `classService.deleteClass(code)`, and removes the class from local state.

101. **How does search work in teacher classes?**  
    A `useMemo` filters classes by name, subject/description, or code.

102. **Why use `useMemo` for filtering?**  
    It recalculates filtered classes only when `classes` or `search` changes.

103. **How is class view state persisted?**  
    The selected class modal is saved in `sessionStorage` as `teacherClassToView`, so it can survive reload within the same browser session.

104. **How does copying class code work?**  
    `navigator.clipboard.writeText(text)` is called.

105. **How are enrolled students loaded for a class?**  
    `ViewAssignmentsModal.jsx` calls `classService.getEnrolledStudents(cls.code)`.

106. **How are class assignments loaded?**  
    It calls `classService.getClassAssignments(cls.code)`.

107. **How can a teacher remove a student from a class?**  
    `classService.removeStudentFromClass(code, studentId)` posts the student id to the backend.

108. **Where are teacher assignments created?**  
    `src/pages/Teacher/TeacherManageAssignment/AssignAssignment.jsx`.

109. **What fields does assignment creation validate?**  
    Class code, title, deadline, and deadline not being in the past.

110. **How are assignments created and updated?**  
    Create uses `classService.createAssignment(classCode, payload)`, update uses `classService.updateAssignment(editingId, payload)`.

111. **How does assignment edit mode persist?**  
    It saves edit mode, editing id, and form data in localStorage keys like `assignEditMode`, `assignEditingId`, and `assignEditForm`.

112. **Why use localStorage for assignment edit mode?**  
    It prevents form state loss if the user reloads while editing.

113. **How does the teacher view assignment submissions?**  
    `TeacherAssignmentViewModal.jsx` fetches submissions for that assignment, fetches results, optionally fetches enrolled students, and builds a combined row per student.

114. **Why fetch results separately from submissions?**  
    Submission records and AI result records are separate backend resources, so the frontend joins them by submission UUID.

115. **How does the teacher modal match results to submissions?**  
    It creates a map where `result.submission` points to the submission id, then reads `resultBySubmissionId[sub.id]`.

116. **How does it handle students who did not submit?**  
    If enrolled students are available, it builds one row per enrolled student and shows missing submission/report data as empty or not submitted.

117. **Why filter teacher recent submissions to `sub.assignment !== null`?**  
    To exclude guest standalone submissions from teacher assignment tables.

118. **Where are teacher settings handled?**  
    `src/pages/Teacher/TeacherSetting/Setting.jsx`.

119. **What can teacher settings do?**  
    Change password and delete account through `authService`.

## 8. Student Portal Questions

120. **What can a student do?**  
    Signup/login, join a class by code, view enrolled classes, open assignments, submit PDFs, track processing, terminate a submission, view reports, update profile/password, and logout.

121. **Where is the student dashboard shell?**  
    `src/pages/Student/StudentDashboard.jsx`.

122. **Why does the student dashboard use `<Outlet />`?**  
    It keeps the sidebar/layout stable while nested child pages change.

123. **How does joining a class work?**  
    `StudentJoinClass.jsx` validates the code, uppercases it, and calls `classService.enrollInClass(classCode.trim())`.

124. **How are enrolled classes loaded?**  
    `StudentCLasses.jsx` calls `classService.getEnrolledClasses()` on mount.

125. **How does a student leave a class?**  
    It opens a confirmation modal, calls `classService.leaveClass(code)`, removes the class from state, and shows a toast.

126. **How does a student open assignments for a selected class?**  
    It navigates to `/student/dashboard/assignments` with `state: { selectedClass: cls }`.

127. **Where does student assignment submission happen?**  
    `src/pages/Student/StudentAssignments.jsx`.

128. **How are student assignments loaded?**  
    If a selected class is present, it fetches assignments for that class. Otherwise, it fetches all enrolled classes and then all assignments using `Promise.all`.

129. **Why use `Promise.all` for assignment loading?**  
    It loads assignments from multiple classes in parallel instead of one by one.

130. **How does the student submit an assignment?**  
    It validates the PDF, calls `classService.submitAssignment(assignment.id, assignment.title, selectedFile)`, saves the submission id in localStorage, and starts polling status.

131. **Why store submitted assignment ids locally?**  
    It helps the UI remember which assignments were submitted and continue polling after reload.

132. **What is `submitted_assignments`?**  
    A localStorage map from assignment id to submission id.

133. **What is `proc_start_` used for?**  
    It stores processing start time per submission so the timer continues correctly after reload.

134. **How is late submission handled?**  
    The UI checks `is_past_deadline` and `allow_late_submissions` to block or label submissions appropriately.

135. **Can the student terminate processing?**  
    Yes, it calls `classService.terminateSubmission(submissionId)`, clears local submission state, and allows resubmission.

136. **How are student reports loaded?**  
    `StudentReports.jsx` fetches `/submissions/` and `/results/` in parallel, merges them by submission id, and renders report cards.

137. **How does the student dashboard recent reports section work?**  
    `StudentDashboardHome.jsx` fetches submissions/results, sorts by submitted date, takes five recent submissions, and displays AI/human percentages and report link.

138. **Where is student profile/settings handled?**  
    `StudentSetting.jsx`, which calls `authService.getProfile`, `updateProfile`, and `changePassword`.

139. **What is one student portal improvement?**  
    Replace local submitted-state tracking with backend submission status as the source of truth to avoid stale localStorage.

## 9. Guest Portal Questions

140. **What can a guest do?**  
    Signup/login, use the AI Evaluator without class/assignment context, view evaluation history in the sidebar, terminate in-progress analysis, and logout.

141. **Where is guest dashboard implemented?**  
    `src/pages/Guest/GuestDashboard.jsx`.

142. **How does guest dashboard share session state with Evaluator?**  
    It keeps `activeSessionId` in state and localStorage, passes it to `GuestSidebar` and `Evaluator`.

143. **What is the guest active session key?**  
    `ev_active_session`.

144. **Where is guest history shown?**  
    `GuestSidebar.jsx` reads evaluator history from localStorage using the `guest_ev_history` key.

145. **How does guest cancellation communicate with Evaluator?**  
    It dispatches a custom event such as `ev_cancel_submission`, and the evaluator listens for it.

146. **Why have guest and teacher separate history prefixes?**  
    A teacher dashboard and guest dashboard should not mix evaluation history.

## 10. Admin Portal Questions

147. **What is implemented for admin?**  
    Admin login, dashboard stats UI, student management UI, teacher management UI, search/filter, add/edit/delete local records, view teacher class modal, and export modal UI.

148. **Is admin connected to backend?**  
    Mostly no. Admin screens currently use mock/local arrays such as `INITIAL_STUDENTS` and `INITIAL_TEACHERS`.

149. **How should you answer if evaluator asks why admin is mock?**  
    Say the admin UI prototype is ready, but backend integration for admin auth and CRUD is a pending integration step. Teacher/student/guest core flows are more connected to services.

150. **What does admin login do?**  
    `AdminLogin.jsx` currently navigates directly to `/admin/dashboard` after form submit.

151. **How does admin page navigation work?**  
    `AdminDashboard.jsx` keeps `activePage` in localStorage and passes it to `AdminSidebar`.

152. **How does admin add student work?**  
    It updates local React state, generates or stores password data, and updates the table.

153. **How does admin export work?**  
    The current export modal simulates progress. It does not yet generate/download a real file.

154. **What is one admin improvement?**  
    Add real admin authentication, protected admin routes, backend CRUD services, and real export generation.

## 11. State Management Questions

155. **What state management library is used?**  
    No external state management library. The project uses React state, context, localStorage, and sessionStorage.

156. **Where is Context used?**  
    `ThemeContext.jsx` stores current theme and exposes `handleLightTheme` and `handleDarkTheme`.

157. **Why not Redux?**  
    The app state is mostly local to pages/components. For this scale, React state and context are enough.

158. **Where is `useState` used heavily?**  
    Forms, loading/error states, modal visibility, sidebars, active sessions, evaluator data, assignment/class lists.

159. **Where is `useEffect` used?**  
    Loading data on mount, syncing localStorage, adding/removing event listeners, polling backend status, timers.

160. **Why cleanup intervals/listeners in effects?**  
    To avoid memory leaks, duplicate polling, and handlers firing after a component unmounts.

161. **Where is `useRef` useful?**  
    OTP input refs, file input refs, polling interval refs, active job id refs, and processing start refs.

162. **Where is `useMemo` used?**  
    In teacher class filtering so the filtered class list recalculates only when relevant inputs change.

163. **What is stored in localStorage?**  
    Auth tokens, theme, sidebar collapsed state, active evaluator session, evaluator history, submitted assignment ids, assignment edit draft, admin active page.

164. **What is stored in sessionStorage?**  
    Temporary modal state such as selected teacher class/assignment view.

165. **When should localStorage not be used?**  
    For highly sensitive data or data that must always be server-truth. Auth tokens in localStorage are acceptable for a demo but need stronger handling for production.

## 12. UI, Theme, And CSS Questions

166. **How does dark/light theme work?**  
    `ThemeProvider` reads theme from localStorage, updates `document.body.className`, and CSS variables in `index.css` change colors globally.

167. **Why use CSS variables?**  
    They allow one variable like `--bg` or `--text` to update many components consistently across themes.

168. **How is responsive design handled?**  
    Custom CSS uses flex/grid layouts, media queries, responsive cards/tables, sidebars, and mobile navbar/sidebar.

169. **How does the Navbar mobile menu work?**  
    `Navbar.jsx` uses `sidebarOpen` state, locks body scroll, adds Escape key close behavior, and shows an overlay.

170. **How does smooth scrolling work on landing page?**  
    `App.jsx` and `Navbar.jsx` call `scrollIntoView({ behavior: "smooth" })` for section ids.

171. **What accessibility improvements exist?**  
    Some buttons include `aria-label`, OTP inputs have labels, modal/close actions exist, and links use `rel="noopener noreferrer"` for new tabs.

172. **What accessibility improvements could be added?**  
    Better keyboard focus traps for modals, more semantic button roles, improved aria states, and replacing clickable divs with buttons.

173. **Why use custom CSS instead of Bootstrap/Tailwind?**  
    It gives full control over the FYP visual design and avoids heavy dependency on a UI framework.

174. **What is a visible UI polish issue in code?**  
    Some files contain mojibake/encoding artifacts like `â€”` and old commented code blocks. Cleaning them would improve professionalism.

## 13. Security Questions

175. **How is the API protected from frontend side?**  
    Protected calls include the bearer token in the Authorization header.

176. **Is frontend route protection enough?**  
    No. Backend must also verify tokens and permissions. Frontend protection only improves UX.

177. **How are file uploads restricted?**  
    The frontend accepts only PDFs and limits size to 10MB. Backend should also validate file type and size.

178. **Why use `rel="noopener noreferrer"` on report links?**  
    It prevents the opened page from accessing `window.opener`, which is safer for external/new-tab links.

179. **What are risks of storing tokens in localStorage?**  
    If an XSS vulnerability exists, scripts can read tokens. Production should consider httpOnly cookies or strict XSS protections.

180. **How do you prevent unauthorized student access to teacher pages?**  
    The frontend currently checks token presence only. Role-based authorization should be enforced by backend and improved in `ProtectedRoute`.

181. **Can users fake the AI result on frontend?**  
    They can alter local UI in browser devtools, but real results should come from backend APIs and backend authorization should protect actual records.

182. **Does the frontend contain the AI model?**  
    No, it only displays results returned by backend.

## 14. Error Handling Questions

183. **How are API errors normalized?**  
    `apiClient` extracts `message`, `error`, `detail`, or Axios message and rejects a consistent error object.

184. **How are loading states shown?**  
    Components use `loading`, `loadState`, `uploadState`, `status`, and spinners/text to show progress.

185. **How are empty states handled?**  
    Class, assignment, report, and dashboard screens show messages such as no classes, no submissions, or no reports.

186. **What happens if polling fails?**  
    Polling interval is cleared, processing state is stopped, and pending localStorage is removed.

187. **What happens if a backend response shape changes?**  
    The code often supports both arrays and paginated objects, but major field changes would require updating normalization/mapping logic.

188. **What could be improved in error handling?**  
    Central toast notifications, consistent error UI, retry buttons, and better route-specific auth redirects.

## 15. Performance Questions

189. **How does the app reduce initial load?**  
    It uses lazy imports and `Suspense` for landing sections and route pages.

190. **Where is parallel fetching used?**  
    Student reports, teacher recent submissions, teacher assignment modal, and student assignment loading use `Promise.all`.

191. **What is the performance tradeoff in fetching `/results/`?**  
    Fetching all results then filtering client-side is simple, but inefficient as data grows. Backend filtering by assignment/submission/user would scale better.

192. **How could assignment/report loading be optimized?**  
    Add backend filters, pagination, caching, and server-side joins for submissions/results.

193. **Does polling scale well?**  
    Polling every 3 seconds is fine for small demos, but many active users could create extra load. WebSockets or server-sent events would scale better.

194. **How are unnecessary re-renders reduced?**  
    Some filtering uses `useMemo`, refs hold mutable interval values, and lazy loading separates large pages.

## 16. Testing, Build, And Deployment Questions

195. **How do you run the app locally?**  
    `npm run dev`, which runs Vite on port 3000 according to `package.json`.

196. **How do you build the app?**  
    `npm run build`, which runs `vite build`.

197. **How do you preview the production build?**  
    `npm run preview`.

198. **How do you lint the app?**  
    `npm run lint`.

199. **What testing is currently missing?**  
    Automated unit/integration tests are not present. Suggested tests: form validation, ProtectedRoute behavior, service functions, evaluator polling, and assignment submission flow.

200. **What would you test first?**  
    Auth flows, evaluator validation/submission/polling, student assignment submission, teacher class/assignment CRUD, and API error handling.

201. **What is the purpose of `_redirects`?**  
    It allows SPA route refreshes to return `index.html`, preventing 404s on hosting platforms like Netlify.

202. **What environment variable is needed?**  
    `VITE_API_BASE_URL`, shown in `.env.example`.

203. **What should be checked before demo?**  
    Backend server running, API base URL correct, test accounts available, sample PDF ready, internet/local assets working, and route refresh working.

## 17. Code Walkthrough Questions

204. **Show the main route configuration.**  
    Open `src/main.jsx` and explain `createBrowserRouter`, auth routes, dashboard routes, nested student routes, and `RouterProvider`.

205. **Show how protected routing works.**  
    Open `src/components/ProtectedRoute.jsx` and explain token check plus redirect.

206. **Show how API token injection works.**  
    Open `src/services/apiClient.js` and explain the request interceptor.

207. **Show how endpoints are organized.**  
    Open `src/services/endpoints.js` and explain auth/classes/submissions route groups.

208. **Show the evaluator upload flow.**  
    Open `src/components/Evaluator/Evaluator.jsx`, then explain `handleFile`, `validate`, `handleSubmit`, `startPolling`, and `ResultCard`.

209. **Show the text-to-PDF feature.**  
    Open `Evaluator.jsx` and explain `textToPdfFile` using `jsPDF`.

210. **Show how teacher creates a class.**  
    Open `TeacherClasses.jsx`, explain `handleSubmit`, `classService.createClass`, and state refresh.

211. **Show how teacher creates assignments.**  
    Open `AssignAssignment.jsx`, explain class selection, deadline validation, create/update API calls, and edit persistence.

212. **Show how teacher views submissions.**  
    Open `TeacherAssignmentViewModal.jsx`, explain fetching assignment submissions, results, enrolled students, and joining them by id.

213. **Show how student submits assignment.**  
    Open `StudentAssignments.jsx`, explain file validation, `classService.submitAssignment`, local submission map, and polling.

214. **Show how student reports are generated.**  
    Open `StudentReports.jsx`, explain fetching submissions/results, mapping results by submission id, and rendering cards.

215. **Show how theme switching works.**  
    Open `ThemeContext.jsx` and `index.css`, explain localStorage theme and CSS variables.

216. **Show how logout works.**  
    Open `TeacherSidebar.jsx` or `StudentSidebar.jsx`, explain refresh token logout, local cleanup, and navigation.

## 18. Likely Critical Questions And Strong Answers

217. **Your admin login has no backend validation. Why?**  
    Admin is currently a UI prototype. The core integrated flows are teacher, student, and guest. Admin backend auth and CRUD are planned improvements.

218. **Your ProtectedRoute redirects students to teacher login. Is that correct?**  
    It works as a simple token guard but is not ideal. A better design is `ProtectedRoute redirectTo="/login/student"` or role-aware route metadata.

219. **Why are there many commented old code blocks?**  
    They appear to be previous iterations kept during development. Before final submission, they should be cleaned to improve maintainability.

220. **Why are some characters displayed as `â€”`?**  
    That is an encoding issue, likely UTF-8 text read or saved incorrectly. It should be fixed by saving files as UTF-8 and replacing mojibake characters.

221. **Why do some components call `apiClient` directly instead of services?**  
    It was faster during dashboard integration. For consistency, those calls should be moved into service functions.

222. **Why is localStorage used for submitted assignments?**  
    It gives immediate UI persistence across reloads. Long term, backend submission status should be the source of truth.

223. **Why not use WebSockets for processing status?**  
    Polling is simpler and reliable for an FYP/demo. WebSockets are a future improvement for real-time scalability.

224. **How do you ensure file type is safe?**  
    Frontend checks PDF type and extension, but backend must validate again because frontend checks can be bypassed.

225. **Can the frontend know whether content is AI-generated?**  
    No. It only displays backend/model results. Detection logic belongs to backend/AI model.

226. **What was the hardest frontend part?**  
    Managing evaluator states: upload, processing, restore after reload, history, result display, and termination without confusing the user.

227. **What would you improve if you had more time?**  
    Role-aware protection, admin backend integration, automated tests, cleanup of commented code/encoding artifacts, service wrapper consistency, and better real-time processing updates.

228. **What is your best technical design decision?**  
    Centralizing API communication in services and making the Evaluator reusable across guest and teacher dashboards.

229. **What is your biggest current limitation?**  
    Some areas are still prototype-level, especially admin, and route protection is token-based rather than full role-based.

230. **How do you handle backend downtime during demo?**  
    The frontend shows loading/error messages. For demo, ensure backend is running and API base URL is correct before starting.

## 19. Rapid-Fire Short Answers

231. **React component model?** Reusable UI pieces with props and state.
232. **Props?** Data/functions passed from parent to child.
233. **State?** Component-owned data that triggers re-render when updated.
234. **Effect?** Side effect hook for data fetching, timers, event listeners, storage sync.
235. **Ref?** Mutable value or DOM reference that does not trigger re-render.
236. **Context?** Shared state without prop drilling; used for theme.
237. **SPA?** Single Page Application, navigation handled client-side.
238. **JWT?** Token-based authentication, sent as Bearer token.
239. **Bearer token?** Token sent in `Authorization` header.
240. **FormData?** Browser API for multipart file uploads.
241. **Axios interceptor?** Middleware for requests/responses.
242. **Lazy loading?** Load code only when needed.
243. **Suspense?** Shows fallback while lazy component loads.
244. **Nested route?** Child route rendered inside parent layout via `<Outlet />` or nested `Routes`.
245. **LocalStorage?** Persistent browser key-value storage.
246. **SessionStorage?** Per-tab/session browser storage.
247. **Polling?** Repeated API call after fixed interval.
248. **Promise.all?** Runs async requests in parallel.
249. **CSS variables?** Reusable theme/style values.
250. **Vite build command?** `npm run build`.

## 20. Final Demo Preparation Checklist

1. Start backend API before frontend.
2. Confirm `.env` or `.env.example` base URL points to the backend.
3. Run `npm run dev` and open port 3000.
4. Prepare test logins for teacher, student, guest.
5. Prepare one small PDF under 10MB.
6. Test teacher login, create class, create assignment, view submissions.
7. Test student login, join class, submit assignment, view reports.
8. Test guest login and standalone evaluator.
9. Keep `src/main.jsx`, `apiClient.js`, `classService.js`, and `Evaluator.jsx` ready to open.
10. Be honest about mock admin and known improvements.

