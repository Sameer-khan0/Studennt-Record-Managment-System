import React, { useContext, useState } from "react";
import Context from '../context/Context'

function Modal(props) {
  const {data,crec,setrc}=props
  if(data==='ar'){setrc(null)}
  const [recdata,setrecdata]=useState({sname:'',sid:'',department:'',tmarks:'',omarks:''})
  const states=useContext(Context)
  const {add_rec ,edit_rec} = states;
  const handelchanges=(e)=>{
    setrecdata({...recdata,[e.target.name]: e.target.value })
  }
  const clear_rec=()=>{
    setrecdata({sname:'',sid:'',department:'',tmarks:'',omarks:''})
  }
  const handle_submit = (e) => {
    e.preventDefault();
    add_rec(recdata.sname, recdata.sid, recdata.department, recdata.tmarks, recdata.omarks);
  }  
  
  const handel_esubmit=(e)=>{
    e.preventDefault();
    edit_rec(crec.id,recdata.sname, recdata.sid, recdata.department, recdata.tmarks, recdata.omarks,crec.tid)
  }
  return (
    <div>
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
              {data === 'ar' ? 'Add new Record' : 'Edit Record'}
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={()=>clear_rec()}
              ></button>
            </div>
            <div className="modal-body">
              <div className="container mt-4">
                <form onSubmit={data==='ar'?handle_submit:handel_esubmit}>
                  <div className="mb-3">
                    <label htmlFor="name" className="form-label">
                      Name
                    </label>
                    <input
                    onChange={handelchanges}
                    name="sname"
                      type="text"
                      className="form-control"
                      id="name"
                      placeholder={crec?crec.name:"Name"}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="sid" className="form-label">
                      Student ID
                    </label>
                    <input
                    onChange={handelchanges}
                      type="number"
                      className="form-control"
                      name="sid"
                      id="sid"
                      placeholder={crec?crec.sid:"Student ID"}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="department" className="form-label">
                      Department
                    </label>
                    <input
                    onChange={handelchanges}
                      type="text"
                      name='department'
                      className="form-control"
                      id="department"
                      placeholder={crec?crec.department:"Department"}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="tmarks" className="form-label">
                      Total Marks
                    </label>
                    <input
                    onChange={handelchanges}
                      type="text"
                      className="form-control"
                      id="tmarks"
                      name='tmarks'
                      placeholder={crec?crec.tmarks:"Total Marks"}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="omarks" className="form-label">
                      Obtain Marks
                    </label>
                    <input
                    onChange={handelchanges}
                      type="text"
                      name='omarks'
                      className="form-control"
                      id="omarks"
                      placeholder={crec?crec.omarks:"Obtain Marks"}
                    />
                  </div>
                  <button data-bs-dismiss="modal" type="submit" className="btn btn-primary">
                    Submit
                  </button>
                </form>
              </div>
            </div>
            <div className="modal-footer">
              <button
              onClick={clear_rec}
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Modal;
