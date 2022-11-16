import axios from 'axios';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setLoading,deleteCampus } from '../store/campusSlice';
import { setStudentList } from '../store/studentSlice';
import { Link } from 'react-router-dom';

//MUI components
import {
    Card,
    CardActions,
    CardContent,
    CardActionArea,
    CardMedia,
    Button,
    Typography
} from '@mui/material';


const campusDiv1 = {
    display:'flex',
    justifyContent:'right',
    gap:'15px'
};

const deleteButton = {
    height:'15px',
    width:'15px',
    textAlign:'center',
    fontSize:'10px',
    padding:'0px'
};

const SingleCampusMini = ({campus}) => {

    const dispatch = useDispatch();
    const [deleteError,setDeleteError] = useState(false);

    const handleDeleteCampus = async(campusId) =>{
        try{
            dispatch(setLoading(true));
            dispatch(deleteCampus({ // here we are deleting the campus from the front end first
                id: campusId
            }));
            await axios.delete(`/api/campuses/${campusId}`);
            const students = await axios.get('api/students'); // pretty sure I need to make this API call here to update all student info!?
            dispatch(setStudentList(students.data));  
            dispatch(setLoading(0));
        }catch(error){
            console.log(error);
            setDeleteError(false);
        };
    };

    return (
        <Card sx={{ width: 600 }}>
            <CardActionArea>
                <Link to={`/campuses/${campus.id}`}>
                    <CardMedia
                        component="img"
                        height="200"
                        image={campus.imageURL}
                        />
                </Link>
            </CardActionArea>
            <CardContent>
            <Typography gutterBottom variant="h5" component="div" style={{padding:'0px',margin:'0px'}}>
                {campus.name}
            </Typography>
            <p>{campus.address}</p>
            <p>{campus.state}</p>
            <div style={campusDiv1}>
                <button style={deleteButton} onClick={()=>handleDeleteCampus(campus.id)}>x</button>
            </div>
            </CardContent>
        </Card>

        /* This is the non-MUI component card - leaving here for reference */
        // <div key={campus.id}>
        //     <div style={campusDiv1}>
        //         <Link to={`/campuses/${campus.id}`}><p style={{fontSize:'40px'}}>{campus.name}</p></Link>
        //         <button style={{height:'15px',width:'15px',textAlign:'center',fontSize:'10px',padding:'0px'}} onClick={()=>handleDeleteCampus(campus.id)}>x</button>
        //     </div>
        //     <p><b>Enrollment:</b> {campus.students.length}</p>
        // </div>
    );
};

export default SingleCampusMini;