import axios from 'axios';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { setCampusList } from '../store/campusSlice';
import { setCampus,setLoading,updateSelectedCampus } from '../store/selectedCampusSlice';
import { statesArr } from '../../bin/states'

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

const formStyle =  {
    display: 'flex',
    flexDirection: "column",
    gap:'10px'
};

const UpdateCampusForm = ({campus}) =>{
    const [name, setName] = useState(campus.name);
    const [state, setState] = useState(campus.state);
    const [address, setAddress] = useState(campus.address);
    const [description, setDescription] = useState(campus.description);
    const [imageURL, setImageURL] = useState(campus.imageURL);
    const [errorMessage,setErrorMessage] = useState(false);

    const dispatch = useDispatch();

    const handleNameChange = (event) => {
        setName(event.target.value);
    };

    const handleStateChange = (event) => {
        setState(event.target.value);
    };

    const handleAddressChange = (event) => {
        setAddress(event.target.value);
    };

    const handleDescChange = (event) => {
        setDescription(event.target.value);
    };

    const handleImgChange = (event) => {
        setImageURL(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if(name==='' || state==='' || imageURL==='') return setErrorMessage(true);
        //dispatch(setLoading(true));
        const body = {
            name,
            state,
            address,
            description,
            imageURL
        };
        await axios.put(`/api/campuses/${campus.id}`, body); // here we are updating the selected student with the information from the form
        const newCampusInfo = await axios.get(`/api/campuses/${campus.id}`); // now we are getting the updated student information from API, including the new campus
        dispatch(updateSelectedCampus(newCampusInfo.data));
        const campuses = await axios.get('/api/campuses');
        dispatch(setCampusList(campuses.data));
        //dispatch(setLoading(false));
        setErrorMessage(false);
    };

    return (
        <Box>
                <form onSubmit={handleSubmit} style={formStyle}>
                    <div style={{display:'flex',gap:'5px'}}>
                        <TextField style={{width:'50%'}} label="Name" variant="outlined" value={name} onChange={handleNameChange} />
                        <TextField style={{width:'50%'}} label="Addresss" variant="outlined" value={address} onChange={handleAddressChange}/>
                    </div>
                    <div style={{display:'flex',gap:'5px'}}>
                        <FormControl style={{width:'50%'}}>
                            <InputLabel id="demo-simple-select-label">State</InputLabel>
                            <Select
                                value={state}
                                label="State"
                                onChange={handleStateChange}
                            >
                                {
                                statesArr.map((state)=>{
                                    return <MenuItem value={state}>{state}</MenuItem>
                                })
                                }
                            </Select>
                        </FormControl>
                        <TextField style={{width:'50%'}} label="ImageURL" variant="outlined" value={imageURL} onChange={handleImgChange}/>
                    </div>
                    <TextareaAutosize
                        onChange={handleDescChange}
                        minRows={10}
                        placeholder="What's it like?"
                        value={description}
                        style={{ width: 'auto' }}
                    />
                    <Button variant="outlined" type='submit'>Submit</Button>
                </form>
                {errorMessage && <p style={{color:'red',marginTop:'10px'}}>Please enter valid campus information before submitting!</p>}
        </Box>

        /* This is the non-MUI component form - leaving here for reference */
        // <div>
        //     <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: "column" }}>
        //         <label>Name: </label>
        //         <input type={"text"} value={name} onChange={handleNameChange} />
        //         <label>Address: </label>
        //         <input type={"text"} value={address} onChange={handleAddressChange} />
        //         <label>Description: </label>
        //         <textarea type={"text"} value={description} onChange={handleDescChange} />
        //         {/* <label>Image URL:</label>
        //         <input type={"text"} value={imageURL} onChange={handleImgChange} /> */}
        //         <button type='submit'>Submit</button>
        //     </form>
        // </div>
    );
};

export default UpdateCampusForm;