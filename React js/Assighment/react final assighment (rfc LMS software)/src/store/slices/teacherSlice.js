import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  teachers: [],
  currentTeacher: null,
  loading: false,
  error: null,
};

const teacherSlice = createSlice({
  name: 'teacher',
  initialState,
  reducers: {
    setTeachers: (state, action) => {
      state.teachers = action.payload;
    },
    addTeacher: (state, action) => {
      state.teachers.push(action.payload);
    },
    updateTeacher: (state, action) => {
      const index = state.teachers.findIndex(t => t.id === action.payload.id);
      if (index !== -1) {
        state.teachers[index] = action.payload;
      }
    },
    deleteTeacher: (state, action) => {
      state.teachers = state.teachers.filter(t => t.id !== action.payload);
    },
    setCurrentTeacher: (state, action) => {
      state.currentTeacher = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const {
  setTeachers,
  addTeacher,
  updateTeacher,
  deleteTeacher,
  setCurrentTeacher,
  setLoading,
  setError,
} = teacherSlice.actions;

export default teacherSlice.reducer;
