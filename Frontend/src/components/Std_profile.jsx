import React, { useContext, useEffect, useState } from 'react';
import img from '../assets/std1.jpg';
import '../css/profile.css'
import Contexts from '../context/Context';

function Std_profile() {
    const states=useContext(Contexts)
    const [sdata,setsdata]=useState({})
    const {S_record,srecord}=states

    useEffect(()=>{
        setsdata(srecord)
    },[srecord])

  return (
    <div className="profile_mbox">
      <div className="innerbox">
        <div className="imageside">
          <img src={img} alt="img" />
        </div>
        <div className="stdinfo">
          <h2><b>Name:</b> {sdata.name}</h2>
          <h3><b>ID:</b> {sdata.sid}</h3>
          <h3><b>Department:</b> {sdata.department}</h3>
        </div>
      </div>
    </div>
  );
}

export default Std_profile;
