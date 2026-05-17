// import React, { StrictMode, Suspense } from "react";
// import { createRoot } from "react-dom/client";
// import "./index.css";
// import App from "./App.jsx";
// import { createBrowserRouter, RouterProvider } from "react-router-dom";
// import Loading from "./components/Loading/Loading.jsx";
// import { ThemeProvider } from './components/Theme/ThemeContext.jsx'
// import ProtectedRoute from "./components/ProtectedRoute";



// const Error = React.lazy(() => import('./components/Error/Error.jsx'));

// const RoleSelection = React.lazy(() => import('./components/RoleSelection/RoleSelection.jsx'));

// const TeacherLogin = React.lazy(() => import('./pages/Teacher/TeacherAuth/TeacherLogin.jsx'));
// const TeacherSignup = React.lazy(() => import('./pages/Teacher/TeacherAuth/TeacherSignup.jsx'));
// const TeacherOtpVerify = React.lazy(() => import('./pages/Teacher/TeacherAuth/TeacherOtpVerify.jsx'));
// const ForgotPasswordTeacher = React.lazy(() => import('./pages/Teacher/TeacherAuth/ForgotPasswordTeacher.jsx'));
// const TeacherSetNewPass = React.lazy(() => import('./pages/Teacher/TeacherAuth/TeacherSetNewPass.jsx'));

// const StudentSignup = React.lazy(() => import('./pages/Student/StudentAuth/StudentSignup.jsx'));
// const StudentLogin = React.lazy(() => import('./pages/Student/StudentAuth/StudentLogin.jsx'));
// const StudentPasswordForgot = React.lazy(() => import('./pages/Student/StudentAuth/StudentPasswordForgot.jsx'));
// const StudentVerifyOtp = React.lazy(() => import('./pages/Student/StudentAuth/StudentVerifyOTP.jsx'));
// const StudentResetPassword = React.lazy(() => import('./pages/Student/StudentAuth/StudentResetPassword.jsx'));

// const GuestLogin = React.lazy(() => import('./pages/Guest/GuestLogin.jsx'));
// const GuestSignup = React.lazy(() => import('./pages/Guest/GuestSignup.jsx'));
// const GuesForgotPassword = React.lazy(() => import('./pages/Guest/GuestForgotPassword.jsx'));
// const GuestVerifyOtp = React.lazy(() => import('./pages/Guest/GuestVerifyOTP.jsx'));
// const GuestResetPass = React.lazy(() => import('./pages/Guest/GuestResetPassword.jsx'));

// const AdminLogin = React.lazy(() => import('./pages/Admin/AdminLogin.jsx'));


// const TeacherDashboard = React.lazy(() => import('./pages/Teacher/TeacherDashboard/TeacherDashboard.jsx'));
// const AssignAssignment = React.lazy(() => import('./pages/Teacher/TeacherManageAssignment/AssignAssignment.jsx'));


// const StudentDashboard = React.lazy(() => import('./pages/Student/StudentDashboard.jsx'));


// const AdminDashboard = React.lazy(() => import('./pages/Admin/adminDashboard.jsx'));


// const GuestDashboard = React.lazy(() => import('./pages/Guest/GuestDashboard.jsx'));



// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <App />,
//     errorElement: <Error />,
//   },  
  
//   {
//     path:"/role-selection",
//     element:<RoleSelection />
//   },

//   {
//     path:"/login/teacher",
//     element:<TeacherLogin />
//   },

//   {
//     path:"/signup/teacher",
//     element:<TeacherSignup />
//   },

//   {
//     path:"/otp/teacher",
//     element:<TeacherOtpVerify />
//   },

//   {
//     path:"/forgot-password/teacher",
//     element:<ForgotPasswordTeacher />
//   },

//   {
//     path:"/set-password/teacher",
//     element:<TeacherSetNewPass />
//   },

//   //  {
//   //   path:"/teacher/dashboard",
//   //   element:<TeacherDashboard />
//   // },

//   // main.jsx — change this one line
// {
//   path: "/teacher/dashboard/*",   // <-- add /*
//   element: (
//     <ProtectedRoute>
//       <TeacherDashboard />
//     </ProtectedRoute>
//   )
// },

//   {
//     path:"/assign/assignments",
//     element:<AssignAssignment />
//   },





//  {
//     path:"/signup/student",
//     element:<StudentSignup />
//   },

//   {
//     path:"/login/student",
//     element:<StudentLogin />
//   },

//   {
//     path:"/student/password-forgot",
//     element:<StudentPasswordForgot />
//   }, 

//   {
//     path:"/student/verify-otp",
//     element:<StudentVerifyOtp />
//   }, 

//   {
//     path:"/student/reset-password",
//     element:<StudentResetPassword />
//   }, 


//    {
//      path:"/student/dashboard",
//      element:<StudentDashboard />
//    },





//   {
//     path:"/login/admin",
//     element:<AdminLogin />
//   },

//    {
//     path:"/admin/dashboard",
//     element:<AdminDashboard />
//   },



//    {
//     path:"/guest/login",
//     element:<GuestLogin />
//   },

//    {
//     path:"/guest/signup",
//     element:<GuestSignup />
//   },

//    {
//     path:"/guest/forgot-pass",
//     element:<GuesForgotPassword />
//   },

//    {
//     path:"/guest/verify-otp",
//     element:<GuestVerifyOtp />
//   },

//    {
//     path:"/guest/reset-password",
//     element:<GuestResetPass />
//   },

//   {
//     path:"/guest/dashboard",
//     element:<GuestDashboard />
//   },

   
// ]);


// createRoot(document.getElementById("root")).render(
//   <StrictMode>
//     <ThemeProvider>
//     <Suspense fallback={<Loading />}>
//       <RouterProvider router={router} />
//     </Suspense>
//     </ThemeProvider>
//   </StrictMode>
// );



import React, { StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import Loading from "./components/Loading/Loading.jsx";
import { ThemeProvider } from './components/Theme/ThemeContext.jsx';
import ProtectedRoute from "./components/ProtectedRoute";

// ── Student Dashboard (eager — needed for nested routes) ──────────────────────
import StudentDashboard     from "./pages/Student/StudentDashboard";
import StudentDashboardHome from "./pages/Student/StudentDashboardHome";
import StudentJoinClass     from "./pages/Student/StudentJoinClass";
import StudentClasses       from "./pages/Student/StudentClasses";
import StudentAssignments   from "./pages/Student/StudentAssignments";
import StudentReports       from "./pages/Student/StudentReports";
import StudentSetting       from "./pages/Student/StudentSetting";

// ── Lazy imports ──────────────────────────────────────────────────────────────
const Error               = React.lazy(() => import('./components/Error/Error.jsx'));
const RoleSelection       = React.lazy(() => import('./components/RoleSelection/RoleSelection.jsx'));

const TeacherLogin        = React.lazy(() => import('./pages/Teacher/TeacherAuth/TeacherLogin.jsx'));
const TeacherSignup       = React.lazy(() => import('./pages/Teacher/TeacherAuth/TeacherSignup.jsx'));
const TeacherOtpVerify    = React.lazy(() => import('./pages/Teacher/TeacherAuth/TeacherOtpVerify.jsx'));
const ForgotPasswordTeacher = React.lazy(() => import('./pages/Teacher/TeacherAuth/ForgotPasswordTeacher.jsx'));
const TeacherSetNewPass   = React.lazy(() => import('./pages/Teacher/TeacherAuth/TeacherSetNewPass.jsx'));
const TeacherDashboard    = React.lazy(() => import('./pages/Teacher/TeacherDashboard/TeacherDashboard.jsx'));
const AssignAssignment    = React.lazy(() => import('./pages/Teacher/TeacherManageAssignment/AssignAssignment.jsx'));

const StudentSignup         = React.lazy(() => import('./pages/Student/StudentAuth/StudentSignup.jsx'));
const StudentLogin          = React.lazy(() => import('./pages/Student/StudentAuth/StudentLogin.jsx'));
const StudentPasswordForgot = React.lazy(() => import('./pages/Student/StudentAuth/StudentPasswordForgot.jsx'));
const StudentVerifyOtp      = React.lazy(() => import('./pages/Student/StudentAuth/StudentVerifyOTP.jsx'));
const StudentResetPassword  = React.lazy(() => import('./pages/Student/StudentAuth/StudentResetPassword.jsx'));

const GuestLogin          = React.lazy(() => import('./pages/Guest/GuestLogin.jsx'));
const GuestSignup         = React.lazy(() => import('./pages/Guest/GuestSignup.jsx'));
const GuesForgotPassword  = React.lazy(() => import('./pages/Guest/GuestForgotPassword.jsx'));
const GuestVerifyOtp      = React.lazy(() => import('./pages/Guest/GuestVerifyOTP.jsx'));
const GuestResetPass      = React.lazy(() => import('./pages/Guest/GuestResetPassword.jsx'));
const GuestDashboard      = React.lazy(() => import('./pages/Guest/GuestDashboard.jsx'));

const AdminLogin          = React.lazy(() => import('./pages/Admin/AdminLogin.jsx'));
const AdminDashboard      = React.lazy(() => import('./pages/Admin/adminDashboard.jsx'));

// ── Router ────────────────────────────────────────────────────────────────────
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <Error />,
  },

  { path: "/role-selection",          element: <RoleSelection /> },

  // ── Teacher Auth ────────────────────────────────────────────────────────────
  { path: "/login/teacher",           element: <TeacherLogin /> },
  { path: "/signup/teacher",          element: <TeacherSignup /> },
  { path: "/otp/teacher",             element: <TeacherOtpVerify /> },
  { path: "/forgot-password/teacher", element: <ForgotPasswordTeacher /> },
  { path: "/set-password/teacher",    element: <TeacherSetNewPass /> },

  // ── Teacher Dashboard ───────────────────────────────────────────────────────
  {
    path: "/teacher/dashboard/*",
    element: (
      <ProtectedRoute>
        <TeacherDashboard />
      </ProtectedRoute>
    ),
  },
  { path: "/assign/assignments",      element: <AssignAssignment /> },

  // ── Student Auth ────────────────────────────────────────────────────────────
  { path: "/signup/student",          element: <StudentSignup /> },
  { path: "/login/student",           element: <StudentLogin /> },
  { path: "/student/password-forgot", element: <StudentPasswordForgot /> },
  { path: "/student/verify-otp",      element: <StudentVerifyOtp /> },
  { path: "/student/reset-password",  element: <StudentResetPassword /> },

  // ── Student Dashboard (nested routes) ───────────────────────────────────────
  {
    path: "/student/dashboard",
    element: (
      <ProtectedRoute>
        <StudentDashboard />
      </ProtectedRoute>
    ),
    children: [
      { index: true,              element: <Navigate to="overview" replace /> },
      { path: "overview",         element: <StudentDashboardHome /> },
      { path: "join-class",       element: <StudentJoinClass /> },
      { path: "my-classes",       element: <StudentClasses /> },
      { path: "assignments",      element: <StudentAssignments /> },
      { path: "reports",          element: <StudentReports /> },
      { path: "setting",          element: <StudentSetting /> },
    ],
  },

  // ── Admin ───────────────────────────────────────────────────────────────────
  { path: "/login/admin",             element: <AdminLogin /> },
  { path: "/admin/dashboard",         element: <AdminDashboard /> },

  // ── Guest ───────────────────────────────────────────────────────────────────
  { path: "/guest/login",             element: <GuestLogin /> },
  { path: "/guest/signup",            element: <GuestSignup /> },
  { path: "/guest/forgot-pass",       element: <GuesForgotPassword /> },
  { path: "/guest/verify-otp",        element: <GuestVerifyOtp /> },
  { path: "/guest/reset-password",    element: <GuestResetPass /> },
  { path: "/guest/dashboard",         element: <GuestDashboard /> },
]);

// ── Render ────────────────────────────────────────────────────────────────────
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider>
      <Suspense fallback={<Loading />}>
        <RouterProvider router={router} />
      </Suspense>
    </ThemeProvider>
  </StrictMode>
);
