// studentSlice.ts (or .js if not using TypeScript)
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface StudentState {
  studentname: string;
  name: string;
  type: string;
}

const initialState: StudentState = {
  studentname: '',
  name: '',
  type: ''
};

const studentSlice = createSlice({
  name: 'student',
  initialState,
  reducers: {
    saveStudentName: (state, action: PayloadAction<{ studentname: string; name: string; type: string }>) => {
      Object.assign(state, action.payload);
    },
    clearStudentName: (state) => {
      state.studentname = '';
      state.name = '';
      state.type = '';
    },
    resetStudent: (state) => {
      state.studentname = '';
      state.name = '';
      state.type = '';
    }
  }
});

export const { saveStudentName, clearStudentName, resetStudent } = studentSlice.actions;
export default studentSlice.reducer;


// // To save
// dispatch(saveStudentName({ studentname: 'John', name: 'John Doe', type: 'Full-Time' }));

// // To clear
// dispatch(clearStudentName());

// // To reset
// dispatch(resetStudent());