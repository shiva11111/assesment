const validator = require("validator");

let data = {};
data.name = "122";
data.pass = "";
data.phoneno = "124587";
let err = {};
for (var key in data) {
  if (validator.isEmpty(data[key])) {
    err[key] = `${key} is required`;
  }
}
//a = data.phoneno;
//b = a.toString();
// if (validator.isLength(name, { min: 10, max: 10 })) {
//   err.phoneno = "not a valid phoneno";
// }
//console.log(b);
console.log(err);
