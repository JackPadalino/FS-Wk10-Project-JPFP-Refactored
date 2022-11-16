import axios from 'axios';
import React, { useState,useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setStudentList,addStudent,setLoading } from '../store/studentSlice';

import {
    Button,
    TextField,
    InputLabel,
    Select,
    MenuItem,
    FormControl
} from '@mui/material';

const formStyle =  {
    display: 'flex',
    flexDirection: "column",
    gap:'10px'
};

const StudentForm = () => {
    const dispatch = useDispatch();
    const {campusList} = useSelector((state) => state.campuses);

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    //const [gpa, setGpa] = useState(0.0);
    //const [imageURL, setImageURL] = useState("https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg");
    const [campusId,setCampusId] = useState('');
    const [errorMessage,setErrorMessage] = useState(false);
    const [body,setBody] = useState({});

    const handleFirstNameChange = (event) => {
        setFirstName(event.target.value);
    };

    const handleLastNameChange = (event) => {
        setLastName(event.target.value);
    };

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handleCampusSelector = (event) => {
        setCampusId(event.target.value);
    };

    // const handleGpaChange = (event) => {
    //     setGpa(event.target.value);
    // };

    // const handleImgChange = (event) => {
    //     setImageURL(event.target.value);
    // };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if(firstName==='' || lastName==='' || email==='') return setErrorMessage(true);
        //dispatch(setLoading(true));
        const body = {
            firstName,
            lastName,
            email,
            // If campus ID is empty make it null, otherwise use it
            campusId: campusId === '' ? null : campusId
        };
        await axios.post('/api/students', body);
        const students = await axios.get('/api/students');
        dispatch(setStudentList(students.data));
        //dispatch(setLoading(false));
        setErrorMessage(false);
    };

    return (
        <div>
            <form onSubmit={handleSubmit} style={formStyle}>
                <TextField label="First name" variant="outlined" value={firstName} onChange={handleFirstNameChange} />
                <TextField label="Last name" variant="outlined" value={lastName} onChange={handleLastNameChange}/>
                <TextField label="email" variant="outlined" value={email} onChange={handleEmailChange}/>
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Campus</InputLabel>
                    <Select
                        value={campusId}
                        label="Campus"
                        onChange={handleCampusSelector}
                    >
                        {
                        campusList.map((campus)=>{
                            return <MenuItem key={campus.id} value={campus.id}>{campus.name}</MenuItem>
                        })
                        }
                    </Select>
                </FormControl>
                <Button variant="outlined" type='submit'>Submit</Button>
            </form>
            {errorMessage && <p style={{color:'red',marginTop:'10px'}}>Please enter valid student information before submitting!</p>}
        </div>
    );
};

export default StudentForm;