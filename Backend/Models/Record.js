const mongoose = require("mongoose");

const Record=new mongoose.Schema({
    name:{
        type: String,
        require:true
    },
    tid:{
        type: String,
        unique: true,
        require: true
    },
    sid:{
        type: Number,
        unique: true,
        require: true
    },
    department:{
        type: String,
        require: true
    },
    tmarks:{
        type: Number,
        default: 0
    },
    omarks:{
        type: Number,
        default: 0
    },
    grade:{
        type: String
    },
    percentage:{
        type: Number
    }

})

const recmodel=mongoose.model('Record',Record)
module.exports=recmodel