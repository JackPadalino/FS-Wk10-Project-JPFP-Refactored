import React from 'react';
import { Link, Routes, Route } from 'react-router-dom';

const navContainer = {
    display:'flex',
    justifyContent:'space-between',
    backgroundColor: 'rgb(0,76,147)',
    paddingLeft:'200px',
    paddingRight:'200px',
    paddingTop:'10px',
    paddingBottom:'10px',
    height:'90px'
};

const navLeft = {
    display:'flex',
    alignItems:'center',
    gap:'10px'
};

const navHome = {
    fontSize:'35px',
    fontFamily:'Roboto',
    textDecoration:'none',
    color:'white',
    border:'2px solid white',
    padding:'5px',
    borderRadius:'2.5px'
};

const navLink = {
    textDecoration:'none',
    color:'white',
    fontFamily:'Roboto'
};

const Navbar = () => {
    return (
        <div id='navContainer' style={navContainer}>
            <div id='navLeft' style={navLeft}>
                <Link id='navHome' to={'/'} style={navHome}>MyCampus</Link>
                <Link class='navLink' to={'/campuses'} style={navLink}>Campuses</Link>
                <Link class='navLink' to={'/students'} style={navLink}>Students</Link>
            </div>
        </div>
    );
};

export default Navbar;