import React from 'react';
import '../css/firstpage.css'
import { Link } from 'react-router-dom';
import img from '../assets/logo.jpg'

const HomePageComponent = () => {
  return (
    <div className="container0">
        <div className="mainbox">
        <div className="logo">
            <img src={img} alt="logo" />
        </div>
      <h1 className="title">Student Record Management System</h1>
      <button className="startButton"><Link to='/second/page'>Get Started</Link></button>
      </div>
    </div>
  );
};

export default HomePageComponent;
