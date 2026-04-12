import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { branchManagerService } from "../../utils/branchManagerService";

// Fetch all managers
export const fetchManagers = createAsyncThunk(
  "branchManager/fetchManagers",
  async (_, { rejectWithValue }) => {
    try {
      const managers = await branchManagerService.getAllManagers();
      return managers;
    } catch (error) {
      return rejectWithValue(error.message || "Failed to fetch managers");
    }
  }
);

// Add manager
export const addManager = createAsyncThunk(
  "branchManager/addManager",
  async (managerData, { rejectWithValue }) => {
    try {
      const newManager = await branchManagerService.addManager(managerData);
      return newManager;
    } catch (error) {
      return rejectWithValue(error.message || "Failed to add manager");
    }
  }
);

// Update manager
export const updateManager = createAsyncThunk(
  "branchManager/updateManager",
  async ({ managerId, managerData }, { rejectWithValue }) => {
    try {
      const updated = await branchManagerService.updateManager(managerId, managerData);
      return updated;
    } catch (error) {
      return rejectWithValue(error.message || "Failed to update manager");
    }
  }
);

// Delete manager
export const deleteManager = createAsyncThunk(
  "branchManager/deleteManager",
  async (managerId, { rejectWithValue }) => {
    try {
      await branchManagerService.deleteManager(managerId);
      return managerId;
    } catch (error) {
      return rejectWithValue(error.message || "Failed to delete manager");
    }
  }
);

const initialState = {
  managers: [],
  loading: false,
  error: null,
};

const branchManagerSlice = createSlice({
  name: "branchManager",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Fetch managers
    builder
      .addCase(fetchManagers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchManagers.fulfilled, (state, action) => {
        state.loading = false;
        state.managers = action.payload;
      })
      .addCase(fetchManagers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Add manager
    builder
      .addCase(addManager.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addManager.fulfilled, (state, action) => {
        state.loading = false;
        state.managers.push(action.payload);
      })
      .addCase(addManager.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Update manager
    builder
      .addCase(updateManager.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateManager.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.managers.findIndex((m) => m.id === action.payload.id);
        if (index !== -1) {
          state.managers[index] = action.payload;
        }
      })
      .addCase(updateManager.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Delete manager
    builder
      .addCase(deleteManager.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteManager.fulfilled, (state, action) => {
        state.loading = false;
        state.managers = state.managers.filter((m) => m.id !== action.payload);
      })
      .addCase(deleteManager.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError } = branchManagerSlice.actions;
export default branchManagerSlice.reducer;
