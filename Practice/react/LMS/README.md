# Learning Management System (LMS)

A comprehensive Learning Management System built with React, Firebase, and Bootstrap. This system provides a complete solution for educational institutions to manage students, teachers, classes, fees, admissions, exams, and more.

## 🚀 Features

### Core Modules
- **Students Management** - Add, edit, delete, and manage student records
- **Teachers Management** - Manage teacher information and assignments
- **School Management** - School registration and admin staff management
- **Syllabus Management** - Create and manage curriculum content
- **Classes Management** - Register and manage class information
- **Fees Management** - Fee structure, collections, and voucher printing
- **Admission Management** - Student admission processing
- **Exams Management** - Schedule exams and create papers
- **Subjects Management** - Manage subject information

### Technical Features
- 🔐 **Authentication System** - Secure login/logout with Firebase Auth
- 🗄️ **Real-time Database** - Firebase Firestore integration
- 📱 **Responsive Design** - Mobile-friendly interface
- 🎨 **Modern UI/UX** - Bootstrap and custom CSS styling
- 🔒 **Protected Routes** - Secure access to dashboard
- 📊 **Dashboard Analytics** - Overview statistics and quick actions
- 🔍 **Search & Filter** - Advanced data filtering capabilities

## 🛠️ Tech Stack

- **Frontend**: React 19, React Router DOM
- **Styling**: Bootstrap 5, Custom CSS
- **Backend**: Firebase (Authentication, Firestore)
- **Icons**: React Icons (FontAwesome)
- **Build Tool**: Vite

## 📋 Prerequisites

Before running this project, make sure you have:

- Node.js (v16 or higher)
- npm or yarn package manager
- Firebase project setup

## 🚀 Installation & Setup

### 1. Clone the Repository
```bash
git clone <repository-url>
cd lms-project
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Firebase Configuration

#### Create Firebase Project
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project or select existing one
3. Enable Authentication (Email/Password)
4. Create Firestore Database
5. Get your Firebase configuration

#### Update Firebase Config
Edit `src/firebase/config.js` and replace the placeholder values:

```javascript
const firebaseConfig = {
  apiKey: "your-actual-api-key",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "your-sender-id",
  appId: "your-app-id"
};
```

### 4. Run the Application
```bash
npm run dev
```

The application will open at `http://localhost:5173`

## 🏗️ Project Structure

```
src/
├── components/          # React components
│   ├── Login.jsx       # Authentication page
│   ├── Dashboard.jsx   # Main dashboard
│   ├── Login.css       # Login styles
│   └── Dashboard.css   # Dashboard styles
├── contexts/           # React contexts
│   └── AuthContext.jsx # Authentication context
├── firebase/           # Firebase configuration
│   └── config.js       # Firebase setup
├── services/           # Business logic services
│   └── firebaseService.js # Firebase operations
├── App.jsx             # Main application component
└── main.jsx           # Application entry point
```

## 🔐 Authentication

The system uses Firebase Authentication with email/password:

- **Login**: Users can sign in with email and password
- **Role-based Access**: Different user roles (Admin, Teacher, Student)
- **Protected Routes**: Dashboard access requires authentication
- **Session Management**: Automatic session handling

## 📊 Database Schema

### Collections Structure

#### Users
```javascript
{
  email: string,
  role: string, // 'admin', 'teacher', 'student'
  name: string,
  createdAt: timestamp,
  isActive: boolean
}
```

#### Students
```javascript
{
  name: string,
  email: string,
  phone: string,
  class: string,
  admissionDate: timestamp,
  status: string, // 'active', 'inactive'
  createdAt: timestamp
}
```

#### Teachers
```javascript
{
  name: string,
  email: string,
  phone: string,
  subjects: array,
  hireDate: timestamp,
  status: string,
  createdAt: timestamp
}
```

#### Classes
```javascript
{
  name: string,
  capacity: number,
  teacher: string,
  subjects: array,
  status: string,
  createdAt: timestamp
}
```

## 🎯 Usage Guide

### 1. First Time Setup
1. Create a Firebase project
2. Update configuration in `src/firebase/config.js`
3. Create an admin user through Firebase Console
4. Login with admin credentials

### 2. Adding Data
- Use the "Add New" buttons in each module
- Fill in required information
- Data is automatically saved to Firebase

### 3. Managing Records
- View all records in table format
- Edit existing records
- Delete records (with confirmation)
- Search and filter data

### 4. Dashboard Overview
- View system statistics
- Quick access to common actions
- Recent activity feed
- Navigation to all modules

## 🔧 Customization

### Adding New Modules
1. Create new component in `components/` folder
2. Add to dashboard navigation
3. Create corresponding Firebase service functions
4. Update routing if needed

### Styling
- Modify CSS files in `components/` folder
- Update Bootstrap theme variables
- Customize color scheme and layout

### Database Rules
Configure Firestore security rules in Firebase Console:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if request.auth != null;
    }
  }
}
```

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Deploy to Firebase Hosting
1. Install Firebase CLI: `npm install -g firebase-tools`
2. Login: `firebase login`
3. Initialize: `firebase init hosting`
4. Deploy: `firebase deploy`

## 📱 Responsive Design

The application is fully responsive and works on:
- Desktop computers
- Tablets
- Mobile phones
- All modern browsers

## 🔒 Security Features

- Firebase Authentication
- Protected routes
- Role-based access control
- Secure database rules
- Input validation

## 🐛 Troubleshooting

### Common Issues

1. **Firebase Connection Error**
   - Check Firebase configuration
   - Verify API keys and project settings
   - Check internet connection

2. **Authentication Issues**
   - Verify user exists in Firebase
   - Check email/password combination
   - Clear browser cache

3. **Data Not Loading**
   - Check Firestore rules
   - Verify collection names
   - Check browser console for errors

### Debug Mode
Enable debug logging in browser console for detailed error information.

## 🤝 Contributing

1. Fork the repository
2. Create feature branch
3. Make changes
4. Test thoroughly
5. Submit pull request

## 📄 License

This project is licensed under the MIT License.

## 📞 Support

For support and questions:
- Create an issue in the repository
- Contact the development team
- Check documentation and FAQs

## 🔄 Updates & Maintenance

- Regular security updates
- Feature enhancements
- Bug fixes and improvements
- Performance optimizations

---

**Note**: This is a development version. For production use, ensure proper security measures, data backup, and testing are implemented.
