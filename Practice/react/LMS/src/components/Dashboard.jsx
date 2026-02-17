import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { ref, set, get, push, remove } from 'firebase/database';
import { database } from '../firebase/config';
import { 
  FaGraduationCap, 
  FaUsers, 
  FaChalkboardTeacher, 
  FaSchool, 
  FaBook, 
  FaChalkboard, 
  FaMoneyBillWave, 
  FaUserPlus, 
  FaClipboardList,
  FaSignOutAlt,
  FaBars,
  FaTimes,
  FaChevronDown,
  FaChevronRight,
  FaHome,
  FaCog,
  FaEdit,
  FaTrash,
  FaPlus,
  FaSearch
} from 'react-icons/fa';
import './Dashboard.css';

export default function Dashboard() {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [expandedModules, setExpandedModules] = useState([]);
  const [activeModule, setActiveModule] = useState('overview');
  const [activeSubModule, setActiveSubModule] = useState('');
  const [students, setStudents] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [classes, setClasses] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [syllabus, setSyllabus] = useState([]);
  const [fees, setFees] = useState([]);
  const [showStudentForm, setShowStudentForm] = useState(false);
  const [showTeacherForm, setShowTeacherForm] = useState(false);
  const [showClassForm, setShowClassForm] = useState(false);
  const [showSubjectForm, setShowSubjectForm] = useState(false);
  const [showSyllabusForm, setShowSyllabusForm] = useState(false);
  const [showFeeForm, setShowFeeForm] = useState(false);
  const [studentForm, setStudentForm] = useState({ name: '', email: '', phone: '', grade: '', parentName: '', address: '' });
  const [teacherForm, setTeacherForm] = useState({ name: '', email: '', phone: '', subject: '', qualification: '', experience: '' });
  const [classForm, setClassForm] = useState({ name: '', grade: '', teacher: '', schedule: '', room: '', capacity: '' });
  const [subjectForm, setSubjectForm] = useState({ name: '', code: '', description: '', credits: '', teacher: '' });
  const [syllabusForm, setSyllabusForm] = useState({ subject: '', grade: '', topics: '', duration: '', objectives: '' });
  const [feeForm, setFeeForm] = useState({ student: '', type: '', amount: '', dueDate: '', status: 'pending' });
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (currentUser) {
      loadAllData();
    }
  }, [currentUser]);

  const loadAllData = async () => {
    try {
      setLoading(true);
      
      if (!currentUser) {
        console.log('No authenticated user, skipping data load');
        setLoading(false);
        return;
      }

      const studentsRef = ref(database, 'users/' + currentUser.uid + '/students');
      const teachersRef = ref(database, 'users/' + currentUser.uid + '/teachers');
      const classesRef = ref(database, 'users/' + currentUser.uid + '/classes');
      const subjectsRef = ref(database, 'users/' + currentUser.uid + '/subjects');
      const syllabusRef = ref(database, 'users/' + currentUser.uid + '/syllabus');
      const feesRef = ref(database, 'users/' + currentUser.uid + '/fees');

      const [studentsSnapshot, teachersSnapshot, classesSnapshot, subjectsSnapshot, syllabusSnapshot, feesSnapshot] = await Promise.all([
        get(studentsRef),
        get(teachersRef),
        get(classesRef),
        get(subjectsRef),
        get(syllabusRef),
        get(feesRef)
      ]);

      if (studentsSnapshot.exists()) {
        const studentsData = [];
        studentsSnapshot.forEach((child) => {
          studentsData.push({ id: child.key, ...child.val() });
        });
        setStudents(studentsData);
      }

      if (teachersSnapshot.exists()) {
        const teachersData = [];
        teachersSnapshot.forEach((child) => {
          teachersData.push({ id: child.key, ...child.val() });
        });
        setTeachers(teachersData);
      }

      if (classesSnapshot.exists()) {
        const classesData = [];
        classesSnapshot.forEach((child) => {
          classesData.push({ id: child.key, ...child.val() });
        });
        setClasses(classesData);
      }

      if (subjectsSnapshot.exists()) {
        const subjectsData = [];
        subjectsSnapshot.forEach((child) => {
          subjectsData.push({ id: child.key, ...child.val() });
        });
        setSubjects(subjectsData);
      }

      if (syllabusSnapshot.exists()) {
        const syllabusData = [];
        syllabusSnapshot.forEach((child) => {
          syllabusData.push({ id: child.key, ...child.val() });
        });
        setSyllabus(syllabusData);
      }

      if (feesSnapshot.exists()) {
        const feesData = [];
        feesSnapshot.forEach((child) => {
          feesData.push({ id: child.key, ...child.val() });
        });
        setFees(feesData);
      }
    } catch (error) {
      console.error('Error loading data:', error);
      if (error.message.includes('Permission denied')) {
        console.log('Permission denied - user may not be authenticated or database rules are restrictive');
      }
    } finally {
      setLoading(false);
    }
  };

  const modules = [
    { 
      id: 'overview', 
      name: 'Overview', 
      icon: FaHome, 
      color: 'primary',
      subItems: []
    },
    { 
      id: 'students', 
      name: 'Students', 
      icon: FaUsers, 
      color: 'success',
      subItems: [
        { id: 'student-registration', name: 'Student Registration', path: 'student-registration' },
        { id: 'student-list', name: 'Student List', path: 'student-list' }
      ]
    },
    { 
      id: 'teachers', 
      name: 'Teachers', 
      icon: FaChalkboardTeacher, 
      color: 'info',
      subItems: [
        { id: 'teacher-registration', name: 'Teacher Registration', path: 'teacher-registration' },
        { id: 'teacher-list', name: 'Teacher List', path: 'teacher-list' }
      ]
    },
    { 
      id: 'classes', 
      name: 'Classes', 
      icon: FaChalkboard, 
      color: 'dark',
      subItems: [
        { id: 'class-form', name: 'Class Management', path: 'class-form' },
        { id: 'class-list', name: 'Class List', path: 'class-list' }
      ]
    },
    { 
      id: 'subjects', 
      name: 'Subjects', 
      icon: FaBook, 
      color: 'secondary',
      subItems: [
        { id: 'subject-form', name: 'Subject Management', path: 'subject-form' },
        { id: 'subject-list', name: 'Subject List', path: 'subject-list' }
      ]
    },
    { 
      id: 'syllabus', 
      name: 'Syllabus', 
      icon: FaBook, 
      color: 'warning',
      subItems: [
        { id: 'syllabus-form', name: 'Syllabus Management', path: 'syllabus-form' },
        { id: 'syllabus-list', name: 'Syllabus List', path: 'syllabus-list' }
      ]
    },
    { 
      id: 'fees', 
      name: 'Fees', 
      icon: FaMoneyBillWave, 
      color: 'success',
      subItems: [
        { id: 'fee-form', name: 'Fee Management', path: 'fee-form' },
        { id: 'fee-list', name: 'Fee Records', path: 'fee-list' }
      ]
    }
  ];

  const addStudent = async () => {
    if (studentForm.name && studentForm.email) {
      try {
        if (!currentUser) {
          console.error('No authenticated user');
          return;
        }
        const newStudentRef = push(ref(database, 'users/' + currentUser.uid + '/students'));
        await set(newStudentRef, {
          ...studentForm,
          createdAt: new Date().toISOString()
        });
        loadAllData();
        setStudentForm({ name: '', email: '', phone: '', grade: '', parentName: '', address: '' });
        setShowStudentForm(false);
      } catch (error) {
        console.error('Failed to add student:', error);
      }
    }
  };

  const addTeacher = async () => {
    if (teacherForm.name && teacherForm.email) {
      try {
        if (!currentUser) {
          console.error('No authenticated user');
          return;
        }
        const newTeacherRef = push(ref(database, 'users/' + currentUser.uid + '/teachers'));
        await set(newTeacherRef, {
          ...teacherForm,
          createdAt: new Date().toISOString()
        });
        loadAllData();
        setTeacherForm({ name: '', email: '', phone: '', subject: '', qualification: '', experience: '' });
        setShowTeacherForm(false);
      } catch (error) {
        console.error('Failed to add teacher:', error);
      }
    }
  };

  const addClass = async () => {
    if (classForm.name && classForm.grade) {
      try {
        if (!currentUser) {
          console.error('No authenticated user');
          return;
        }
        const newClassRef = push(ref(database, 'users/' + currentUser.uid + '/classes'));
        await set(newClassRef, {
          ...classForm,
          createdAt: new Date().toISOString()
        });
        loadAllData();
        setClassForm({ name: '', grade: '', teacher: '', schedule: '', room: '', capacity: '' });
        setShowClassForm(false);
      } catch (error) {
        console.error('Failed to add class:', error);
      }
    }
  };

  const addSubject = async () => {
    if (subjectForm.name && subjectForm.code) {
      try {
        if (!currentUser) {
          console.error('No authenticated user');
          return;
        }
        const newSubjectRef = push(ref(database, 'users/' + currentUser.uid + '/subjects'));
        await set(newSubjectRef, {
          ...subjectForm,
          createdAt: new Date().toISOString()
        });
        loadAllData();
        setSubjectForm({ name: '', code: '', description: '', credits: '', teacher: '' });
        setShowSubjectForm(false);
      } catch (error) {
        console.error('Failed to add subject:', error);
      }
    }
  };

  const addSyllabus = async () => {
    if (syllabusForm.subject && syllabusForm.grade) {
      try {
        if (!currentUser) {
          console.error('No authenticated user');
          return;
        }
        const newSyllabusRef = push(ref(database, 'users/' + currentUser.uid + '/syllabus'));
        await set(newSyllabusRef, {
          ...syllabusForm,
          createdAt: new Date().toISOString()
        });
        loadAllData();
        setSyllabusForm({ subject: '', grade: '', topics: '', duration: '', objectives: '' });
        setShowSyllabusForm(false);
      } catch (error) {
        console.error('Failed to add syllabus:', error);
      }
    }
  };

  const addFee = async () => {
    if (feeForm.student && feeForm.amount) {
      try {
        if (!currentUser) {
          console.error('No authenticated user');
          return;
        }
        const newFeeRef = push(ref(database, 'users/' + currentUser.uid + '/fees'));
        await set(newFeeRef, {
          ...feeForm,
          createdAt: new Date().toISOString()
        });
        loadAllData();
        setFeeForm({ student: '', type: '', amount: '', dueDate: '', status: 'pending' });
        setShowFeeForm(false);
      } catch (error) {
        console.error('Failed to add fee:', error);
      }
    }
  };

  const deleteItem = async (type, id) => {
    try {
      if (!currentUser) {
        console.error('No authenticated user');
        return;
      }
      const itemRef = ref(database, 'users/' + currentUser.uid + '/' + type + 's/' + id);
      await remove(itemRef);
      loadAllData();
    } catch (error) {
      console.error(`Failed to delete ${type}:`, error);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error('Failed to log out:', error);
    }
  };

  const toggleModule = (moduleId) => {
    if (expandedModules.includes(moduleId)) {
      setExpandedModules(expandedModules.filter(id => id !== moduleId));
    } else {
      setExpandedModules([...expandedModules, moduleId]);
    }
  };

  const handleModuleClick = (moduleId, subModuleId = '') => {
    if (moduleId === 'overview') {
      setActiveModule('overview');
      setActiveSubModule('');
      return;
    }
    
    if (!subModuleId) {
      if (expandedModules.includes(moduleId)) {
        setExpandedModules(expandedModules.filter(id => id !== moduleId));
      } else {
        setExpandedModules([moduleId]);
      }
      return;
    }
    
    setActiveModule(moduleId);
    setActiveSubModule(subModuleId);
  };

  const renderOverview = () => (
    <div className="overview-content">
      <h2>Welcome to LMS Dashboard</h2>
      <p className="overview-subtitle">Manage your educational institution efficiently</p>
      
      {loading ? (
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading data...</p>
        </div>
      ) : (
        <>
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-icon">
                <FaUsers />
              </div>
              <div className="stat-content">
                <h3>{students.length}</h3>
                <p>Total Students</p>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">
                <FaChalkboardTeacher />
              </div>
              <div className="stat-content">
                <h3>{teachers.length}</h3>
                <p>Total Teachers</p>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">
                <FaChalkboard />
              </div>
              <div className="stat-content">
                <h3>{classes.length}</h3>
                <p>Total Classes</p>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">
                <FaBook />
              </div>
              <div className="stat-content">
                <h3>{subjects.length}</h3>
                <p>Total Subjects</p>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">
                <FaBook />
              </div>
              <div className="stat-content">
                <h3>{syllabus.length}</h3>
                <p>Total Syllabus</p>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">
                <FaMoneyBillWave />
              </div>
              <div className="stat-content">
                <h3>{fees.length}</h3>
                <p>Total Fee Records</p>
              </div>
            </div>
          </div>
          
          <div className="dashboard-sections">
            <div className="section-left">
              <div className="recent-activity">
                <h3>Recent Activity</h3>
                <div className="activity-list">
                  {students.slice(-3).map(student => (
                    <div key={student.id} className="activity-item">
                      <div className="activity-icon">
                        <FaUsers />
                      </div>
                      <div className="activity-content">
                        <h6>New Student Registered</h6>
                        <p>{student.name} was added to the system</p>
                        <small>{new Date(student.createdAt).toLocaleDateString()}</small>
                      </div>
                    </div>
                  ))}
                  {teachers.slice(-2).map(teacher => (
                    <div key={teacher.id} className="activity-item">
                      <div className="activity-icon">
                        <FaChalkboardTeacher />
                      </div>
                      <div className="activity-content">
                        <h6>New Teacher Added</h6>
                        <p>{teacher.name} joined the faculty</p>
                        <small>{new Date(teacher.createdAt).toLocaleDateString()}</small>
                      </div>
                    </div>
                  ))}
                  {classes.slice(-1).map(cls => (
                    <div key={cls.id} className="activity-item">
                      <div className="activity-icon">
                        <FaChalkboard />
                      </div>
                      <div className="activity-content">
                        <h6>New Class Created</h6>
                        <p>{cls.name} class was established</p>
                        <small>{new Date(cls.createdAt).toLocaleDateString()}</small>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="section-right">
              <div className="quick-actions">
                <h3>Quick Actions</h3>
                <div className="action-buttons">
                  <button onClick={() => handleModuleClick('students', 'student-registration')} className="action-btn">
                    <FaUsers />
                    <span>Add Student</span>
                  </button>
                  <button onClick={() => handleModuleClick('teachers', 'teacher-registration')} className="action-btn">
                    <FaChalkboardTeacher />
                    <span>Add Teacher</span>
                  </button>
                  <button onClick={() => handleModuleClick('classes', 'class-form')} className="action-btn">
                    <FaChalkboard />
                    <span>Create Class</span>
                  </button>
                  <button onClick={() => handleModuleClick('subjects', 'subject-form')} className="action-btn">
                    <FaBook />
                    <span>Add Subject</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );

  const renderStudentForm = () => (
    <div className="form-container">
      <h3>Add New Student</h3>
      <div className="form-grid">
        <input
          type="text"
          placeholder="Full Name"
          value={studentForm.name}
          onChange={(e) => setStudentForm({...studentForm, name: e.target.value})}
        />
        <input
          type="email"
          placeholder="Email"
          value={studentForm.email}
          onChange={(e) => setStudentForm({...studentForm, email: e.target.value})}
        />
        <input
          type="tel"
          placeholder="Phone"
          value={studentForm.phone}
          onChange={(e) => setStudentForm({...studentForm, phone: e.target.value})}
        />
        <input
          type="text"
          placeholder="Grade"
          value={studentForm.grade}
          onChange={(e) => setStudentForm({...studentForm, grade: e.target.value})}
        />
        <input
          type="text"
          placeholder="Parent Name"
          value={studentForm.parentName}
          onChange={(e) => setStudentForm({...studentForm, parentName: e.target.value})}
        />
        <textarea
          placeholder="Address"
          value={studentForm.address}
          onChange={(e) => setStudentForm({...studentForm, address: e.target.value})}
        />
      </div>
      <div className="form-actions">
        <button onClick={addStudent} className="btn-primary">Add Student</button>
        <button onClick={() => setShowStudentForm(false)} className="btn-secondary">Cancel</button>
      </div>
    </div>
  );

  const renderStudentList = () => (
    <div className="list-container">
      <div className="list-header">
        <h3>Student List</h3>
        <button onClick={() => setShowStudentForm(true)} className="btn-primary">
          <FaPlus /> Add Student
        </button>
      </div>
      
      <div className="search-bar">
        <FaSearch />
        <input
          type="text"
          placeholder="Search students..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {showStudentForm && renderStudentForm()}

      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Grade</th>
              <th>Parent</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {students
              .filter(student => 
                student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                student.email.toLowerCase().includes(searchTerm.toLowerCase())
              )
              .map(student => (
                <tr key={student.id}>
                  <td>{student.id}</td>
                  <td>{student.name}</td>
                  <td>{student.email}</td>
                  <td>{student.phone}</td>
                  <td>{student.grade}</td>
                  <td>{student.parentName}</td>
                  <td>
                    <button className="btn-icon btn-edit">
                      <FaEdit />
                    </button>
                    <button 
                      className="btn-icon btn-delete"
                      onClick={() => deleteItem('student', student.id)}
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderTeacherForm = () => (
    <div className="form-container">
      <h3>Add New Teacher</h3>
      <div className="form-grid">
        <input
          type="text"
          placeholder="Full Name"
          value={teacherForm.name}
          onChange={(e) => setTeacherForm({...teacherForm, name: e.target.value})}
        />
        <input
          type="email"
          placeholder="Email"
          value={teacherForm.email}
          onChange={(e) => setTeacherForm({...teacherForm, email: e.target.value})}
        />
        <input
          type="tel"
          placeholder="Phone"
          value={teacherForm.phone}
          onChange={(e) => setTeacherForm({...teacherForm, phone: e.target.value})}
        />
        <input
          type="text"
          placeholder="Subject"
          value={teacherForm.subject}
          onChange={(e) => setTeacherForm({...teacherForm, subject: e.target.value})}
        />
        <input
          type="text"
          placeholder="Qualification"
          value={teacherForm.qualification}
          onChange={(e) => setTeacherForm({...teacherForm, qualification: e.target.value})}
        />
        <input
          type="text"
          placeholder="Experience (years)"
          value={teacherForm.experience}
          onChange={(e) => setTeacherForm({...teacherForm, experience: e.target.value})}
        />
      </div>
      <div className="form-actions">
        <button onClick={addTeacher} className="btn-primary">Add Teacher</button>
        <button onClick={() => setShowTeacherForm(false)} className="btn-secondary">Cancel</button>
      </div>
    </div>
  );

  const renderTeacherList = () => (
    <div className="list-container">
      <div className="list-header">
        <h3>Teacher List</h3>
        <button onClick={() => setShowTeacherForm(true)} className="btn-primary">
          <FaPlus /> Add Teacher
        </button>
      </div>
      
      <div className="search-bar">
        <FaSearch />
        <input
          type="text"
          placeholder="Search teachers..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {showTeacherForm && renderTeacherForm()}

      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Subject</th>
              <th>Qualification</th>
              <th>Experience</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {teachers
              .filter(teacher => 
                teacher.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                teacher.email.toLowerCase().includes(searchTerm.toLowerCase())
              )
              .map(teacher => (
                <tr key={teacher.id}>
                  <td>{teacher.id}</td>
                  <td>{teacher.name}</td>
                  <td>{teacher.email}</td>
                  <td>{teacher.phone}</td>
                  <td>{teacher.subject}</td>
                  <td>{teacher.qualification}</td>
                  <td>{teacher.experience} years</td>
                  <td>
                    <button className="btn-icon btn-edit">
                      <FaEdit />
                    </button>
                    <button 
                      className="btn-icon btn-delete"
                      onClick={() => deleteItem('teacher', teacher.id)}
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderClassForm = () => (
    <div className="form-container">
      <h3>Add New Class</h3>
      <div className="form-grid">
        <input
          type="text"
          placeholder="Class Name"
          value={classForm.name}
          onChange={(e) => setClassForm({...classForm, name: e.target.value})}
        />
        <input
          type="text"
          placeholder="Grade Level"
          value={classForm.grade}
          onChange={(e) => setClassForm({...classForm, grade: e.target.value})}
        />
        <input
          type="text"
          placeholder="Teacher"
          value={classForm.teacher}
          onChange={(e) => setClassForm({...classForm, teacher: e.target.value})}
        />
        <input
          type="text"
          placeholder="Schedule"
          value={classForm.schedule}
          onChange={(e) => setClassForm({...classForm, schedule: e.target.value})}
        />
        <input
          type="text"
          placeholder="Room Number"
          value={classForm.room}
          onChange={(e) => setClassForm({...classForm, room: e.target.value})}
        />
        <input
          type="number"
          placeholder="Capacity"
          value={classForm.capacity}
          onChange={(e) => setClassForm({...classForm, capacity: e.target.value})}
        />
      </div>
      <div className="form-actions">
        <button onClick={addClass} className="btn-primary">Add Class</button>
        <button onClick={() => setShowClassForm(false)} className="btn-secondary">Cancel</button>
      </div>
    </div>
  );

  const renderClassList = () => (
    <div className="list-container">
      <div className="list-header">
        <h3>Class List</h3>
        <button onClick={() => setShowClassForm(true)} className="btn-primary">
          <FaPlus /> Add Class
        </button>
      </div>
      
      <div className="search-bar">
        <FaSearch />
        <input
          type="text"
          placeholder="Search classes..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {showClassForm && renderClassForm()}

      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Class Name</th>
              <th>Grade</th>
              <th>Teacher</th>
              <th>Schedule</th>
              <th>Room</th>
              <th>Capacity</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {classes
              .filter(cls => 
                cls.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                cls.grade.toLowerCase().includes(searchTerm.toLowerCase())
              )
              .map(cls => (
                <tr key={cls.id}>
                  <td>{cls.id}</td>
                  <td>{cls.name}</td>
                  <td>{cls.grade}</td>
                  <td>{cls.teacher}</td>
                  <td>{cls.schedule}</td>
                  <td>{cls.room}</td>
                  <td>{cls.capacity}</td>
                  <td>
                    <button className="btn-icon btn-edit">
                      <FaEdit />
                    </button>
                    <button 
                      className="btn-icon btn-delete"
                      onClick={() => deleteItem('class', cls.id)}
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderSubjectForm = () => (
    <div className="form-container">
      <h3>Add New Subject</h3>
      <div className="form-grid">
        <input
          type="text"
          placeholder="Subject Name"
          value={subjectForm.name}
          onChange={(e) => setSubjectForm({...subjectForm, name: e.target.value})}
        />
        <input
          type="text"
          placeholder="Subject Code"
          value={subjectForm.code}
          onChange={(e) => setSubjectForm({...subjectForm, code: e.target.value})}
        />
        <textarea
          placeholder="Description"
          value={subjectForm.description}
          onChange={(e) => setSubjectForm({...subjectForm, description: e.target.value})}
        />
        <input
          type="number"
          placeholder="Credits"
          value={subjectForm.credits}
          onChange={(e) => setSubjectForm({...subjectForm, credits: e.target.value})}
        />
        <input
          type="text"
          placeholder="Teacher"
          value={subjectForm.teacher}
          onChange={(e) => setSubjectForm({...subjectForm, teacher: e.target.value})}
        />
      </div>
      <div className="form-actions">
        <button onClick={addSubject} className="btn-primary">Add Subject</button>
        <button onClick={() => setShowSubjectForm(false)} className="btn-secondary">Cancel</button>
      </div>
    </div>
  );

  const renderSubjectList = () => (
    <div className="list-container">
      <div className="list-header">
        <h3>Subject List</h3>
        <button onClick={() => setShowSubjectForm(true)} className="btn-primary">
          <FaPlus /> Add Subject
        </button>
      </div>
      
      <div className="search-bar">
        <FaSearch />
        <input
          type="text"
          placeholder="Search subjects..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {showSubjectForm && renderSubjectForm()}

      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Subject Name</th>
              <th>Code</th>
              <th>Description</th>
              <th>Credits</th>
              <th>Teacher</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {subjects
              .filter(subject => 
                subject.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                subject.code.toLowerCase().includes(searchTerm.toLowerCase())
              )
              .map(subject => (
                <tr key={subject.id}>
                  <td>{subject.id}</td>
                  <td>{subject.name}</td>
                  <td>{subject.code}</td>
                  <td>{subject.description}</td>
                  <td>{subject.credits}</td>
                  <td>{subject.teacher}</td>
                  <td>
                    <button className="btn-icon btn-edit">
                      <FaEdit />
                    </button>
                    <button 
                      className="btn-icon btn-delete"
                      onClick={() => deleteItem('subject', subject.id)}
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderSyllabusForm = () => (
    <div className="form-container">
      <h3>Add New Syllabus</h3>
      <div className="form-grid">
        <input
          type="text"
          placeholder="Subject"
          value={syllabusForm.subject}
          onChange={(e) => setSyllabusForm({...syllabusForm, subject: e.target.value})}
        />
        <input
          type="text"
          placeholder="Grade Level"
          value={syllabusForm.grade}
          onChange={(e) => setSyllabusForm({...syllabusForm, grade: e.target.value})}
        />
        <textarea
          placeholder="Topics Covered"
          value={syllabusForm.topics}
          onChange={(e) => setSyllabusForm({...syllabusForm, topics: e.target.value})}
        />
        <input
          type="text"
          placeholder="Duration"
          value={syllabusForm.duration}
          onChange={(e) => setSyllabusForm({...syllabusForm, duration: e.target.value})}
        />
        <textarea
          placeholder="Learning Objectives"
          value={syllabusForm.objectives}
          onChange={(e) => setSyllabusForm({...syllabusForm, objectives: e.target.value})}
        />
      </div>
      <div className="form-actions">
        <button onClick={addSyllabus} className="btn-primary">Add Syllabus</button>
        <button onClick={() => setShowSyllabusForm(false)} className="btn-secondary">Cancel</button>
      </div>
    </div>
  );

  const renderSyllabusList = () => (
    <div className="list-container">
      <div className="list-header">
        <h3>Syllabus List</h3>
        <button onClick={() => setShowSyllabusForm(true)} className="btn-primary">
          <FaPlus /> Add Syllabus
        </button>
      </div>
      
      <div className="search-bar">
        <FaSearch />
        <input
          type="text"
          placeholder="Search syllabus..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {showSyllabusForm && renderSyllabusForm()}

      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Subject</th>
              <th>Grade</th>
              <th>Topics</th>
              <th>Duration</th>
              <th>Objectives</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {syllabus
              .filter(syl => 
                syl.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
                syl.grade.toLowerCase().includes(searchTerm.toLowerCase())
              )
              .map(syl => (
                <tr key={syl.id}>
                  <td>{syl.id}</td>
                  <td>{syl.subject}</td>
                  <td>{syl.grade}</td>
                  <td>{syl.topics}</td>
                  <td>{syl.duration}</td>
                  <td>{syl.objectives}</td>
                  <td>
                    <button className="btn-icon btn-edit">
                      <FaEdit />
                    </button>
                    <button 
                      className="btn-icon btn-delete"
                      onClick={() => deleteItem('syllabus', syl.id)}
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderFeeForm = () => (
    <div className="form-container">
      <h3>Add New Fee Record</h3>
      <div className="form-grid">
        <input
          type="text"
          placeholder="Student Name"
          value={feeForm.student}
          onChange={(e) => setFeeForm({...feeForm, student: e.target.value})}
        />
        <select
          value={feeForm.type}
          onChange={(e) => setFeeForm({...feeForm, type: e.target.value})}
        >
          <option value="">Select Fee Type</option>
          <option value="tuition">Tuition Fee</option>
          <option value="library">Library Fee</option>
          <option value="laboratory">Laboratory Fee</option>
          <option value="transport">Transport Fee</option>
          <option value="other">Other</option>
        </select>
        <input
          type="number"
          placeholder="Amount"
          value={feeForm.amount}
          onChange={(e) => setFeeForm({...feeForm, amount: e.target.value})}
        />
        <input
          type="date"
          placeholder="Due Date"
          value={feeForm.dueDate}
          onChange={(e) => setFeeForm({...feeForm, dueDate: e.target.value})}
        />
        <select
          value={feeForm.status}
          onChange={(e) => setFeeForm({...feeForm, status: e.target.value})}
        >
          <option value="pending">Pending</option>
          <option value="paid">Paid</option>
          <option value="overdue">Overdue</option>
        </select>
      </div>
      <div className="form-actions">
        <button onClick={addFee} className="btn-primary">Add Fee Record</button>
        <button onClick={() => setShowFeeForm(false)} className="btn-secondary">Cancel</button>
      </div>
    </div>
  );

  const renderFeeList = () => (
    <div className="list-container">
      <div className="list-header">
        <h3>Fee Records</h3>
        <button onClick={() => setShowFeeForm(true)} className="btn-primary">
          <FaPlus /> Add Fee Record
        </button>
      </div>
      
      <div className="search-bar">
        <FaSearch />
        <input
          type="text"
          placeholder="Search fee records..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {showFeeForm && renderFeeForm()}

      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Student</th>
              <th>Fee Type</th>
              <th>Amount</th>
              <th>Due Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {fees
              .filter(fee => 
                fee.student.toLowerCase().includes(searchTerm.toLowerCase()) ||
                fee.type.toLowerCase().includes(searchTerm.toLowerCase())
              )
              .map(fee => (
                <tr key={fee.id}>
                  <td>{fee.id}</td>
                  <td>{fee.student}</td>
                  <td>{fee.type}</td>
                  <td>${fee.amount}</td>
                  <td>{fee.dueDate}</td>
                  <td>
                    <span className={`status-badge status-${fee.status}`}>
                      {fee.status}
                    </span>
                  </td>
                  <td>
                    <button className="btn-icon btn-edit">
                      <FaEdit />
                    </button>
                    <button 
                      className="btn-icon btn-delete"
                      onClick={() => deleteItem('fee', fee.id)}
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderModuleContent = () => {
    switch(activeModule) {
      case 'overview':
        return renderOverview();
      case 'students':
        if (activeSubModule === 'student-registration') {
          return renderStudentForm();
        } else {
          return renderStudentList();
        }
      case 'teachers':
        if (activeSubModule === 'teacher-registration') {
          return renderTeacherForm();
        } else {
          return renderTeacherList();
        }
      case 'classes':
        if (activeSubModule === 'class-form') {
          return renderClassForm();
        } else {
          return renderClassList();
        }
      case 'subjects':
        if (activeSubModule === 'subject-form') {
          return renderSubjectForm();
        } else {
          return renderSubjectList();
        }
      case 'syllabus':
        if (activeSubModule === 'syllabus-form') {
          return renderSyllabusForm();
        } else {
          return renderSyllabusList();
        }
      case 'fees':
        if (activeSubModule === 'fee-form') {
          return renderFeeForm();
        } else {
          return renderFeeList();
        }
      default:
        return renderOverview();
    }
  };

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <div className="header-left">
          <button 
            className="sidebar-toggle"
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
          >
            {sidebarCollapsed ? <FaBars /> : <FaTimes />}
          </button>
          <h1>LMS Portal</h1>
        </div>
        <div className="header-right">
          <span className="user-info">
            Welcome, {currentUser?.displayName || currentUser?.email}
          </span>
          <button onClick={handleLogout} className="btn-logout">
            <FaSignOutAlt /> Logout
          </button>
        </div>
      </header>

      <div className="dashboard-main">
        <aside className={`dashboard-sidebar ${sidebarCollapsed ? 'collapsed' : ''}`}>
          <nav className="sidebar-nav">
            {modules.map(module => (
              <div key={module.id} className="module-item">
                <div 
                  className="module-header"
                  onClick={() => handleModuleClick(module.id)}
                >
                  <module.icon className="module-icon" />
                  <span className="module-name">{module.name}</span>
                  {module.subItems.length > 0 && (
                    <FaChevronDown 
                      className={`module-arrow ${expandedModules.includes(module.id) ? 'expanded' : ''}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleModule(module.id);
                      }}
                    />
                  )}
                </div>
                
                {module.subItems.length > 0 && expandedModules.includes(module.id) && (
                  <div className="sub-modules">
                    {module.subItems.map(subItem => (
                      <div
                        key={subItem.id}
                        className={`sub-module-item ${activeSubModule === subItem.id ? 'active' : ''}`}
                        onClick={() => handleModuleClick(module.id, subItem.id)}
                      >
                        <span className="sub-module-name">{subItem.name}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>
        </aside>

        <main className="dashboard-content">
          {renderModuleContent()}
        </main>
      </div>
    </div>
  );
}
