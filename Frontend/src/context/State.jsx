import { useState } from "react";
import Contexts from "./Context";

const States = ({ children }) => {
  const [alert, setalert] = useState({
    msg: "",
    status: false,
    showalert: false,
  });
  const [load, setload] = useState({
    msg: "",
    status: false,
    showload: false,
  });

  const [srecord, setsrecord] = useState({});
  const [teacher, setteacher] = useState({});
  const [Allrecord, setAllrecord] = useState([]);

  const A_record = async () => {
    const req = await fetch("http://localhost:9000/record/get/record", {});
    const res = await req.json();
    setAllrecord(res);
  };

  const G_Teacher = async () => {
    const req = await fetch("http://localhost:9000/tauth/get/teacher", {
      headers: {
        token: localStorage.getItem("token"),
      },
    });
    const res = await req.json();
    setteacher(res);
  };

  const S_record = async () => {
    const req = await fetch("http://localhost:9000/sauth/get/std/record", {
      headers: {
        token: localStorage.getItem("token"),
      },
    });
    const res = await req.json();
    setsrecord(res);
  };

  const Std_auth = async (name, id) => {
    document.getElementById("name").value = "";
    document.getElementById("sid").value = "";
    try {
      const req = await fetch("http://localhost:9000/sauth/std/record", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name,
          id: id,
        }),
      });
      const res = await req.json();
      if (res.status === "ok") {
        localStorage.setItem("token", res.token);
        showloading("S", true);
        window.location.href = "/std/mainpage";
      } else {
        showalert("Wrong Credentials", false);
      }
    } catch (error) {
      console.error("Error fetching student record:", error);
      showalert("Error fetching student record", false);
    }
  };

  const Tea_auth = async (email, tid) => {
    document.getElementById("email").value = "";
    document.getElementById("tid").value = "";
    try {
      const req = await fetch("http://localhost:9000/tauth/login/teacher", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          tid: tid,
        }),
      });

      const res = await req.json();
      if (res.status === "ok") {
        localStorage.setItem("token", res.token);
        showloading("T", true);
        window.location.href = "/tea/mainpage";
      } else {
        showalert("Wrong Credentials", false);
      }
      document.getElementById("email").value = "";
      document.getElementById("tid").value = "";
    } catch (error) {
      console.error(error);
      showalert("Server error", false);
    }
  };

  const add_rec = async (name, sid, dep, tm, om) => {
    const req = await fetch("http://localhost:9000/record/add/record", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        token: localStorage.getItem("token"),
      },
      body: JSON.stringify({
        name: name,
        sid: sid,
        department: dep,
        tmarks: tm,
        omarks: om,
      }),
    });

    const res = await req.json();
    console.log(res);
    if (res.status) {
      setAllrecord(Allrecord.concat(res.record));
      showalert('New Record is added ',true)
    }
    else{
      showalert('New Record is not added ',false)
    }
  };

  const edit_rec = async (id, name, sid, dep, tm, om, tid) => {
    const req = await fetch(`http://localhost:9000/record/edit/record/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        token: localStorage.getItem("token"),
      },
      body: JSON.stringify({
        tid: tid ,
        name: name,
        sid: sid,
        department: dep,
        tmarks: tm,
        omarks: om
      }),
    });
    const res = await req.json();
    if (res.status) {
      showalert('Record is Updated ',true)
      for (let i=0;i<Allrecord.length;i++){
        if(Allrecord[i]._id === id){
          Allrecord[i].name=res.updaterec.name
          Allrecord[i].sid=res.updaterec.sid
          Allrecord[i].department=res.updaterec.department
          Allrecord[i].tmarks=res.updaterec.tmarks
          Allrecord[i].omarks=res.updaterec.omarks
        }
      }
    }
    else{
      showalert('Record is not Updated ',false)
    }
  };

  const delete_rec = async (id) => {
    const req = await fetch(
      `http://localhost:9000/record/delete/record/${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          token: localStorage.getItem("token"),
        },
      }
    );
    const res = await req.json();
    if(res.Deleted){
      const newrec = Allrecord.filter((e) => {
        return e._id !== res.Deleted._id;
      });
      setAllrecord(newrec);
      showalert(`Record with S-ID ${res.Deleted.sid} is deleted `, true)
    }
    else{
      showalert(`Error in deleting Record with ID ${res.Id} `, false)
    }
  };

  function showalert(msg, status) {
    setalert({ msg: msg, status: status, showalert: true });
    setTimeout(() => {
      setalert({ msg: "", status: false, showalert: false });
    }, 5000);
  }

  function showloading(msg, status) {
    setload({ msg: msg, status: status, showload: true });
    setTimeout(() => {
      setload({ msg: "", status: false, showaload: false });
    }, 1000);
  }

  return (
    <Contexts.Provider
      value={{
        Std_auth,
        S_record,
        Tea_auth,
        A_record,
        showloading,
        showalert,
        G_Teacher,
        add_rec,
        delete_rec,
        edit_rec,
        teacher,
        srecord,
        Allrecord,
        alert,
        load,
      }}
    >
      {children}
    </Contexts.Provider>
  );
};

export default States;
