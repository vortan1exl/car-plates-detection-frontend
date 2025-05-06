import { Route } from 'react-router-dom';
import StudentAuth from '../components/AuthPage/StudentLogin/StudentLogin';
import AdminLogin from '../components/AuthPage/AdminLogin/AdminLogin';
import { RoleProtectedRoute } from "./RoleProtectedRoute";
import LandingPage from '../components/AuthPage/LandingPage/LandingPage';
import AdminHome from '../components/AdminHome'
import StudentHome from '../components/StudentParking'
import PersonnelHome from '../components/PersonnelHome'
import StudentVehicleHistory from '../components/Student/StudentVehicleHistory';
import { StudentProfile } from '../components/Student/StudentProfile';
import { PersonnelProfile } from '../components/Personnel/PersonnelProfile';
import { PersonnelVehicleHistory } from '../components/Personnel/PersonnelVehicleHistory';
import { AdminProfile } from '../components/Admin/AdminProfile'
import StudentAll from '../components/Admin/StudentAll';
import PersonnelAll from '../components/Admin/PersonnelAll';
import ParkingHistory from '../components/Admin/ParkingHistory';
import { StudentById } from '../components/Admin/StudentById';
import { PersonnelById } from '../components/Admin/PersonnelById';



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
  key="admin-home"
  path="/admin/profile"
  element={
    <RoleProtectedRoute allowedRoles={["ADMIN"]}>
      <AdminProfile />
    </RoleProtectedRoute>
  }
  />,
  <Route
  key="admin-home"
  path="/admin/student"
  element={
    <RoleProtectedRoute allowedRoles={["ADMIN"]}>
      <StudentAll />
    </RoleProtectedRoute>
  }
  />,
  <Route
  key="admin-home"
  path="/admin/personnel"
  element={
    <RoleProtectedRoute allowedRoles={["ADMIN"]}>
      <PersonnelAll />
    </RoleProtectedRoute>
  }
  />,
  <Route
    key="admin-home"
    path="/admin/parkinglog"
    element={
      <RoleProtectedRoute allowedRoles={["ADMIN"]}>
        <ParkingHistory />
      </RoleProtectedRoute>
    }
    />,
    <Route
    key="admin-home"
    path="/admin/student/:uuid"
    element={
      <RoleProtectedRoute allowedRoles={["ADMIN"]}>
        <StudentById />
      </RoleProtectedRoute>
    }
    />,
    <Route
    key="admin-home"
    path="/admin/personnel/:uuid"
    element={
      <RoleProtectedRoute allowedRoles={["ADMIN"]}>
        <PersonnelById />
      </RoleProtectedRoute>
    }
    />,


  <Route
    key="personnel-home"
    path="/personnel/parking"
    element={
      <RoleProtectedRoute allowedRoles={["PERSONNEL"]}>
        <PersonnelHome />
      </RoleProtectedRoute>
    }
  />,
  <Route
    key="student-home"
    path="/personnel/profile"
    element={
      <RoleProtectedRoute allowedRoles={["PERSONNEL"]}>
        <PersonnelProfile/>
      </RoleProtectedRoute>
    }
  />,
  <Route key="student-vehicle-history"
   path="/personnel/vehicle-history"
   element={<RoleProtectedRoute allowedRoles={["PERSONNEL"]}>
    <PersonnelVehicleHistory/>
    </RoleProtectedRoute>}
   />,
];

export default routes;