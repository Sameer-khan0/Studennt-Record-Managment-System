import React, { useContext, useState } from "react";
import tea_avatar from "../assets/tea2.jpg";
import "../css/auth.css";
import Contexts from "../context/Context";

function Std_auth() {
  const states = useContext(Contexts);
  const {Tea_auth} = states;
  const [values, setvalues] = useState({ email: "", tid: "" });

  const handlechange = (e) => {
    setvalues({ ...values, [e.target.name]: e.target.value });
  };

  const handle_submit=()=>{
    Tea_auth(values.email,values.tid)
  }
  return (
    <div>
      <div className="Std_box" >
        <div className="Std_mbox" style={{ borderTopColor: "#c103c1" }}>
          <div className="Std_logo">
            <img src={tea_avatar} alt="img" />
          </div>
          <div className="sauth_inputs">
            <input
              type="text"
              name="email"
              id="email"
              onChange={handlechange}
              placeholder="Your email"
            />
            <input
              type="text"
              name="tid"
              id="tid"
              onChange={handlechange}
              placeholder="Your id"
            />
            <input
              type="button"
              value="submit"
              id="ssbtn"
              onClick={handle_submit}
              style={{ background: "#c103c1" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Std_auth;
