import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    campus: {},
    loading: false
};

export const selectedCampusSlice = createSlice({
    name: "selectedCampus",
    initialState,
    reducers: {
        setCampus: (state, action) => {
            state.campus = action.payload;
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        // update the campus's information
        updateSelectedCampus: (state, action) => {
            const updatedCampusInfo = action.payload;
            const oldCampusInfo = state.campus;

            state.campus = {
                ...oldCampusInfo,
                ...updatedCampusInfo
            };
        },
        resetSelectedCampus: (state) => {
            state.campus = initialState.campus;
            state.loading = initialState.loading;
        }
    }
});

export const { setCampus, setLoading, updateSelectedCampus, resetSelectedCampus } = selectedCampusSlice.actions;
export default selectedCampusSlice.reducer;