import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { doc, getDoc, collection, getCountFromServer, query, orderBy, limit, getDocs, where } from 'firebase/firestore';
import { db } from '../config/firebase';
import '../styles/dashboard.css';

export const Dashboard = () => {
  const { user } = useAuth();
  const [userData, setUserData] = useState(null);
  const [stats, setStats] = useState({
    students: 0,
    teachers: 0,
    classes: 0,
    subjects: 0
  });
  const [recentActivities, setRecentActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDashboardData = async () => {
      if (user) {
        try {
          // Fetch User Data
          const userDocRef = doc(db, 'users', user.uid);
          const userDoc = await getDoc(userDocRef);
          if (userDoc.exists()) {
            setUserData(userDoc.data());
          }

          // Fetch Stats
          const [studentCount, teacherCount, classCount, subjectCount] = await Promise.all([
            getCountFromServer(query(collection(db, 'students'), where('userId', '==', user.uid))),
            getCountFromServer(query(collection(db, 'teachers'), where('userId', '==', user.uid))),
            getCountFromServer(query(collection(db, 'classes'), where('userId', '==', user.uid))),
            getCountFromServer(query(collection(db, 'subjects'), where('userId', '==', user.uid)))
          ]);

          setStats({
            students: studentCount.data().count,
            teachers: teacherCount.data().count,
            classes: classCount.data().count,
            subjects: subjectCount.data().count
          });

          // Fetch Recent Activities (User-specific)
          const qStudents = query(collection(db, 'students'), where('userId', '==', user.uid), limit(10));
          const qTeachers = query(collection(db, 'teachers'), where('userId', '==', user.uid), limit(10));
          const qClasses = query(collection(db, 'classes'), where('userId', '==', user.uid), limit(10));
          const qSubjects = query(collection(db, 'subjects'), where('userId', '==', user.uid), limit(10));

          const [studentSnap, teacherSnap, classSnap, subjectSnap] = await Promise.all([
            getDocs(qStudents),
            getDocs(qTeachers),
            getDocs(qClasses),
            getDocs(qSubjects)
          ]);

          const activities = [
            ...studentSnap.docs.map(doc => {
              const d = doc.data();
              const date = d.createdAt?.toDate ? d.createdAt.toDate() : (d.createdAt ? new Date(d.createdAt) : new Date());
              return {
                id: doc.id,
                type: 'Student',
                name: d.name,
                date: date,
                icon: '🎓'
              };
            }),
            ...teacherSnap.docs.map(doc => {
              const d = doc.data();
              const date = d.createdAt?.toDate ? d.createdAt.toDate() : (d.createdAt ? new Date(d.createdAt) : new Date());
              return {
                id: doc.id,
                type: 'Teacher',
                name: d.name,
                date: date,
                icon: '👨‍🏫'
              };
            }),
            ...classSnap.docs.map(doc => {
              const d = doc.data();
              const date = d.createdAt?.toDate ? d.createdAt.toDate() : (d.createdAt ? new Date(d.createdAt) : new Date());
              return {
                id: doc.id,
                type: 'Class',
                name: d.className,
                date: date,
                icon: '🏫'
              };
            }),
            ...subjectSnap.docs.map(doc => {
              const d = doc.data();
              const date = d.createdAt?.toDate ? d.createdAt.toDate() : (d.createdAt ? new Date(d.createdAt) : new Date());
              return {
                id: doc.id,
                type: 'Subject',
                name: d.subjectName,
                date: date,
                icon: '📚'
              };
            })
          ]
            .filter(a => a.date && !isNaN(new Date(a.date).getTime()))
            .sort((a, b) => new Date(b.date) - new Date(a.date))
            .slice(0, 5);

          setRecentActivities(activities);
        } catch (error) {
          console.error('Error fetching dashboard data:', error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchDashboardData();
  }, [user]);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading your dashboard...</p>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      <main className="dashboard-main">
        <div className="dashboard-grid">
          {/* Welcome Card */}
          <section className="welcome-card">
            <div className="welcome-content">
              <h2>Welcome, {userData?.fullName || user?.email}!</h2>
              <p>Your learning journey starts here</p>
            </div>
          </section>

          {/* Stats Cards */}
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-icon">🎓</div>
              <h3>Total Students</h3>
              <p className="stat-number">{stats.students}</p>
            </div>
            <div className="stat-card">
              <div className="stat-icon">👨‍🏫</div>
              <h3>Total Teachers</h3>
              <p className="stat-number">{stats.teachers}</p>
            </div>
            <div className="stat-card">
              <div className="stat-icon">🏫</div>
              <h3>Total Classes</h3>
              <p className="stat-number">{stats.classes}</p>
            </div>
            <div className="stat-card">
              <div className="stat-icon">📚</div>
              <h3>Total Subjects</h3>
              <p className="stat-number">{stats.subjects}</p>
            </div>
          </div>

          {/* User Info Card */}
          <section className="user-info-card">
            <h3>Account Information</h3>
            <div className="info-grid">
              <div className="info-item">
                <label>Email</label>
                <p>{user?.email}</p>
              </div>
              <div className="info-item">
                <label>Full Name</label>
                <p>{userData?.fullName || 'Not set'}</p>
              </div>
              <div className="info-item">
                <label>Member Since</label>
                <p>
                  {userData?.createdAt
                    ? new Date(userData.createdAt).toLocaleDateString()
                    : 'N/A'}
                </p>
              </div>
              <div className="info-item">
                <label>Authentication Method</label>
                <p className="auth-method">{userData?.authMethod || 'N/A'}</p>
              </div>
            </div>
          </section>

          {/* Recent Activity */}
          {userData?.showRecentActivity !== false && (
            <section className="activity-card">
              <h3>Recent Activity</h3>
              <div className="activity-list">
                {recentActivities.length > 0 ? (
                  recentActivities.map((activity) => (
                    <div key={activity.id} className="activity-item">
                      <div className="activity-icon">{activity.icon}</div>
                      <div className="activity-details">
                        <p>
                          New <strong>{activity.type}</strong>: {activity.name}
                        </p>
                        <span>
                          {new Date(activity.date).toLocaleDateString()} at {new Date(activity.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="activity-item">
                    <div className="activity-icon">🎯</div>
                    <div className="activity-details">
                      <p>Account created</p>
                      <span>
                        {userData?.createdAt
                          ? new Date(userData.createdAt).toLocaleDateString()
                          : 'N/A'}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </section>
          )}
        </div>
      </main>
    </div>
  );
};
