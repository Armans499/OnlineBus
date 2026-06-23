import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./Login.css";

const Login = () => {


const [name, setName] = useState("");
const [mobile, setMobile] = useState("");
// const [error, setError] = useState("");
const [nameError, setNameError] = useState("");
const [mobileError, setMobileError] = useState("");

const navigate = useNavigate();

console.log("NAVIGATE =", navigate);

const location = useLocation();


const seats = location.state?.seats || [];
const bus = location.state?.bus;

const from = location.state?.from || "";
const to = location.state?.to || "";

  const handleLogin = () => {

    setNameError("");
setMobileError("");

let isValid = true;

if (!name.trim()) {
  setNameError("Please enter your name");
  isValid = false;
}

if (!mobile.trim()) {
  setMobileError("Please enter your mobile number");
  isValid = false;
} else if (mobile.length !== 10) {
  setMobileError("Mobile number must be 10 digits");
  isValid = false;
}

if (!isValid) {
  return;
}

console.log("LOGIN CLICKED");
console.log("SEATS =", seats);
console.log("BUS =", bus);
console.log("FROM =", from);
console.log("TO =", to);

//  if (!name.trim() || !mobile.trim()) {
//   setError("Please fill all fields.");
//   return;
// }

// if (mobile.length !== 10) {
//   setError("Mobile number must be 10 digits.");
//   return;
// }

// setError("");

    const user = {
      name,
      mobile,
    };

   localStorage.setItem(
  "user",
  JSON.stringify(user)
);

localStorage.setItem(
  "isLoggedIn",
  "true"
);

console.log(
  "AFTER LOGIN:",
  localStorage.getItem("isLoggedIn")
);

console.log("SEATS =", seats);
console.log("BUS =", bus);
console.log("FROM =", from);
console.log("TO =", to);

if(seats.length > 0){

  navigate(
    "/passenger-details",
    {
      state: {
        seats,
        bus,
        from,
        to,
      }
    }
  );

}else{

  navigate("/");

}
  };

  return (
    <div className="login-page">

      <div className="login-card">

        <h1>Login</h1>

      <input
  type="text"
  placeholder="Enter Name"
  value={name}
  onChange={(e) => {
    setName(e.target.value);
    setNameError("");
  }}
/>

{nameError && (
  <p className="error-msg">{nameError}</p>
)}

      <input
  type="number"
  placeholder="Mobile Number"
  value={mobile}
  onChange={(e) => {
    setMobile(e.target.value);
    setMobileError("");
  }}
/>

{mobileError && (
  <p className="error-msg">{mobileError}</p>
)}

        <button onClick={handleLogin}>
          Login
        </button>

      </div>

    </div>
  );
};

export default Login;