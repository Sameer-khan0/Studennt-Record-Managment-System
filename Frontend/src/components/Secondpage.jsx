import React from "react";
import "../css/app.css";
import Alert from './Alert'
import std_img from "../assets/std1.jpg";
import tea_img from "../assets/tea2.jpg";
import { Link } from "react-router-dom";

function App() {
  return (
    <div>
    <div className="main_box">
      <div className="ptl">
        <div className="ptl_box">
          <div className="ptl_box_img">
            <img src={std_img} alt="Student" />
          </div>
          <div className="box_content">
            <div className="box_txt">
              <h3 className="sp">Student Portal</h3>
            </div>
            <div className="box_btns">
              <button className="box_btn" id="std">
                <Link to="/std/auth">Read More</Link>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Teacher Portal */}
      <div className="ptl">
        <div className="ptl_box">
          <div className="ptl_box_img">
            <img src={tea_img} alt="Teacher" />
          </div>
          <div className="box_content">
            <div className="box_txt">
              <h3 className="tp">Teacher Portal</h3>
            </div>
            <div className="box_btns">
              <button className="box_btn" id="tea">
                <Link to="/tea/auth">Read More</Link>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Alert />
  </div>
  );
}

export default App;
