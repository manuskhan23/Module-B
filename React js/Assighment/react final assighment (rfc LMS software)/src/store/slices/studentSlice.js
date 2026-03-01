import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  students: [],
  currentStudent: null,
  loading: false,
  error: null,
};

const studentSlice = createSlice({
  name: 'student',
  initialState,
  reducers: {
    setStudents: (state, action) => {
      state.students = action.payload;
    },
    addStudent: (state, action) => {
      state.students.push(action.payload);
    },
    updateStudent: (state, action) => {
      const index = state.students.findIndex(s => s.id === action.payload.id);
      if (index !== -1) {
        state.students[index] = action.payload;
      }
    },
    deleteStudent: (state, action) => {
      state.students = state.students.filter(s => s.id !== action.payload);
    },
    setCurrentStudent: (state, action) => {
      state.currentStudent = action.payload;
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
  setStudents,
  addStudent,
  updateStudent,
  deleteStudent,
  setCurrentStudent,
  setLoading,
  setError,
} = studentSlice.actions;

export default studentSlice.reducer;
