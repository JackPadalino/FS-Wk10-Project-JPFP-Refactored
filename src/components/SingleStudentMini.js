import React,{useState} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { setLoading,deleteStudent } from '../store/studentSlice';
import { setCampusList } from '../store/campusSlice';
import { useDispatch, useSelector } from 'react-redux';

// MUI imports
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';

const campusNameButtonDiv = {
    display:'flex',
    justifyContent:'space-between'
};

const campusNameDiv = {
    display:'flex',
    justifyContent:'left',
};

const deleteButtonDiv = {
    display:'flex',
    justifyContent:'right',
};

const deleteButtonStyle = {
    height:'15px',
    width:'15px',
    textAlign:'center',
    fontSize:'10px',
    padding:'0px'
};

const SingleStudentMini = ({student}) => {

    const dispatch = useDispatch();
    const [deleteError,setDeleteError] = useState(false);

    const handleDeleteStudent = async(studentId) =>{
        try{
            //dispatch(setLoading(true));
            dispatch(deleteStudent({ // here we are deleting the student from the front end first
                id: studentId
            }));
            await axios.delete(`/api/students/${studentId}`);
            const campuses = await axios.get('api/campuses'); // pretty sure I need to make this API call here to update all campus info!?
            dispatch(setCampusList(campuses.data));  
            //dispatch(setLoading(false));
        }catch(error){
            console.log(error);
            setDeleteError(0);
        };
    };

    return (
        <Card sx={{ width: 200 }}>
            <CardActionArea>
                <Link to={`/students/${student.id}`}>
                    <CardMedia
                        component="img"
                        height="140"
                        image={student.imageURL}
                        />
                </Link>
            </CardActionArea>
            <CardContent>
              <Typography gutterBottom variant="h5" component="div" style={{padding:'0px',margin:'0px'}}>
                {student.firstName}
              </Typography>
              <Typography gutterBottom variant="h5" component="div" style={{padding:'0px',margin:'0px'}}>
                {student.lastName}
              </Typography>
              <div style={campusNameButtonDiv}>
                <div style={campusNameDiv}>
                    {student.campus && <Link to={`/campuses/${student.campus.id}`}><p>{student.campus.name}</p></Link>}
                </div>
                <div style={deleteButtonDiv}>
                    <button style={deleteButtonStyle} onClick={()=>handleDeleteStudent(student.id)}>x</button>
                </div>
              </div>
            </CardContent>
        </Card>
      );
};

export default SingleStudentMini;