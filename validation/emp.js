const validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validate(data) {
  let err = {};
  data.firstname = !isEmpty(data.firstname) ? data.firstname : "";
  data.lastname = !isEmpty(data.lastname) ? data.lastname : "";
  data.age = !isEmpty(data.age) ? data.age : "";
  data.phoneno = !isEmpty(data.phoneno) ? data.phoneno : "";
  data.address = !isEmpty(data.address) ? data.address : "";
  data.position = !isEmpty(data.position) ? data.position : "";
  data.dob = !isEmpty(data.dob) ? data.dob : "";
  data.hiredate = !isEmpty(data.hiredate) ? data.hiredate : "";
  data.empid = !isEmpty(data.empid) ? data.empid : "";
  data.dept = !isEmpty(data.dept) ? data.dept : "";

  for (var key in data) {
    if (validator.isEmpty(data[key])) {
      err[key] = `${key} is required`;
    }
  }

  if (data.age < 23 || data.age > 65) {
    err.age = "not a valid age";
  }

  return {
    err,
    isValid: isEmpty(err)
  };
};
