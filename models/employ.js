const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const employSchema = new Schema({
  firstname: {
    type: String,
    required: true,
    trim: true
  },
  lastname: {
    type: String,
    required: true,
    trim: true
  },
  dept: {
    type: String,
    required: true,
    trim: true
  },
  position: {
    type: String,
    required: true,
    trim: true
  },
  age: {
    type: Number,
    required: true,
    trim: true
  },
  dob: {
    type: Date,
    required: true
  },
  hiredate: {
    type: Date,
    required: true
  },
  address: {
    type: String,
    required: true,
    trim: true
  },
  phoneno: {
    type: Number,
    required: true,
    trim: true
  },
  empid: {
    type: String,
    unique: true,
    required: true,
    trim: true
  }
});

module.exports = Emp = mongoose.model("emp", employSchema);
