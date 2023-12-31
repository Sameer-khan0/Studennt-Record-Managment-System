import React, { useContext, useEffect, useState } from 'react'
import std_avatar from '../assets/std1.jpg'
import '../css/auth.css'
import Alert from './Alert'
import Contexts from '../context/Context'
import Loading from './Loading'

function Std_auth() {
  const states=useContext(Contexts)
  const {Std_auth,srecord}=states
  const [values,setvalues]=useState({name:'',sid: null})

    const handlechange=(e)=>{
        setvalues({...values,[e.target.name]:e.target.value})
    }

    const handelsubmit=()=>{
      Std_auth(values.name,values.sid)
    }
    
    useEffect(()=>{
      console.log(srecord)
    },[srecord])
    
  return (
    <div>
      <div className="Std_box">
        <div className="Std_mbox">
            <div className="Std_logo">
                <img src={std_avatar} alt="img" />
            </div>
            <div className="sauth_inputs">
                <input type="text" name="name" id="name" onChange={handlechange} placeholder='Enter your name' />
                <input type="text" name="sid" id="sid" onChange={handlechange} placeholder='Enter your enroll id' />
                  <input type="button" value="submit" id='ssbtn' onClick={handelsubmit} />
            </div>
        </div>
      </div>
      
    </div>
  )
}

export default Std_auth
