import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile, signOut } from "firebase/auth";
import { auth } from "../../config/firebase";
import { branchManagerService } from "../../utils/branchManagerService";

// Async thunk for login
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      // Check if it's a branch manager
      const managerVerification = await branchManagerService.verifyManagerCredentials(email, password);
      
      if (managerVerification.success) {
        return {
          uid: managerVerification.manager.id,
          email: managerVerification.manager.email,
          name: managerVerification.manager.name,
          role: "branch_manager",
          isManager: true,
        };
      }

      // Try regular Firebase auth
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      
      let role = "user";
      if (email.includes("admin@")) role = "admin";
      else if (email.includes("manager@")) role = "branch_manager";

      return {
        uid: user.uid,
        email: user.email,
        name: user.displayName || "User",
        role: role,
        isManager: false,
      };
    } catch (error) {
      return rejectWithValue(error.message || "Login failed");
    }
  }
);

// Async thunk for signup
export const signupUser = createAsyncThunk(
  "auth/signupUser",
  async ({ email, password, firstName, lastName }, { rejectWithValue }) => {
    try {
      // Check if manager credentials
      const managerVerification = await branchManagerService.verifyManagerCredentials(email, password);
      
      if (managerVerification.success) {
        return {
          uid: managerVerification.manager.id,
          email: managerVerification.manager.email,
          name: managerVerification.manager.name,
          role: "branch_manager",
          isManager: true,
        };
      }

      // Create new user
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await updateProfile(user, {
        displayName: `${firstName} ${lastName}`,
      });

      let role = "user";
      if (email.includes("admin@")) role = "admin";
      else if (email.includes("manager@")) role = "branch_manager";

      return {
        uid: user.uid,
        email: user.email,
        name: user.displayName,
        role: role,
        isManager: false,
      };
    } catch (error) {
      return rejectWithValue(error.message || "Signup failed");
    }
  }
);

// Async thunk for logout
export const logoutUser = createAsyncThunk(
  "auth/logoutUser",
  async (_, { rejectWithValue }) => {
    try {
      await signOut(auth);
      return null;
    } catch (error) {
      return rejectWithValue(error.message || "Logout failed");
    }
  }
);

const initialState = {
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Login
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.isAuthenticated = false;
      });

    // Signup
    builder
      .addCase(signupUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.isAuthenticated = false;
      });

    // Logout
    builder
      .addCase(logoutUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.loading = false;
        state.user = null;
        state.isAuthenticated = false;
        state.error = null;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError } = authSlice.actions;
export default authSlice.reducer;
