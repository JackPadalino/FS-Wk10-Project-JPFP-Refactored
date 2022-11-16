import { configureStore } from "@reduxjs/toolkit";
import studentReducer from './studentSlice';
import campusReducer from './campusSlice';
import selectedStudentReducer from './selectedStudentSlice';
import selectedCampusReducer from "./selectedCampusSlice";

const store = configureStore({
  reducer: {
    students:studentReducer,
    campuses:campusReducer,
    selectedStudent:selectedStudentReducer,
    selectedCampus:selectedCampusReducer,
  }
});

export default store;