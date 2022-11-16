import React from 'react';
import { useSelector } from 'react-redux';
import { StudentForm,SingleStudentMini } from '../components';
import { componentStyle1 } from '../../public/globalStyles';

const pageContainer = {
    display:'flex',
    flexDirection:'column',
};

const pageTitle = {
    textAlign:'center',
    fontSize:'35px',
    paddingBottom:'40px'
};

const studentAndFormContainer = {
    display:'flex',
    justifyContent:'space-between'
};

const studentsContainer = {
    display:'flex',
    gap:'10px',
    width:'75%',
    flexWrap:'wrap',
};

const formContainer = {
    width:'25%'
}

const AllStudentsPage = () => {
    const {studentList,loading} = useSelector((state) => state.students);

    return (
        <div style={componentStyle1}>
            <div style={pageContainer}>
                <h1 style={pageTitle}>Student directory</h1>
                <div style={studentAndFormContainer}>
                    <div style={studentsContainer}>
                        {
                            studentList.map(student => (
                                        <SingleStudentMini key={student.id} student={student} />
                                        )
                            )
                        }
                    </div>
                    <div style={formContainer}>
                        <p style={{fontSize:'20px',marginBottom:'10px'}}>Add a new student</p>
                        <StudentForm />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AllStudentsPage;