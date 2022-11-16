import React,{useEffect} from 'react';
import { useSelector } from 'react-redux';
import { CampusForm,SingleCampusMini } from '../components';
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

const campusAndFormContainer = {
    display:'flex',
    justifyContent:'space-between'
};

const campusContainer = {
    display:'flex',
    flexDirection:'column',
    gap:'10px',
    width:'75%',
    flexWrap:'wrap',
};

const formContainer = {
    width:'25%'
};

const AllCampusesPage = () => {
    const {campusList,loading} = useSelector((state) => state.campuses);

    return (
        <div style={componentStyle1}>
            <div style={pageContainer}>
                <h1 style={pageTitle}>Explore schools</h1>
                <div style={campusAndFormContainer}>
                    <div style={campusContainer}>
                        {
                            campusList.map(campus => {
                                return (
                                    <SingleCampusMini key={campus.id} campus={campus} />
                                )  
                            })
                        }
                    </div>
                    <div style={formContainer}>
                        <p style={{fontSize:'20px',marginBottom:'10px'}}>Add new campus</p>
                        <CampusForm />
                    </div>
                </div>
            </div>
        </div>
        
    );
};

export default AllCampusesPage;