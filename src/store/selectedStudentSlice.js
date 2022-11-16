import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    student: {},
    loading: false
};

export const selectedStudentSlice = createSlice({
    name: "selectedStudent",
    initialState,
    reducers: {
        setStudent: (state, action) => {
            state.student = action.payload;
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        // update the student's information
        updateSelectedStudent: (state, action) => {
            const updatedStudentInfo = action.payload;
            const oldStudentInfo = state.student;

            state.student = {
                ...oldStudentInfo,
                ...updatedStudentInfo
            };
        },
        resetSelectedStudent: (state) => {
            state.student = initialState.student;
            state.loading = initialState.loading;
        }
    }
});

export const { setStudent, setLoading, updateSelectedStudent, resetSelectedStudent } = selectedStudentSlice.actions;
export default selectedStudentSlice.reducer;