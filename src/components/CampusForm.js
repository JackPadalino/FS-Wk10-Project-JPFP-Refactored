import axios from 'axios';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setCampusList,setLoading } from '../store/campusSlice';
import { statesArr } from '../../bin/states'

import {
    Button,
    TextField,
    //TextareaAutosize,
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

const CampusForm = () => {
    const dispatch = useDispatch();
    const [name, setName] = useState("");
    const [state, setState] = useState("");
    const [address, setAddress] = useState("");
    const [description, setDescription] = useState("");
    //const [imageURL, setImageURL] = useState("");
    const [errorMessage,setErrorMessage] = useState(false);

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

    const handleSubmit = async (event) => {
        event.preventDefault();
        if(name==='' || state==='') return setErrorMessage(true);
        //dispatch(setLoading(true));
        const newCampus = {
            name,
            state,
            address,
            description
        };
        await axios.post('/api/campuses', newCampus);
        const campuses = await axios.get('/api/campuses');
        dispatch(setCampusList(campuses.data));
        //dispatch(setLoading(false));
        setErrorMessage(false);
    };

    return (
        <div>
            <form onSubmit={handleSubmit} style={formStyle}>
                <TextField label="Name" variant="outlined" value={name} onChange={handleNameChange} />
                <FormControl fullWidth>
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
                <Button variant="outlined" type='submit'>Submit</Button>
            </form>
            {errorMessage && <p style={{color:'red',marginTop:'10px'}}>Please enter valid campus information before submitting!</p>}
        </div>

        /* This is the non-MUI component form - leaving here for reference */
        // <div>
        //     <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: "column",gap:'5px' }}>
        //         <input type={"text"} value={name} placeholder='Campus name' onChange={handleNameChange} />
        //         <input type={"text"} value={address} placeholder='Address' onChange={handleAddressChange} />
        //         <textarea type={"text"} value={description} placeholder="What's is like?" onChange={handleDescChange} />
        //         <button type='submit'>Submit</button>
        //     </form>
        //     {errorMessage && <p style={{color:'red'}}>Please enter valid campus information before submitting!</p>}
        // </div>
    );
};

export default CampusForm;