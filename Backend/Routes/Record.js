const express = require("express");
const router = express.Router();
const Record = require("../Models/Record");
const getteacher = require("../Midelware/getteacher");

router.post("/add/record", getteacher, async (req, res) => {
  try {
    const { name, sid, department, tmarks, omarks } = req.body;
    const tid = req.teacher;
    if(!tid){
      return res.status(401).json({msg:"Unauthorized"});
    }
    const checkID= await Record.findOne({sid:sid})
    if(checkID){
      return res.status(401).json({msg:"Student with this student id ia alrady prasent"});
    }
    else{
    const percentage = (omarks * 100) / tmarks;
    let grade;
    if (percentage >= 90) {
      grade = "A";
    } else if (percentage >= 80) {
      grade = "B";
    } else if (percentage >= 70) {
      grade = "C";
    } else {
      grade = "D";
    }
    const addrec = await Record.create({
      name: name,
      tid: tid,
      sid: sid,
      department: department,
      tmarks: tmarks,
      omarks: omarks,
      percentage: percentage,
      grade: grade,
    });
    if (addrec) {
      return res.status(200).json({status:"ok",record:addrec});
    }
  }
  } catch (error) {
    return res.status(500).json(error);
  }
});

router.get("/get/record", async (req, res) => {
  try {
    const records = await Record.find().sort({ createdAt: "asc" });
    return res.status(200).json(records);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

router.put("/edit/record/:id", getteacher, async (req, res) => {
  try {
    const teacher_id = req.teacher;
    const id = req.params.id;
    const { name, sid, department, tmarks, omarks, tid } = req.body;
    const percentage = (omarks * 100) / tmarks;
    let grade;
    if (percentage >= 90) {
      grade = "A";
    } else if (percentage >= 80) {
      grade = "B";
    } else if (percentage >= 70) {
      grade = "C";
    } else {
      grade = "D";
    }
    const newrec = {}
    if(name){newrec.name=name}
    if(sid){newrec.sid=sid}
    if(department){newrec.department=department}
    if(tmarks){newrec.omarks=omarks}
    if(omarks){newrec.omarks=omarks}
    if (teacher_id === tid) {
      const rec = await Record.findById(id);
      if (!rec) {
        return res.status(404).send("Not Found");
      }
      if (rec) {
        const upadeted = await Record.findByIdAndUpdate(
          id,
          { $set: newrec },
          { new: true }
        );
        if (upadeted) {
          res.json({status:"0k",updaterec:upadeted});
        }
      }
    }
    if (teacher_id !== tid) {
      res.json("Not Allowed");
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json(error);
  }
});

router.delete('/delete/record/:id',getteacher,async (req,res)=>{
  try {
    const teacher_id = req.teacher;
    const id = req.params.id;
    const findrec=await Record.findById(id)
    if(findrec){
      if(findrec.tid === teacher_id){
        const deleterec=await Record.findByIdAndDelete(id)
        if(deleterec){
          return res.status(200).json({"Deleted":deleterec})
        }
      }
      return res.status(404).json("Not Allowed")
    }
    return res.status(404).json("Not Found")
  } catch (error) {
    console.error(error)
    return res.status(500).json(error)
  }
})


module.exports = router;
