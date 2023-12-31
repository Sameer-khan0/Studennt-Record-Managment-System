import React, { useContext } from "react";
import Contexts from "../context/Context";

function Recbox(props) {
  const { records,modal } = props;
  const { name, sid, department, tmarks, omarks } = records;
  const state=useContext(Contexts)
  const {delete_rec}=state

  const handel_click=(sid)=>{
    const confirm=window.confirm("Are you Sure")
    if(confirm) delete_rec(sid)
  }
  
  return (
     <tr className="table_row">
  <td>{name}</td>
  <td>{sid}</td>
  <td>{department}</td>
  <td>{tmarks}</td>
  <td>{omarks}</td>
  <td>
    <button
      className="btn btn-primary"
      data-bs-toggle="modal"
      data-bs-target="#exampleModal"
      onClick={() => {
        modal('er')
        props.update();
      }}
    >
      Edit
    </button>
  </td>
  <td>
    <button
    onClick={()=>handel_click(records._id)}
      className="btn btn-danger"
    >
      Delete
    </button>
  </td>
</tr>
  );
}

export default Recbox;
