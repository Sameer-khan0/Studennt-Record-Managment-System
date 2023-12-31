import React, { useContext, useEffect, useState } from "react";
import "../css/Std_mpage.css";
import { Link } from "react-router-dom";
import Contexts from "../context/Context";
import Modal from "./Modal";
import Recbox from "./Recbox";

function Std_mpage() {
  const [C_rec, setC_rec] = React.useState();
  const [button, setbutton] = useState(false);
  const [svalue, setsvalue] = useState("");
  const [modal, setmodal] = useState("");
  const [records, setrecord] = useState([]);
  const states = useContext(Contexts);
  const { A_record, Allrecord, showalert } = states;
  useEffect(() => {
    A_record();
  }, []);

  const search_input = () => {
    console.log(records);
    const search_rec = records.filter((e) =>
      e.name.toLowerCase().includes(svalue.toLowerCase())
    );
    if (search_rec.length > 0) {
      setrecord(search_rec);
      console.log(search_rec);
      setbutton(true);
      setsvalue("");
    } else {
      showalert("Record Not found", false);
    }
    const ser = document.getElementById("search");
    ser.value = "";
  };

  function showALLrec() {
    setrecord(Allrecord);
    setbutton(!button);
  }

  useEffect(() => {
    setrecord(Allrecord);
  }, [Allrecord]);

  const handle_current_rec = (currentNote) => {
    setC_rec({
      id: currentNote._id,
      name: currentNote.name,
      sid: currentNote.sid,
      department: currentNote.department,
      tmarks: currentNote.tmarks,
      omarks: currentNote.omarks,
      tid: currentNote.tid,
    });
  };

  const logout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  return (
    <div className="Std_mpage">
      <div className="Std_navbar" style={{ background: "rgb(155 72 251)" }}>
        <div className="nav_main">
          <div className="nav_head">Teacher_portal</div>
          <div className="nav_com">
            <nav>
              <ul>
                <li>
                  <Link to="/std/all/record">All Record</Link>
                </li>
                <li>
                  <Link to="/tea/profile">Profile</Link>
                </li>
                <li onClick={logout} style={{ cursor: "pointer" }}>
                  logout
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
      <Modal data={modal} crec={C_rec} setrc={setC_rec} />
      <div className="tea_main">
        <div className="tea_records">
          <div className="tea_rec_head">
            <div className="ser_add_rec">
              <div className="tea_rec">Your Records</div>
              <button
                className="btn btn-primary"
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
                onClick={() => setmodal("ar")}
              >
                Add Record
              </button>
            </div>
            <div className="total_search_rec">
              <input
                onChange={(e) => {
                  setsvalue(e.target.value);
                }}
                type="search"
                className="search"
                name="search"
                placeholder="Search"
                id="search"
              />
              <label htmlFor="search" id="searchlab" className="btn btn-primary" onClick={search_input}>
                Search
              </label>
            </div>
          </div>
          <div className="tea_crud_records">
            <div className="rec_table">
              <table className="table table-striped table-bordered tea_table">
                <thead className="thead-dark bg-secondary text-white">
                  <tr>
                    <th scope="col">Name</th>
                    <th scope="col">ID</th>
                    <th scope="col">Dept</th>
                    <th scope="col">Total</th>
                    <th scope="col">Obtained</th>
                    <th scope="col">Edit</th>
                    <th scope="col">Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {records.map((e) => (
                    <Recbox
                      modal={setmodal}
                      key={e._id}
                      records={e}
                      update={() => handle_current_rec(e)}
                    />
                  ))}
                </tbody>
              </table>
              {button && (
                <button className="addrecord" onClick={() => showALLrec()}>
                  All record
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="Std_footer" style={{ background: "rgb(155 72 251)" }}>
        <div className="footercontent">
          <p className="footertxt">Student Record Mangement System (SRMS)</p>
        </div>
      </div>
    </div>
  );
}

export default Std_mpage;
