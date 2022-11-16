const {createSlice}  = require('@reduxjs/toolkit');

const initialState = {
    campusList:[],
    loading:false
};

export const campusSlice = createSlice({
    name:'campuses',
    initialState,
    reducers:{
        setCampusList:(state,action)=>{
            state.campusList = action.payload;
        },
        addCampus: (state, action) => {
            state.campusList.push(action.payload);
        },
        setLoading:(state,action)=>{
            state.loading = action.payload;
        },
        deleteCampus:(state,action)=>{
            const toDeleteCampusId = action.payload.id;
            state.campusList = state.campusList.filter(
                (campus)=>campus.id !== toDeleteCampusId
            );
        }
    }
});

export const { setCampusList,addCampus,setLoading,deleteCampus } = campusSlice.actions;
export default campusSlice.reducer;