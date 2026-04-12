import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { createUserWithEmailAndPassword, updateProfile, signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../config/firebase";
import { toast } from "react-toastify";
import { getRoleFromEmail } from "../utils/roleCheck";
import { branchManagerService } from "../utils/branchManagerService";
import { userProfileService } from "../utils/userProfileService";
import GoogleIcon from "@mui/icons-material/Google";
import EmailIcon from "@mui/icons-material/Email";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import PersonIcon from "@mui/icons-material/Person";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import StoreIcon from '@mui/icons-material/Store';
import GroupsIcon from '@mui/icons-material/Groups';
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
  Divider,
  Checkbox,
  FormControlLabel,
  MenuItem
} from "@mui/material";

export default function Signup() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreeTerms: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    if (!formData.firstName || !formData.lastName || !formData.email || !formData.password || !formData.confirmPassword) {
      toast.error("Please fill in all fields");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    if (formData.password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    if (!formData.agreeTerms) {
      toast.error("Please agree to terms and conditions");
      return;
    }

    setLoading(true);
    try {
      const managerVerification = await branchManagerService.verifyManagerCredentials(formData.email, formData.password);
      const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
      const uid = userCredential.user.uid;

      await updateProfile(userCredential.user, {
        displayName: `${formData.firstName} ${formData.lastName}`,
      });

      if (managerVerification.success) {
        await userProfileService.createManagerProfile(uid, {
          email: formData.email,
          name: `${formData.firstName} ${formData.lastName}`,
          managerId: managerVerification.manager.id
        });
        
        localStorage.setItem("userRole", "branch_manager");
        localStorage.setItem("userEmail", formData.email);
        localStorage.setItem("userUID", uid);
        localStorage.setItem("userName", `${formData.firstName} ${formData.lastName}`);
        toast.success("Welcome Branch Manager!");
        redirectByRole("branch_manager");
      } else {
        toast.success("Account created successfully!");
        const role = getRoleFromEmail(formData.email);
        localStorage.setItem("userRole", role);
        localStorage.setItem("userEmail", formData.email);
        localStorage.setItem("userUID", uid);
        localStorage.setItem("userName", `${formData.firstName} ${formData.lastName}`);
        redirectByRole(role);
      }
    } catch (error) {
      toast.error(error.message);
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

  const handleSocialSignup = async (provider) => {
    setLoading(true);
    try {
      const result = await signInWithPopup(auth, provider);
      toast.success("Account created successfully!");
      const role = getRoleFromEmail(result.user.email);
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
      py: { xs: 4, md: 8 },
      px: 2
    }}>
      <Paper 
        elevation={24} 
        sx={{ 
          position: 'relative', 
          zIndex: 2, 
          width: '100%', 
          maxWidth: 550, 
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
            Enlist in the Network
          </Typography>
          <Typography variant="body1" color="textSecondary" align="center" sx={{ mb: 4 }}>
            Create your professional profile today.
          </Typography>
          
          <Box component="form" noValidate onSubmit={handleSignup} sx={{ width: '100%' }}>
            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <TextField
                    fullWidth
                    label="First Name"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
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
                </Grid>
                <Grid item xs={6}>
                    <TextField
                    fullWidth
                    label="Last Name"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
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
                </Grid>
            </Grid>

            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              value={formData.email}
              onChange={handleChange}
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
                  '&:hover fieldset': { borderColor: '#2e7d32' },
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
                value={formData.password}
                onChange={handleChange}
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
                      '&:hover fieldset': { borderColor: '#2e7d32' },
                      '&.Mui-focused fieldset': { borderColor: '#2e7d32' },
                    } 
                }}
            />

            <TextField
                margin="normal"
                required
                fullWidth
                name="confirmPassword"
                label="Confirm Password"
                type="password"
                id="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                sx={{ 
                    '& .MuiOutlinedInput-root': { 
                      borderRadius: 3,
                      '&:hover fieldset': { borderColor: '#2e7d32' },
                      '&.Mui-focused fieldset': { borderColor: '#2e7d32' },
                    } 
                }}
            />

            <FormControlLabel
                control={
                    <Checkbox 
                        name="agreeTerms" 
                        checked={formData.agreeTerms} 
                        onChange={handleChange} 
                        color="primary" 
                        sx={{ color: '#2e7d32', '&.Mui-checked': { color: '#2e7d32' } }}
                    />
                }
                label={
                    <Typography variant="body2">
                        I agree to the <MuiLink href="#">Terms</MuiLink> and <MuiLink href="#">Privacy Policy</MuiLink>
                    </Typography>
                }
                sx={{ mt: 1, mb: 1 }}
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
              {loading ? <CircularProgress size={24} color="inherit" /> : 'Create Account'}
            </Button>

            <Button
              fullWidth
              variant="outlined"
              startIcon={<GoogleIcon />}
              onClick={() => handleSocialSignup(googleProvider)}
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
              Sign up with Google
            </Button>

            <Typography variant="body2" align="center" color="textSecondary">
              Already a member?{" "}
              <MuiLink component={Link} to="/login" sx={{ color: '#2e7d32', fontWeight: '800', textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>
                Sign In
              </MuiLink>
            </Typography>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
}
