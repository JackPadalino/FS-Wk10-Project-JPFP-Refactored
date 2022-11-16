const {createSlice}  = require('@reduxjs/toolkit');

const initialState = {
    studentList:[],
    loading:false
};

export const studentSlice = createSlice({
    name:'students',
    initialState,
    reducers:{
        setStudentList:(state,action)=>{
            state.studentList = action.payload;
        },
        addStudent: (state, action) => {
            state.studentList.push(action.payload);
        },
        setLoading:(state,action)=>{
            state.loading = action.payload;
        },
        deleteStudent:(state,action)=>{
            const toDeleteStudentId = action.payload.id;
            state.studentList = state.studentList.filter(
                (student)=>student.id !== toDeleteStudentId
            );
        }
    }
});

export const { setStudentList,addStudent,setLoading,deleteStudent } = studentSlice.actions;
export default studentSlice.reducer;