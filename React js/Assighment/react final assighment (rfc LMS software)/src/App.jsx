import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { PersistGate } from 'redux-persist/integration/react';
import store, { persistor } from './store/store';
import { AuthProvider } from './context/AuthContext';
import { ProtectedRoute } from './routes/ProtectedRoute';
import { Layout } from './layouts/Layout';
import { AuthPage } from './pages/AuthPage';
import { Dashboard } from './pages/Dashboard';
import { StudentList } from './pages/students/StudentList';
import { StudentForm } from './pages/students/StudentForm';
import { TeacherList } from './pages/teachers/TeacherList';
import { TeacherForm } from './pages/teachers/TeacherForm';
import { ClassList } from './pages/classes/ClassList';
import { ClassForm } from './pages/classes/ClassForm';
import { SubjectList } from './pages/subjects/SubjectList';
import { SubjectForm } from './pages/subjects/SubjectForm';
import { FeeStructure } from './pages/fees/FeeStructure';
import { FeeSubmission } from './pages/fees/FeeSubmission';
import { FeeVoucher } from './pages/fees/FeeVoucher';
import { ExamSchedule } from './pages/exams/ExamSchedule';
import { ExamScheduleForm } from './pages/exams/ExamScheduleForm';
import { ExamResult } from './pages/exams/ExamResult';
import { SyllabusList } from './pages/syllabus/SyllabusList';
import { SyllabusForm } from './pages/syllabus/SyllabusForm';
import { AdmissionForm } from './pages/admission/AdmissionForm';
import { SchoolRegistration } from './pages/school/SchoolRegistration';
import { SchoolList } from './pages/school/SchoolList';
import { Settings } from './pages/settings/Settings';
import './styles/index.css';

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <AuthProvider>
            <Routes>
              <Route path="/auth" element={<AuthPage />} />

              {/* Protected Routes with Layout */}
              <Route
                path="/*"
                element={
                  <ProtectedRoute>
                    <Layout>
                      <Routes>
                        <Route path="/dashboard" element={<Dashboard />} />

                        {/* Students */}
                        <Route path="/students" element={<StudentList />} />
                        <Route path="/students/add" element={<StudentForm />} />
                        <Route path="/students/edit/:id" element={<StudentForm />} />

                        {/* Teachers */}
                        <Route path="/teachers" element={<TeacherList />} />
                        <Route path="/teachers/add" element={<TeacherForm />} />
                        <Route path="/teachers/edit/:id" element={<TeacherForm />} />

                        {/* Classes */}
                        <Route path="/classes" element={<ClassList />} />
                        <Route path="/classes/add" element={<ClassForm />} />
                        <Route path="/classes/edit/:id" element={<ClassForm />} />

                        {/* Subjects */}
                        <Route path="/subjects" element={<SubjectList />} />
                        <Route path="/subjects/add" element={<SubjectForm />} />
                        <Route path="/subjects/edit/:id" element={<SubjectForm />} />

                        {/* Fees */}
                        <Route path="/fees" element={<FeeStructure />} />
                        <Route path="/fees/submission" element={<FeeSubmission />} />
                        <Route path="/fees/voucher" element={<FeeVoucher />} />

                        {/* Exams */}
                        <Route path="/exams" element={<ExamSchedule />} />
                        <Route path="/exams/add" element={<ExamScheduleForm />} />
                        <Route path="/exams/edit/:id" element={<ExamScheduleForm />} />
                        <Route path="/exams/results" element={<ExamResult />} />

                        {/* Syllabus */}
                        <Route path="/syllabus" element={<SyllabusList />} />
                        <Route path="/syllabus/add" element={<SyllabusForm />} />
                        <Route path="/syllabus/edit/:id" element={<SyllabusForm />} />

                        {/* Admission */}
                        <Route path="/admission" element={<AdmissionForm />} />

                        {/* School */}
                        <Route path="/school" element={<SchoolList />} />
                        <Route path="/school/add" element={<SchoolRegistration />} />
                        <Route path="/school/edit/:id" element={<SchoolRegistration />} />

                        {/* Settings */}
                        <Route path="/settings" element={<Settings />} />

                        {/* Default */}
                        <Route path="/" element={<Navigate to="/dashboard" replace />} />
                        <Route path="*" element={<Navigate to="/dashboard" replace />} />
                      </Routes>
                    </Layout>
                  </ProtectedRoute>
                }
              />
            </Routes>
            <ToastContainer
              position="bottom-right"
              autoClose={3000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
            />
          </AuthProvider>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  );
}

export default App;
