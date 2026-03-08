import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { PageHeader } from '../../components/PageHeader';
import { Input } from '../../components/Input';
import { Button } from '../../components/Button';
import { toast } from 'react-toastify';
import { updateProfile, updateEmail, updatePassword } from 'firebase/auth';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../config/firebase';
import { FiUser, FiMail, FiShield, FiBell, FiEye, FiActivity } from 'react-icons/fi';
import '../../styles/pages.css';

export const Settings = () => {
    const { user } = useAuth();
    const [loading, setLoading] = useState(false);

    // Form States
    const [displayName, setDisplayName] = useState(user?.displayName || '');
    const [photoURL, setPhotoURL] = useState(user?.photoURL || '');
    const [email, setEmail] = useState(user?.email || '');
    const [password, setPassword] = useState('');
    const [showActivity, setShowActivity] = useState(true);
    const [isGoogleUser, setIsGoogleUser] = useState(false);

    // Initial Values for dirty checking
    const [initialValues, setInitialValues] = useState({
        displayName: user?.displayName || '',
        photoURL: user?.photoURL || '',
        email: user?.email || '',
        showActivity: true
    });

    useEffect(() => {
        if (user) {
            setIsGoogleUser(user.providerData.some(p => p.providerId === 'google.com'));
        }
    }, [user]);

    useEffect(() => {
        const fetchUserData = async () => {
            if (!user) return;
            try {
                const userDoc = await getDoc(doc(db, 'users', user.uid));
                if (userDoc.exists()) {
                    const data = userDoc.data();
                    setShowActivity(data.showRecentActivity !== false);
                    setInitialValues(prev => ({
                        ...prev,
                        showActivity: data.showRecentActivity !== false
                    }));
                }
            } catch (error) {
                console.error('Error fetching user settings:', error);
            }
        };
        fetchUserData();
    }, [user]);

    const isDirty =
        displayName !== initialValues.displayName ||
        photoURL !== initialValues.photoURL ||
        email !== initialValues.email ||
        password !== '' ||
        showActivity !== initialValues.showActivity;

    const handleSave = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            // 1. Update Profile (Name & Photo)
            if (displayName !== initialValues.displayName || photoURL !== initialValues.photoURL) {
                await updateProfile(user, { displayName, photoURL });
            }

            // 2. Update Email (May require recent login)
            if (email !== initialValues.email) {
                await updateEmail(user, email);
            }

            // 3. Update Password
            if (password !== '') {
                await updatePassword(user, password);
            }

            // 4. Update Firestore Settings
            await updateDoc(doc(db, 'users', user.uid), {
                fullName: displayName,
                photoURL: photoURL,
                email: email,
                showRecentActivity: showActivity
            });

            setInitialValues({ displayName, photoURL, email, showActivity });
            setPassword('');
            toast.success('Settings updated successfully!');
        } catch (error) {
            console.error(error);
            if (error.code === 'auth/requires-recent-login') {
                toast.error('This action requires recent authentication. Please logout and login again.');
            } else {
                toast.error('Error updating settings: ' + error.message);
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="page">
            <PageHeader
                title="Settings"
                subtitle="Manage your profile, security, and preferences"
            />

            <div className="page-content">
                <form onSubmit={handleSave} className="settings-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '24px' }}>

                    {/* Basic Information */}
                    <div className="settings-card" style={{ background: 'white', padding: '24px', borderRadius: '16px', border: '1px solid var(--border)' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
                            <FiUser style={{ fontSize: '24px', color: 'var(--primary)' }} />
                            <h3 style={{ margin: 0 }}>Basic Information</h3>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                            {/* Avatar Preview */}
                            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '10px' }}>
                                <div style={{
                                    width: '100px',
                                    height: '100px',
                                    borderRadius: '50%',
                                    background: photoURL ? 'transparent' : 'linear-gradient(135deg, var(--primary), #4F46E5)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    overflow: 'hidden',
                                    border: '3px solid var(--primary)',
                                    color: 'white',
                                    fontSize: '40px',
                                    fontWeight: 'bold'
                                }}>
                                    {photoURL ? (
                                        <img src={photoURL} alt="Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                    ) : (
                                        (displayName || email || 'U').charAt(0).toUpperCase()
                                    )}
                                </div>
                            </div>

                            <Input
                                label="Full Name"
                                value={displayName}
                                onChange={(e) => setDisplayName(e.target.value)}
                                placeholder="Enter your name"
                            />
                            <div>
                                <Input
                                    label="Profile Photo URL"
                                    onlyRead
                                    value={photoURL}
                                    onChange={(e) => setPhotoURL(e.target.value)}
                                    placeholder={isGoogleUser ? "https://example.com/photo.jpg" : "Available only for Google authenticators"}
                                    disabled={!isGoogleUser}
                                    style={{ background: !isGoogleUser ? '#F3F4F6' : 'white' }}
                                />
                                {!isGoogleUser && (
                                    <p style={{ margin: '-10px 0 0 0', fontSize: '11px', color: '#6B7280' }}>
                                        Custom image URLs are available only for Google authenticators.
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Account & Security */}
                    <div className="settings-card" style={{ background: 'white', padding: '24px', borderRadius: '16px', border: '1px solid var(--border)' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
                            <FiShield style={{ fontSize: '24px', color: '#F59E0B' }} />
                            <h3 style={{ margin: 0 }}>Account & Security</h3>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                            <Input
                                label="Email Address"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="name@email.com"
                            />
                            <Input
                                label="Change Password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Enter new password (optional)"
                            />
                        </div>
                    </div>

                    {/* Application Preferences */}
                    <div className="settings-card" style={{ background: 'white', padding: '24px', borderRadius: '16px', border: '1px solid var(--border)' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
                            <FiActivity style={{ fontSize: '24px', color: '#10B981' }} />
                            <h3 style={{ margin: 0 }}>Preferences</h3>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                            <p style={{ margin: 0, fontSize: '14px', color: '#6B7280' }}>
                                Show Recent Activity Section
                            </p>
                            <div style={{ display: 'flex', gap: '20px' }}>
                                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '14px' }}>
                                    <input
                                        type="radio"
                                        name="recentActivity"
                                        checked={showActivity === true}
                                        onChange={() => setShowActivity(true)}
                                    />
                                    Enable
                                </label>
                                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '14px' }}>
                                    <input
                                        type="radio"
                                        name="recentActivity"
                                        checked={showActivity === false}
                                        onChange={() => setShowActivity(false)}
                                    />
                                    Disable
                                </label>
                            </div>
                        </div>
                    </div>

                    {/* Submit Section */}
                    <div style={{ gridColumn: '1 / -1', display: 'flex', justifyContent: 'flex-end', paddingTop: '20px' }}>
                        <Button
                            type="submit"
                            variant="primary"
                            disabled={loading || !isDirty}
                            style={{ minWidth: '160px', opacity: !isDirty ? 0.6 : 1 }}
                        >
                            {loading ? 'Saving...' : 'Save Changes'}
                        </Button>
                    </div>

                </form>
            </div>
        </div>
    );
};
