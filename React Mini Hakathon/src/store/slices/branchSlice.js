import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { branchService } from "../../utils/branchService";

// Fetch all branches
export const fetchBranches = createAsyncThunk(
  "branch/fetchBranches",
  async (_, { rejectWithValue }) => {
    try {
      const branches = await branchService.getAllBranches();
      return branches;
    } catch (error) {
      return rejectWithValue(error.message || "Failed to fetch branches");
    }
  }
);

// Add branch
export const addBranch = createAsyncThunk(
  "branch/addBranch",
  async (branchData, { rejectWithValue }) => {
    try {
      const newBranch = await branchService.addBranch(branchData);
      return newBranch;
    } catch (error) {
      return rejectWithValue(error.message || "Failed to add branch");
    }
  }
);

// Update branch
export const updateBranch = createAsyncThunk(
  "branch/updateBranch",
  async ({ branchId, branchData }, { rejectWithValue }) => {
    try {
      const updated = await branchService.updateBranch(branchId, branchData);
      return updated;
    } catch (error) {
      return rejectWithValue(error.message || "Failed to update branch");
    }
  }
);

// Delete branch
export const deleteBranch = createAsyncThunk(
  "branch/deleteBranch",
  async (branchId, { rejectWithValue }) => {
    try {
      await branchService.deleteBranch(branchId);
      return branchId;
    } catch (error) {
      return rejectWithValue(error.message || "Failed to delete branch");
    }
  }
);

const initialState = {
  branches: [],
  loading: false,
  error: null,
};

const branchSlice = createSlice({
  name: "branch",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Fetch branches
    builder
      .addCase(fetchBranches.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBranches.fulfilled, (state, action) => {
        state.loading = false;
        state.branches = action.payload;
      })
      .addCase(fetchBranches.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Add branch
    builder
      .addCase(addBranch.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addBranch.fulfilled, (state, action) => {
        state.loading = false;
        state.branches.push(action.payload);
      })
      .addCase(addBranch.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Update branch
    builder
      .addCase(updateBranch.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateBranch.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.branches.findIndex((b) => b.id === action.payload.id);
        if (index !== -1) {
          state.branches[index] = action.payload;
        }
      })
      .addCase(updateBranch.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Delete branch
    builder
      .addCase(deleteBranch.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteBranch.fulfilled, (state, action) => {
        state.loading = false;
        state.branches = state.branches.filter((b) => b.id !== action.payload);
      })
      .addCase(deleteBranch.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError } = branchSlice.actions;
export default branchSlice.reducer;
