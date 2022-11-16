import axios from 'axios';
import React, { useState,useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { setStudent,setLoading,resetSelectedStudent } from '../store/selectedStudentSlice';
import { componentStyle1 } from '../../public/globalStyles';

// all components
import { UpdateStudentForm } from '../components';

// pages
import { LoadingPage,NotFoundPage } from './'

const mainPageContainer = {
    display:'flex',
    flexDirection:'column',
    gap:'50px'
};

const imgInfoContainer = {
    display:'flex',
    gap:'50px',
};

const imgContainer = {
    width:'400px',
    height:'300px',
};

const imgStyle = {
    width:'100%',
    height:'100%'
};

const studentInfoContainer = {
    width:'fit-content',
};

const formContainer = {
    width:'40%',
};

const SingleStudentPage = () => {
    const {student,loading} = useSelector((state)=>state.selectedStudent);
    const [studentDoesNotExist, setStudentDoesNotExist] = useState(false);
    const dispatch = useDispatch();
    const { id } = useParams();

    const fetchData = async () => {
        try{
            dispatch(setLoading(true));
            const response = await axios.get(`/api/students/${id}`);
            dispatch(setStudent(response.data));
            dispatch(setLoading(false));
        }catch(error){
            dispatch(setLoading(false));
			setStudentDoesNotExist(true);
        };
    };

    useEffect(() => {
        fetchData();
        return () => {
            dispatch(resetSelectedStudent());
        }
    }, []);

    console.log

    if(loading) return (
        <LoadingPage />
    );
    //if(!Object.keys(student).length) return <p>Looks like there isn't anything here yet!</p>;
    if(studentDoesNotExist || !Object.keys(student).length) return (
        <NotFoundPage />
    );
    return (
        <div style={componentStyle1}>
            <div style={mainPageContainer}>
                <div style={imgInfoContainer}>
                    <div style={imgContainer}>
                        <img style={imgStyle} src={student.imageURL}/>
                    </div>
                    <div style={studentInfoContainer}>
                        <h1>{student.firstName} {student.lastName}</h1>
                        <ul>
                            {student.campusId && <li><b>Attending:</b> <Link to={`/campuses/${student.campusId}`}>{student.campus.name}</Link></li>}
                            <li><b>GPA:</b> {student.gpa}</li>
                            <li><b>Email:</b> {student.email}</li>
                        </ul>
                    </div>
                </div>
                <div style={formContainer}>
                    <UpdateStudentForm student={student}/>
                </div>
            </div> 
        </div>
    );
};

export default SingleStudentPage;