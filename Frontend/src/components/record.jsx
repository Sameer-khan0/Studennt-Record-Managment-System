import React, { useContext, useEffect, useState } from 'react'
import '../css/C_table.css'
import Contexts from '../context/Context';

const TableRow=()=>{
  const [records,setrecord]=useState([])
  const states=useContext(Contexts)
  const {A_record,Allrecord}=states
  useEffect(()=>{
   A_record()
  },[])
  useEffect(()=>{
    setrecord(Allrecord)
  },[Allrecord])
  
    return (
      <>
        {localStorage.getItem('token')?
        records.map((e, index) => (
          <tr key={index}>
            <td>{e.name}</td>
            <td>{e.department}</td>
            <td style={{'fontWeight':'bolder','color':`${e.grade === 'F'?"red":'green'}`}}>{e.grade}</td>
            <td style={{'fontWeight':'bolder','color':`${e.percentage>=50?"green":'red'}`}}>{e.percentage>=50?"Pass":"Fail"}</td>
          </tr>
        )):<h1>Not valid</h1>}
      </>
    );
  };

function C_record() {
  return (
    <div className="C_table">
    <div className="table-container">
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Department</th>
          <th>Grade</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody style={{'background':'white'}}>
        <TableRow />
      </tbody>
    </table>
  </div>
</div>
  )
}

export default C_record
