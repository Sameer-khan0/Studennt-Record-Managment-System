import React from 'react'
import '../css/Alert.css'
import true_logo from '../assets/tloading.gif'
import false_logo from '../assets/h1.gif'

function Alert(props) {
  const {msg,status,showalert}=props
  return (
    <div>
        {showalert && <div className="alert_box"  id={status===true?'trueid':'fasleid'}>
            <div className="alert">
                <div className="alert_logo"><img src={status?true_logo:false_logo} alt="img" /></div>
                <div className="alert_msg"><p>{msg}</p></div>
            </div>
        </div>}
    </div>
  )
}

export default Alert
