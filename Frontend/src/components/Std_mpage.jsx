import React, { useContext, useState,useEffect } from 'react'
import '../css/Std_mpage.css'
import Std_avatar from '../assets/std1.jpg'
import Contexts from '../context/Context'
import { Link } from 'react-router-dom'

function Std_mpage() {
  const { S_record,srecord} = useContext(Contexts);
  const [record, setRecord] = useState({});
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    S_record()
  }, []);

  useEffect(()=>{
    setRecord(srecord)
  },[srecord])

  const states=()=>{
    if(record.grade==='A'){
      return 'Excellent'
    }
    else if(record.grade=='B'){
      return 'Good'
    }
    else{
      return 'Bad'
    }
  }

  const percentage = () => {
    if (record.percentage) {
      let counter = 0;

      const intervalId = setInterval(() => {
        counter += 1;
        setCounter(counter); 
        if (counter >= record.percentage) {
          clearInterval(intervalId); 
        }
      }, 10);
    }
  };

useEffect(()=>{
  percentage()
}
,[record])

  const stylecss={
    "background":"white",
    'border': '0px solid #ddd',
    'padding': '0px'
  }
  const logout=()=>{
    localStorage.clear()
    window.location.href='/';
  }
  return (
    <div className='Std_mpage'>
      <div className="Std_navbar">
        <div className="nav_main">
        <div className="nav_head">
            Student_Portal
        </div>
        <div className="nav_com">
        <nav>
            <ul>
                <li><Link to='/std/all/record'>All Record</Link></li>
                <li><Link to='/std/profile'>Profile</Link></li>
                <li onClick={logout} style={{"cursor":'pointer'}}>logout</li>
            </ul>
        </nav>
        </div>
        </div>
      </div>
      <div className="Std_main">
        <div className="std_rp">
            <div className="std_item" id='std_info'>
              <div className="infomain">
              <div className="std_dp">
                <div className="dp_box">
                <img src={Std_avatar} alt="img" />
                </div>
              </div>
              <div className="std_infobox">
                <div className="std_infoheading">
                  Student info
                </div>
                <table>
                  <tr style={stylecss}>
                    <th style={stylecss}>Name: </th>
                    <td style={stylecss}>{record.name}</td>
                  </tr>
                  <tr>
                    <th style={stylecss}>ID: </th>
                    <td style={stylecss}>{record.sid}</td>
                  </tr>
                  <tr>
                    <th style={stylecss}>Department: </th>
                    <td style={stylecss}>{record.department}</td>
                  </tr>
                </table>
              </div>
              </div>
            </div>
            <div className="std_item" id='std_per'>
              <div className="per_wbox" >{counter}%</div>
              <div className="per_box" style={{ backgroundImage: `conic-gradient(${counter >= 50 ? '#23a2ff' : 'red'} ${3.6 * counter}deg, rgb(255, 255, 255) ${3.6 * counter}deg)` }}></div>
            </div>
            <div className="std_item" id='std_status'>
              <tr>
                <th style={stylecss}>STATUS: </th><td style={{'color':`${record.omarks>=250?'#23a2ff':'red'}`,'fontWeight':'bold','border': '0px solid #ddd','padding': '8px'}}>{states()}</td>
              </tr>
            </div>
            <div className="std_item" id='std_sGrade'>
              <tr>
                <th style={stylecss}>Grade: </th><td style={{'color':`${record.omarks>=250?'#23a2ff':'red'}`,'fontWeight':'bold','border': '0px solid #ddd','padding': '8px'}}>{record.grade}</td>
              </tr>
            </div>
            <div className="std_item" id='std_marks'>
              <div className="std_marksbix">
              <div className="std_heading">
                Marks:
              </div>
              <div className="std_marks" style={{'color':`${record.omarks>=250?'#23a2ff':'red'}`}}>
              {record.tmarks}/{record.omarks}
              </div>
              </div>
            </div>
        </div>
      </div>
      <div className="Std_footer">
        <div className="footercontent">
            <p className='footertxt'>Student Record Mangement System (SRMS)</p>
        </div>
      </div>
    </div>
  )
}

export default Std_mpage
