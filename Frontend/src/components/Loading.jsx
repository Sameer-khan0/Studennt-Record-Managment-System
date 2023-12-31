import React from 'react';
import '../css/load.css'
import Tea from '../assets/teaL.gif';
import Std from '../assets/stdL.gif';

function Loading(props) {
  const { msg, status, showload } = props;


  return (
    <div>
      {showload && 
        <div className="loadingmain">
          <div className="loadingimg">
          <img src={msg == 'T'?Tea:Std} alt="img" />
          </div>
        </div>
      }
    </div>
  );
}

export default Loading;
