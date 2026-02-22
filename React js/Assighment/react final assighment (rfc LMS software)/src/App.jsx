import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './styles/theme';
import { AuthProvider } from './context/AuthContext';
import { ProtectedRoute, AuthRoute } from './routes/Routes';
import 'bootstrap/dist/css/bootstrap.min.css';

// Pages
import Login from './pages/Login/Login';
import Signup from './pages/Login/Signup';
import DashboardLayout from './pages/Dashboard/DashboardLayout';
import DashboardHome from './pages/Dashboard/DashboardHome';
import StudentList from './pages/Students/StudentList';
import StudentAdd from './pages/Students/StudentAdd';

// Placeholder components for other pages
const Placeholder = ({ title }) => <div>{title} Page (Coming Soon)</div>;

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/login" element={
              <AuthRoute>
                <Login />
              </AuthRoute>
            } />
            <Route path="/signup" element={
              <AuthRoute>
                <Signup />
              </AuthRoute>
            } />

            <Route path="/" element={
              <ProtectedRoute>
                <DashboardLayout />
              </ProtectedRoute>
            }>
              <Route index element={<Navigate to="/dashboard" replace />} />
              <Route path="dashboard" element={<DashboardHome />} />

              {/* Students */}
              <Route path="students/list" element={<StudentList />} />
              <Route path="students/add" element={<StudentAdd />} />
              <Route path="students/transfer" element={<Placeholder title="Transfer Student" />} />

              {/* Teachers */}
              <Route path="teachers/list" element={<Placeholder title="Teacher List" />} />
              <Route path="teachers/add" element={<Placeholder title="Add Teacher" />} />
              <Route path="teachers/allocation" element={<Placeholder title="Teacher Allocation" />} />

              {/* Subjects */}
              <Route path="subjects/list" element={<Placeholder title="Subject List" />} />
              <Route path="subjects/add" element={<Placeholder title="Add Subject" />} />

              {/* Others */}
              <Route path="*" element={<Placeholder title="Not Found" />} />
            </Route>
          </Routes>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
