import React, { StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Loading from "./components/Loading.jsx";


const Error = React.lazy(() => import('./components/Error.jsx'));
const RoleSelection = React.lazy(() => import('./pages/Demo/RoleSelection.jsx'));
const TeacherLogin = React.lazy(() => import('./pages/Teacher/TeacherLogin.jsx'));
const TeacherSignup = React.lazy(() => import('./pages/Teacher/TeacherSignup.jsx'));
const TeacherOtpVerify = React.lazy(() => import('./pages/Teacher/TeacherOtpVerify.jsx'));
const ForgotPasswordTeacher = React.lazy(() => import('./pages/Teacher/ForgotPasswordTeacher.jsx'));
const TeacherSetNewPass = React.lazy(() => import('./pages/Teacher/TeacherSetNewPass.jsx'));

const StudentLogin = React.lazy(() => import('./pages/Student/StudentLogin.jsx'));
const StudentPasswordForgot = React.lazy(() => import('./pages/Student/StudentPasswordForgot.jsx'));


const AdminLogin = React.lazy(() => import('./pages/Admin/AdminLogin.jsx'));


const TeacherDemo = React.lazy(() => import('./pages/Demo/TeacherDemo.jsx'));
const StudentDemo = React.lazy(() => import('./pages/Demo/StudentDemo.jsx'));


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
    path:"/login/student",
    element:<StudentLogin />
  },

  {
    path:"/student/password-forgot",
    element:<StudentPasswordForgot />
  },  

  {
    path:"/login/admin",
    element:<AdminLogin />
  },

  


  {
    path:"/Demo/Teacher",
    element:<TeacherDemo />
  },

  {
    path:"/Demo/Student",
    element:<StudentDemo />
  }
  

   
]);


createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Suspense fallback={<Loading />}>
      <RouterProvider router={router} />
    </Suspense>
  </StrictMode>
);


