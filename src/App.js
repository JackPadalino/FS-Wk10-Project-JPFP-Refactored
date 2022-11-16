import axios from 'axios';
import React, { useState,useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setStudentList } from './store/studentSlice';
import { setCampusList } from './store/campusSlice';
import { Link, Routes, Route } from 'react-router-dom';
import { componentStyle1 } from '../public/globalStyles';

// single components
import {
    Navbar
} from './components';

// pages
import {
    HomePage,
    AllStudentsPage,
    AllCampusesPage,
    SingleStudentPage,
    SingleCampusPage,
    NotFoundPage
} from './pages'

/**
 * This is the entry point for all of our react stuff
 */
const App = () => {
    const [appLoading,setAppLoading] = useState(false);
    const dispatch = useDispatch();

    const fetchStudents = async () => {
        setAppLoading(true);
        const students = await axios.get("/api/students");
        dispatch(setStudentList(students.data));
        setAppLoading(false);
    };

    const fetchCampuses = async () => {
        setAppLoading(true);
        const campuses = await axios.get("/api/campuses");
        dispatch(setCampusList(campuses.data));
        setAppLoading(false);
    };

    // fetching all students and all campuses when app component is rendered
    useEffect(() => {
        fetchStudents();
        fetchCampuses();
    }, []);

    if(appLoading) return (
        <div style={componentStyle1}>
            <p>Loading...</p>
        </div>
    );
    return (
        <div>
            <Navbar />
            <div id='appContainer'>
                <Routes>
                    <Route exact path="/students/:id" element={<SingleStudentPage />} />
                    <Route exact path="/students" element={<AllStudentsPage />} />
                    <Route exact path="/campuses/:id" element={<SingleCampusPage />} />
                    <Route exact path="/campuses" element={<AllCampusesPage />} />
                    <Route exact path="/" element={<HomePage />} />
                    <Route exact path='/*' element={<NotFoundPage />} />
                </Routes>
            </div>
        </div>
    );
};

export default App;