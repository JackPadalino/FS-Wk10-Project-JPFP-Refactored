import axios from 'axios';
import React, { useState,useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { setStudentList } from '../store/studentSlice';
import { setCampusList } from '../store/campusSlice';
import { setCampus,setLoading,resetSelectedCampus,updateSelectedCampus } from '../store/selectedCampusSlice';
import { Link } from 'react-router-dom';
import { componentStyle2 } from '../../public/globalStyles';

// app components
import { UpdateCampusForm,CampusInfo } from '../components';

// pages
import { LoadingPage,NotFoundPage } from './'

const mainPageContainer = {
    display:'flex',
    padding:'30px',
    gap:'50px',
    flexDirection:'column'
};

const campusInfo = {
    display:'flex',
    justifyContent:'space-between'
};

const campusInfoLeft = {
    width:'40%'
};

const campusInfoRight = {
    width:'60%'
};

const studentInfoUpdateForm = {
    display:'flex',
    justifyContent:'space-between'
};

const studentDirectory = {
    width:'40%'
};

const updateCampusForm = {
    width:'60%'
};

const studentDiv1 = {
    display:'flex',
    alignItems:'center',
    gap:'10px'
};

const imgStyle = {
    width:'100%',
    height:'100%',
};

const SingleCampusPage = () => {
    const {campus,loading} = useSelector((state)=>state.selectedCampus);
    const [campusDoesNotExist, setCampusDoesNotExist] = useState(false);
    const dispatch = useDispatch();
    const { id } = useParams();

    const handleUnregisterStudent = async(studentId)=>{
        try{
            /* 
            The way this is working is we're awaiting the inital update because every piece of data 
            below depends on the data being updated, but once that data is updated we can make our 
            getter API calls separately because none of them need the others to complete before being 
            able to get what they need - so this allows them all to start at the same time while 
            individually running the code in their .then blocks as they return with their data. It's a 
            small performance improvment that'll add up over time 
            */
           // Unregister the student
            const body = {
                campusId:null
            };
            await axios.put(`/api/students/${studentId}`, { campusId: null });
            // Update selected campus
            axios.get(`/api/campuses/${campus.id}`)
                .then(newCampusInfo => dispatch(updateSelectedCampus(newCampusInfo.data)));
            // Update all campuses
            axios.get(`/api/campuses`)
                .then(campuses => dispatch(setCampusList(campuses.data)));
            // Update all students
            axios.get(`/api/students`)
                .then(students => dispatch(setStudentList(students.data)));
        
            /* 
            Old code with lots of separate await API calls
            dispatch(setLoading(true));
            const body = {
                campusId:null
            };
            await axios.put(`/api/students/${studentId}`,body);
            const newCampusInfo = await axios.get(`/api/campuses/${campus.id}`); // update the selected campus on the page
            dispatch(updateSelectedCampus(newCampusInfo.data));
            const campuses = await axios.get('/api/campuses'); // updated the list of all campuses on the front end
            dispatch(setCampusList(campuses.data));
            const students = await axios.get('/api/students'); // updated the list of all students on the front end
            dispatch(setStudentList(students.data));
            dispatch(setLoading(false));
            */
            
        }catch(error){
            console.log(error); // consider adding some piece of state to communicate to the user that the update failed!
        };
    };   

    const fetchData = async () => {
        try{
            dispatch(setLoading(true));
            const response = await axios.get(`/api/campuses/${id}`);
            dispatch(setCampus(response.data));
            dispatch(setLoading(false));
        }catch(error){
            dispatch(setLoading(false));
            setCampusDoesNotExist(true);
        };
    };

    useEffect(() => {
        fetchData();
        return () => {
            dispatch(resetSelectedCampus());
        }
    },[]);

    if(loading) return (
        <LoadingPage />
    );
    // still not sure why I need !Object.keys(campus).length here. My error handler
    // is supposed to be catching whether or not a campus object exists
    if(campusDoesNotExist || !Object.keys(campus).length) return (
        <NotFoundPage />
    );
    return (
        <div style={componentStyle2}>
            <img style={imgStyle}src={campus.imageURL}/>
            <div style={mainPageContainer}>
                <div style={campusInfo}>
                    <div style={campusInfoLeft}>
                        <h1>{campus.name}</h1>
                        <p>{campus.address}</p>
                        <p>{campus.state}</p>
                    </div>
                    <div style={campusInfoRight}>
                        <CampusInfo campus={campus} />
                    </div>
                </div>
                <div style={studentInfoUpdateForm}>
                    <div style={studentDirectory}>
                        <h1 style={{marginBottom:'10px'}}>Meet out students</h1>
                        {
                            campus.students.map(student=>{
                                return (
                                    <div key={student.id} style={studentDiv1}>
                                        <Link to={`/students/${student.id}`}><p style={{fontSize:'25px'}}>{student.firstName} {student.lastName}</p></Link>
                                        <button style={{height:'15px',width:'15px',textAlign:'center',fontSize:'10px',padding:'0px'}} onClick={()=>handleUnregisterStudent(student.id)}>x</button>
                                    </div>
                                )
                            })
                        }
                    </div>
                    <div style={updateCampusForm}>
                        <h1 style={{marginBottom:'10px'}}>Update campus info.</h1>
                        <UpdateCampusForm campus={campus} />
                    </div>
                </div>
            </div>
        </div>
    );
;}

export default SingleCampusPage;