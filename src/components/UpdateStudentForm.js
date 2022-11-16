import axios from 'axios';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading,updateSelectedStudent } from '../store/selectedStudentSlice';
import { setCampusList } from '../store/campusSlice';
import { setStudentList } from '../store/studentSlice';

// MUI components
import {
    Box,
    Button,
    TextField,
    TextareaAutosize,
    FormControl,
    InputLabel,
    Select,
    MenuItem
} from '@mui/material';

const formStyle = {
    display:'flex',
    flexDirection:'column',
    gap:'5px'
};

const UpdateStudentForm = ({student}) => {
    const {campusList} = useSelector((state) => state.campuses);

    const [firstName, setFirstName] = useState(student.firstName);
    const [lastName, setLastName] = useState(student.lastName);
    const [email, setEmail] = useState(student.email);
    const [gpa, setGpa] = useState(student.gpa);
    const [imageURL, setImageURL] = useState(student.imageURL);
    const [campusId,setCampusId] = useState(student.campusId);
    const [errorMessage,setErrorMessage] = useState(false);

    const dispatch = useDispatch();

    const handleFirstNameChange = (event) => {
        setFirstName(event.target.value);
    };

    const handleLastNameChange = (event) => {
        setLastName(event.target.value);
    };

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handleCampusSelector = async(event) => {
        setCampusId(event.target.value);
    };

    const handleGpaChange = (event) => {
        setGpa(event.target.value);
    };

    const handleImgChange = (event) => {
        setImageURL(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        let body = {};
        if(firstName==='' || lastName==='' || email==='') return setErrorMessage(true);
        body = {
            firstName,
            lastName,
            email,
            campusId,
            imageURL,
            gpa
        };
        //dispatch(setLoading(true));
        await axios.put(`/api/students/${student.id}`, body); // here we are updating the selected student with the information from the form
        const newStudentInfo = await axios.get(`/api/students/${student.id}`); // getting the updated 'selected student' data
        dispatch(updateSelectedStudent(newStudentInfo.data));
        const campuses = await axios.get('/api/campuses'); // getting the updated 'all campuses' data
        dispatch(setCampusList(campuses.data));
        const students = await axios.get('/api/students'); // getting the updated 'all student' data
        dispatch(setStudentList(students.data));
        //dispatch(setLoading(false));
        setErrorMessage(false);
    };

    return (
        <Box>
            <form onSubmit={handleSubmit} style={formStyle}>
                <div style={{display:'flex',gap:'5px'}}>
                    <TextField style={{width:'50%'}} label="First name" variant="outlined" value={firstName} onChange={handleFirstNameChange} />
                    <TextField style={{width:'50%'}} label="Last name" variant="outlined" value={lastName} onChange={handleLastNameChange}/>
                </div>
                <div style={{display:'flex',gap:'5px'}}>
                    <TextField style={{width:'50%'}} label="email" variant="outlined" value={email} onChange={handleEmailChange} />
                    <TextField style={{width:'50%'}} label="GPA" variant="outlined" value={gpa} onChange={handleGpaChange}/>
                </div>
                <div style={{display:'flex',gap:'5px'}}>
                    <FormControl style={{width:'50%'}}>
                        <InputLabel id="demo-simple-select-label">Campus</InputLabel>
                        <Select
                            value={campusId}
                            label="Campus"
                            onChange={handleCampusSelector}
                        >
                            {
                            campusList.map((campus)=>{
                                return <MenuItem key={campus.id} value={campus.id} selected={campus.id===campusId}>{campus.name}</MenuItem>
                                // <option key={campus.id} value={campus.id} selected={campus.id===campusId}>{campus.name}</option>
                            })
                            }
                        </Select>
                    </FormControl>
                    <TextField style={{width:'50%'}} label="Image URL" variant="outlined" value={imageURL} onChange={handleImgChange}/>
                </div>
                <Button variant="outlined" type='submit'>Submit</Button>
            </form>
            {errorMessage && <p style={{color:'red',marginTop:'10px'}}>Please enter valid student information before submitting!</p>}
        </Box>

        /* This is the non-MUI component form - leaving here for reference */
        // <div style={formStyle}>
        //     <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: "column" }}>
        //         <label>First Name:</label>
        //         <input type={"text"} value={firstName} onChange={handleFirstNameChange} />
        //         <label>Last Name:</label>
        //         <input type={"text"} value={lastName} onChange={handleLastNameChange} />
        //         <label>Email:</label>
        //         <input type={"text"} value={email} onChange={handleEmailChange} />
        //         <label>GPA:</label>
        //         <input type={"number"} value={gpa} onChange={handleGpaChange} />
        //         <label>Image URL:</label>
        //         <input type={"text"} value={imageURL} onChange={handleImgChange} />
        //         <label>Campus:</label>
        //         <select onChange={handleCampusSelector}>
        //             {
        //                 campusList.map((campus)=>{
        //                     return <option key={campus.id} value={campus.id} selected={campus.id===campusId}>{campus.name}</option>
        //                 }) // I wasn't able to pass the entire campus object as a value from the form --> had to make a whole API call on line 56 to get this!
        //             }
        //         </select>
        //         <button type='submit'>Submit</button>
        //     </form>
        // </div>
    );
};

export default UpdateStudentForm;