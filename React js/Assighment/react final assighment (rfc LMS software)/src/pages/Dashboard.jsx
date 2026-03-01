import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../config/firebase';
import '../styles/dashboard.css';

export const Dashboard = () => {
  const { user, logout } = useAuth();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      if (user) {
        try {
          const userDocRef = doc(db, 'users', user.uid);
          const userDoc = await getDoc(userDocRef);
          if (userDoc.exists()) {
            setUserData(userDoc.data());
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchUserData();
  }, [user]);

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/auth');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

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
      {/* Header */}
      <header className="dashboard-header">
        <div className="header-content">
          <h1>LMS Dashboard</h1>
          <button onClick={handleLogout} className="btn-logout">
            Logout
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="dashboard-main">
        <div className="dashboard-grid">
          {/* Welcome Card */}
          <section className="welcome-card">
            <div className="welcome-content">
              <h2>Welcome, {userData?.fullName || user?.email}!</h2>
              <p>Your learning journey starts here</p>
            </div>
            {userData?.photoURL && (
              <img src={userData.photoURL} alt="Profile" className="profile-image" />
            )}
          </section>

          {/* Stats Cards */}
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-icon">📚</div>
              <h3>Enrolled Courses</h3>
              <p className="stat-number">0</p>
            </div>
            <div className="stat-card">
              <div className="stat-icon">✅</div>
              <h3>Completed</h3>
              <p className="stat-number">0</p>
            </div>
            <div className="stat-card">
              <div className="stat-icon">🔥</div>
              <h3>Learning Streak</h3>
              <p className="stat-number">0</p>
            </div>
            <div className="stat-card">
              <div className="stat-icon">⭐</div>
              <h3>Achievements</h3>
              <p className="stat-number">0</p>
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
          <section className="activity-card">
            <h3>Recent Activity</h3>
            <div className="activity-list">
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
            </div>
          </section>
        </div>
      </main>
    </div>
  );
  console.log(userData);
};
