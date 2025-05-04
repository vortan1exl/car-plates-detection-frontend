import { Route } from 'react-router-dom';
import StudentAuth from '../components/AuthPage/StudentLogin/StudentLogin';
import AdminLogin from '../components/AuthPage/AdminLogin/AdminLogin';
import { RoleProtectedRoute } from "./RoleProtectedRoute";
import LandingPage from '../components/AuthPage/LandingPage/LandingPage';
import AdminHome from '../components/AdminHome'
import StudentHome from '../components/StudentParking'
import PersonnelHome from '../components/PersonnelHome'
import StudentVehicleHistory from '../components/Student/VehicleHistory/StudentVehicleHistory';
import { StudentProfile } from '../components/Student/StudentProfile';


const routes = [
  <Route key="landing" path="/" element={<LandingPage />} />,
  <Route key="student-auth" path="/student-auth" element={<StudentAuth />} />,
  <Route key="admin-login" path="/admin-login" element={<AdminLogin />} />,
  <Route
    key="student-home"
    path="/student/parking"
    element={
      <RoleProtectedRoute allowedRoles={["STUDENT"]}>
        <StudentHome/>
      </RoleProtectedRoute>
    }
  />,
  <Route
    key="student-home"
    path="/student/profile"
    element={
      <RoleProtectedRoute allowedRoles={["STUDENT"]}>
        <StudentProfile/>
      </RoleProtectedRoute>
    }
  />,
  <Route key="student-vehicle-history"
   path="/student/vehicle-history"
   element={<RoleProtectedRoute allowedRoles={["STUDENT"]}>
    <StudentVehicleHistory />
    </RoleProtectedRoute>} 
   />,

  <Route
  key="admin-home"
  path="/admin/home"
  element={
    <RoleProtectedRoute allowedRoles={["ADMIN"]}>
      <AdminHome />
    </RoleProtectedRoute>
  }
  />,
  <Route
    key="personnel-home"
    path="/personnel/pakring"
    element={
      <RoleProtectedRoute allowedRoles={["PERSONNEL"]}>
        <PersonnelHome />
      </RoleProtectedRoute>
    }
  />,
];

export default routes;