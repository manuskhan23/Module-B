import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { signInWithEmailAndPassword, signInWithPopup, createUserWithEmailAndPassword } from "firebase/auth";
import { auth, googleProvider } from "../config/firebase";
import { toast } from "react-toastify";
import { getRoleFromEmail } from "../utils/roleCheck";
import { branchManagerService } from "../utils/branchManagerService";
import { userProfileService } from "../utils/userProfileService";
import GoogleIcon from "@mui/icons-material/Google";
import EmailIcon from "@mui/icons-material/Email";
import { 
  Box, 
  Grid, 
  Typography, 
  TextField, 
  Button, 
  InputAdornment, 
  Link as MuiLink,
  CircularProgress,
  Paper,
  IconButton,
  Divider
} from "@mui/material";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Please fill in all fields");
      return;
    }

    setLoading(true);
    try {
      try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const uid = userCredential.user.uid;
        const userProfile = await userProfileService.getUserProfile(uid);
        
        if (userProfile && userProfile.role === "branch_manager") {
          localStorage.setItem("userRole", "branch_manager");
          localStorage.setItem("userEmail", email);
          localStorage.setItem("userUID", uid);
          toast.success("Login successful! Welcome Branch Manager");
          redirectByRole("branch_manager");
        } else {
          const role = getRoleFromEmail(email);
          localStorage.setItem("userRole", role);
          localStorage.setItem("userEmail", email);
          localStorage.setItem("userUID", uid);
          localStorage.setItem("userName", auth.currentUser?.displayName || email.split('@')[0]);
          toast.success("Login successful!");
          redirectByRole(role);
        }
      } catch (firebaseError) {
        const managerVerification = await branchManagerService.verifyManagerCredentials(email, password);
        if (managerVerification.success) {
          try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const uid = userCredential.user.uid;
            await userProfileService.createManagerProfile(uid, {
              email: email,
              name: managerVerification.manager.name,
              managerId: managerVerification.manager.id
            });
            localStorage.setItem("userRole", "branch_manager");
            localStorage.setItem("userEmail", email);
            localStorage.setItem("userUID", uid);
            toast.success("Login successful! Welcome Branch Manager");
            redirectByRole("branch_manager");
          } catch (createError) {
            toast.error("Email already exists. Use correct password.");
          }
        } else {
          toast.error("Invalid email or password");
        }
      }
    } catch (error) {
      toast.error("Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const redirectByRole = (role) => {
    switch (role) {
      case "admin": navigate("/admin/dashboard"); break;
      case "branch_manager": navigate("/branch/dashboard"); break;
      default: navigate("/user/dashboard");
    }
  };

  const handleSocialLogin = async (provider) => {
    setLoading(true);
    try {
      const result = await signInWithPopup(auth, provider);
      toast.success("Login successful!");
      const role = getRoleFromEmail(result.user.email);
      localStorage.setItem("userEmail", result.user.email);
      localStorage.setItem("userUID", result.user.uid);
      localStorage.setItem("userName", result.user.displayName || "Google User");
      redirectByRole(role);
    } catch (error) {
       toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ 
      minHeight: '100vh', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      backgroundImage: 'url("https://images.unsplash.com/photo-1622257892554-c162e47a3a5e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cGl6emElMjAlMkMlMjBidXJnZXIlMjAlMkMlMjBwYXN0YSUyMGFuZCUyMHNhbmR3aWNofGVufDB8fDB8fHww")',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundAttachment: 'fixed',
      position: 'relative',
      '&::before': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'rgba(0, 0, 0, 0.7)',
        zIndex: 1
      },
      p: 3
    }}>
      <Paper 
        elevation={24} 
        sx={{ 
          position: 'relative', 
          zIndex: 2, 
          width: '100%', 
          maxWidth: 450, 
          borderRadius: 5, 
          overflow: 'hidden',
          bgcolor: 'rgba(255, 255, 255, 0.5)',
          backdropFilter: 'blur(15px)',
          boxShadow: '0 20px 40px rgba(0,0,0,0.4)',
          border: '1px solid rgba(255,255,255,0.1)'
        }}
      >
        <Box sx={{ p: { xs: 4, md: 6 }, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Typography component="h1" variant="h4" fontWeight="900" gutterBottom color="#1a1a2e" sx={{ letterSpacing: -0.5 }}>
            Welcome Back
          </Typography>
          <Typography variant="body1" color="textSecondary" align="center" sx={{ mb: 4 }}>
            Enter your credentials to access your dashboard.
          </Typography>
          
          <Box component="form" noValidate onSubmit={handleLogin} sx={{ width: '100%' }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <EmailIcon sx={{ color: '#2e7d32' }} />
                  </InputAdornment>
                ),
              }}
              sx={{ 
                '& .MuiOutlinedInput-root': {
                  borderRadius: 3,
                  backgroundColor: 'rgba(255, 255, 255, 0.3)',
                  '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.4)' },
                  '&:hover fieldset': { borderColor: '#2e7d32' },
                  '&.Mui-focused': { backgroundColor: 'rgba(255, 255, 255, 0.2)' },
                  '&.Mui-focused fieldset': { borderColor: '#2e7d32' },
                }
              }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type={showPassword ? 'text' : 'password'}
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockOutlinedIcon sx={{ color: '#2e7d32' }} />
                  </InputAdornment>
                ),
                endAdornment: (
                    <InputAdornment position="end">
                        <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                    </InputAdornment>
                )
              }}
              sx={{ 
                '& .MuiOutlinedInput-root': {
                  borderRadius: 3,
                  backgroundColor: 'rgba(255, 255, 255, 0.3)',
                  '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.6)' },
                  '&:hover fieldset': { borderColor: '#2e7d32' },
                  '&.Mui-focused': { backgroundColor: 'rgba(255, 255, 255, 0.4)' },
                  '&.Mui-focused fieldset': { borderColor: '#2e7d32' },
                }
              }}
            />
            
            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={loading}
              sx={{ 
                mt: 4, 
                mb: 3, 
                py: 2, 
                bgcolor: '#2e7d32',
                fontSize: '1rem', 
                fontWeight: '800',
                borderRadius: 3,
                textTransform: 'none',
                boxShadow: '0 10px 20px -10px rgba(46, 125, 50, 0.5)',
                '&:hover': { bgcolor: '#1b5e20', boxShadow: '0 12px 24px -10px rgba(46, 125, 50, 0.6)' }
              }}
            >
              {loading ? <CircularProgress size={24} color="inherit" /> : 'Continue to Dashboard'}
            </Button>

            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <Divider sx={{ flex: 1 }} />
                <Typography variant="body2" sx={{ px: 2, color: 'text.secondary' }}>OR</Typography>
                <Divider sx={{ flex: 1 }} />
            </Box>

            <Button
              fullWidth
              variant="outlined"
              startIcon={<GoogleIcon />}
              onClick={() => handleSocialLogin(googleProvider)}
              sx={{ 
                py: 1.5, 
                mb: 4, 
                color: '#444', 
                borderColor: '#e0e0e0',
                borderRadius: 3,
                textTransform: 'none',
                fontWeight: '600',
                '&:hover': { borderColor: '#2e7d32', bgcolor: '#f1f8e9' }
              }}
            >
              Sign in with Google
            </Button>

            <Typography variant="body2" align="center" color="textSecondary">
              Don't have an account?{" "}
              <MuiLink component={Link} to="/signup" sx={{ color: '#2e7d32', fontWeight: '800', textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>
                Free Sign Up
              </MuiLink>
            </Typography>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
}
