import React,{useEffect} from 'react';

const centered = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    
};

const title = {
    fontSize:'150px',
    color:'white',
    border:'10px solid white',
    padding:'20px',
    borderRadius:'5px'
};

const HomePage = () => {
    return (
        <div>
            <img style={{height:'100%',width:'100%'}} src='campus.jpeg'/>
            <div style={centered}>
                <h1 style={title}> MyCampus</h1>
            </div>
        </div>
    );
};

export default HomePage;