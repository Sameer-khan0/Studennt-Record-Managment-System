import React, { useContext, useEffect, useState } from 'react';
import img from '../assets/tea1.jpg';
import '../css/profile.css'
import Contexts from '../context/Context';

function Std_profile() {
    const state = useContext(Contexts);
    const { G_Teacher, teacher } = state;
  
    useEffect(() => {
      G_Teacher();
    }, []);
    
  console.log(teacher)

  return (
    <div className="profile_mbox">
      <div className="innerbox">
        <div className="imageside">
          <img src={img} alt="img" />
        </div>
        <div className="stdinfo">
          <h2><b>Name:</b> {teacher.name}</h2>
          <h3><b>ID:</b> {teacher.tid}</h3>
          <h3><b>Email:</b> {teacher.email}</h3>
        </div>
      </div>
    </div>
  );
}

export default Std_profile;
