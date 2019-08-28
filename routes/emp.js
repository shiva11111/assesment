//import the employ model
const express = require("express");
const router = express.Router();
const Emp = require("../models/employ");
const validate = require("../validation/emp");

//router for adding an employee details
router.post("/emp", async (req, res) => {
  const emp = await Emp.findOne({ empid: req.body.empid });

  let { err, isValid } = validate(req.body);
  if (!isValid) {
    res.status(400).send({ err });
  }
  if (emp) {
    err.user = "employee id already exists";
    res.status(400).send({ err });
  } else {
    const newemp = new Emp({
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      dept: req.body.dept,
      position: req.body.position,
      age: req.body.age,
      dob: req.body.dob,
      hiredate: req.body.hiredate,
      address: req.body.address,
      empid: req.body.empid,
      phoneno: req.body.phoneno
    });
    newemp
      .save()
      .then(user => res.status(201).send({ newemp, status: "created" }))
      .catch(e => {
        err.notcreated = "not created due to some internal server error";
        res.status(502).send(err);
      });
  }
});

//router to view employee.
router.get("/emp", async (req, res) => {
  let err = {};
  const emp = await Emp.find({});
  if (!emp) {
    err.noemp = "no employees found";
    res.status(404).send(err);
  } else {
    res.status(200).send({ emp });
  }
});

//router to view employee by empid
router.get("/emp/:id", async (req, res) => {
  let err = {};
  if (req.params.id === "") {
    err.noemp = "enter id";
    res.status(400).send({ err });
  }
  const emp = await Emp.findOne({ empid: req.params.id });
  if (!emp) {
    err.noemp = "no employee found with this id";
    res.status(404).send({ err });
  } else {
    res.status(200).send({ emp });
  }
});

//router to delete employee details
router.delete("/emp/:id", async (req, res) => {
  const emp = await Emp.findOneAndRemove({ empid: req.params.id });
  if (emp) {
    res.status(200).send({ emp, status: "removed" });
  } else {
    err.noemp = "no employee found";
    res.status(404).send({ err });
  }
});

//router to update employee details
router.patch("/emp/:id", async (req, res) => {
  let { err, isValid } = validate(req.body);
  if (!isValid) {
    res.status(400).send({ err });
  }
  const Updates = Object.keys(req.body);
  const emp = await Emp.findOne({ empid: req.params.id });
  if (emp) {
    Updates.forEach(key => (emp[key] = req.body[key]));
    emp
      .save()
      .then(r => {
        console.log(r);
        res.status(201).send({ r, status: "updated" });
      })
      .catch(e => {
        err.notupdated = "not updated due to some internal server error";
        res.status(502).send({ err });
        console.log(e);
      });
  } else {
    err.noemp = "employees data not updated";
    console.log({ id: req.params.id });
    res.status(404).send({ err });
  }
});

module.exports = router;
