const mongoose = require('mongoose');
const { Schema } = mongoose;

const Promodel = new Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    tid:{
        type: Number,
        require: true
    }
  });

  const User = mongoose.model('Teachers_portal', Promodel);
  module.exports = User;