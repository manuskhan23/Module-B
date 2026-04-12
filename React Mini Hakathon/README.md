# React Mini Hackathon

A modern React web application built with Vite, featuring authentication, routing, and Material-UI components.

## Features

- **React 19** with functional components
- **Vite** for fast development and optimized builds
- **Firebase** authentication and real-time database
- **React Router v7** for client-side routing
- **Material-UI (MUI)** components for professional UI
- **Protected Routes** with authentication checks
- **Emotion** for styled components
- **React Toastify** for notifications
- **ESLint** for code quality
- **JSON Server** for mock API during development

## Tech Stack

- **Frontend**: React 19, React Router 7
- **Build Tool**: Vite 7
- **UI Framework**: Material-UI (MUI) v7
- **Styling**: Emotion, CSS
- **Authentication**: Firebase
- **Notifications**: React Toastify
- **Linting**: ESLint 9

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or pnpm

### Installation

```bash
# Clone the repository
git clone <repository-url>

# Navigate to project directory
cd react-mini-hakathon

# Install dependencies
npm install
# or
pnpm install
```

### Development

```bash
# Start development server (runs on http://localhost:5173)
npm run dev

# Start mock API server (runs on http://localhost:3001)
npm run server

# Run both dev and server simultaneously (in different terminals)
npm run dev
npm run server
```

### Build

```bash
# Create production build
npm run build

# Preview production build
npm run preview
```

### Linting

```bash
# Run ESLint
npm run lint
```

## Project Structure

```
src/
├── components/       # Reusable React components
├── config/          # Configuration files (Firebase, API endpoints)
├── pages/           # Page components (routes)
├── protected-route/ # Protected route wrapper
├── store/           # State management
├── styles/          # Global and module styles
├── utils/           # Utility functions
├── App.jsx          # Main App component
├── main.jsx         # React entry point
├── App.css          # App styles
└── index.css        # Global styles

public/
└── rev.png          # Static assets
```

## Firebase Setup

1. Create a Firebase project at [firebase.google.com](https://firebase.google.com)
2. Add your Firebase config to `src/config/`
3. Enable authentication methods (Email/Password, Google, etc.)
4. Create a Firestore database

## Environment Variables

Create a `.env.local` file in the root directory:

```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

## API & Mock Data

The project uses JSON Server for mock API endpoints during development. API configuration is in `src/config/`.

## Available Scripts

| Script | Purpose |
|--------|---------|
| `npm run dev` | Start development server with hot reload |
| `npm run build` | Create optimized production build |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint to check code quality |
| `npm run server` | Start mock API with JSON Server |

## Contributing

1. Create a feature branch (`git checkout -b feature/AmazingFeature`)
2. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
3. Push to the branch (`git push origin feature/AmazingFeature`)
4. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Contact

For questions or support, please open an issue or contact the development team.
