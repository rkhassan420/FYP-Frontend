import React, { StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Loading from "./components/Loading/Loading.jsx";


const Error = React.lazy(() => import('./components/Error/Error.jsx'));

const RoleSelection = React.lazy(() => import('./components/RoleSelection/RoleSelection.jsx'));

const TeacherLogin = React.lazy(() => import('./pages/Teacher/TeacherLogin.jsx'));
const TeacherSignup = React.lazy(() => import('./pages/Teacher/TeacherSignup.jsx'));
const TeacherOtpVerify = React.lazy(() => import('./pages/Teacher/TeacherOtpVerify.jsx'));
const ForgotPasswordTeacher = React.lazy(() => import('./pages/Teacher/ForgotPasswordTeacher.jsx'));
const TeacherSetNewPass = React.lazy(() => import('./pages/Teacher/TeacherSetNewPass.jsx'));

const StudentSignup = React.lazy(() => import('./pages/Student/StudentSignup.jsx'));
const StudentLogin = React.lazy(() => import('./pages/Student/StudentLogin.jsx'));
const StudentPasswordForgot = React.lazy(() => import('./pages/Student/StudentPasswordForgot.jsx'));
const StudentVerifyOtp = React.lazy(() => import('./pages/Student/StudentVerifyOTP.jsx'));
const StudentResetPassword = React.lazy(() => import('./pages/Student/StudentResetPassword.jsx'));

const AdminLogin = React.lazy(() => import('./pages/Admin/AdminLogin.jsx'));


const TeacherDashboard = React.lazy(() => import('./pages/Teacher/TeacherDashboard.jsx'));
const AssignAssignment = React.lazy(() => import('./pages/Teacher/AssignAssignment.jsx'));

const StudentDashboard = React.lazy(() => import('./pages/Student/StudentDashboard.jsx'));

const AdminDashboard = React.lazy(() => import('./pages/Admin/adminDashboard.jsx'));



const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <Error />,
  },  
  
  {
    path:"/role-selection",
    element:<RoleSelection />
  },

  {
    path:"/login/teacher",
    element:<TeacherLogin />
  },

  {
    path:"/signup/teacher",
    element:<TeacherSignup />
  },

  {
    path:"/otp/teacher",
    element:<TeacherOtpVerify />
  },

  {
    path:"/forgot-password/teacher",
    element:<ForgotPasswordTeacher />
  },

  {
    path:"/set-password/teacher",
    element:<TeacherSetNewPass />
  },

   {
    path:"/teacher/dashboard",
    element:<TeacherDashboard />
  },

  {
    path:"/assign/assignments",
    element:<AssignAssignment />
  },





 {
    path:"/signup/student",
    element:<StudentSignup />
  },

  {
    path:"/login/student",
    element:<StudentLogin />
  },

  {
    path:"/student/password-forgot",
    element:<StudentPasswordForgot />
  }, 

  {
    path:"/student/verify-otp",
    element:<StudentVerifyOtp />
  }, 

  {
    path:"/student/reset-password",
    element:<StudentResetPassword />
  }, 


  {
    path:"/student/dashboard",
    element:<StudentDashboard />
  },



  {
    path:"/login/admin",
    element:<AdminLogin />
  },

   {
    path:"/admin/dashboard",
    element:<AdminDashboard />
  },


   
]);


createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Suspense fallback={<Loading />}>
      <RouterProvider router={router} />
    </Suspense>
  </StrictMode>
);


