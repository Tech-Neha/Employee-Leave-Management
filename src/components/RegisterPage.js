import React from "react";
import "./stylesheet/style.css";
import { useRef, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import EmployeeService from "../services/EmployeeService";
import BackgroundImage from "./s12.jpeg";
import AlertMessage from "./AlertMessage";
function RegisterPage() {
  const navigate = useNavigate();
  const userRef = useRef();

  const [userName, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [designation, setDesignation] = useState("employee");
  const [error, seterror] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [passwordErr, setPasswordErr] = useState("");
  const [isButtonEnabled, setisButtonEnabled] = useState(false);

  const passwordValidate = (e) => {
    const uppercaseRegExp = /(?=.*?[A-Z])/;
    const lowercaseRegExp = /(?=.*?[a-z])/;
    const digitsRegExp = /(?=.*?[0-9])/;
    const specialCharRegExp = /(?=.?[#?!@$%^&-])/;
    const minLengthRegExp = /.{8,}/;
    const passwordLength = password.length;
    const uppercasePassword = uppercaseRegExp.test(password);
    const lowercasePassword = lowercaseRegExp.test(password);
    const digitsPassword = digitsRegExp.test(password);
    const specialCharPassword = specialCharRegExp.test(password);
    const minLengthPassword = minLengthRegExp.test(password);
    let errMsg = "";
    if (passwordLength === 0) {
      errMsg = "Password is empty";
      setisButtonEnabled(false);
    } else if (!uppercasePassword) {
      errMsg = "At least one Uppercase";
      setisButtonEnabled(false);
    } else if (!lowercasePassword) {
      errMsg = "At least one Lowercase";
      setisButtonEnabled(false);
    } else if (!digitsPassword) {
      errMsg = "At least one digit";
      setisButtonEnabled(false);
    } else if (!specialCharPassword) {
      errMsg = "At least one Special Characters";
      setisButtonEnabled(false);
    } else if (!minLengthPassword) {
      errMsg = "At least minumum 8 characters";
      setisButtonEnabled(false);
    } else {
      errMsg = "";
      setisButtonEnabled(true);
    }
    setPasswordErr(errMsg);
    const timer = setTimeout(() => {
      setPasswordErr("");
    }, 3500);
    console.log(password, passwordErr);
  };

  // const {ierrord} = useParams()

  const handleSubmit = (e) => {
    e.preventDefault();

    const employee = { userName, password, email, designation };
    const emailValidation = "^[a-zA-Z0-9]+@[a-zA-Z0-9-]+.com+$";
    // const passwordValidation ="^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$"
    if (!email.match(emailValidation)) {
      seterror("Invalid Email format");
      return;
    }

    if (password.length === 0) {
      setPasswordError("Password empty!");
      return;
    }

    //     if(userName.trim().length === 0 ||
    //         password.trim().length === 0 ||
    //         email.trim().length === 0 ||

    //         designation.trim().length === 0 ||
    //         designation.trim().length === 0
    //         ){
    //         // alert('Enter Valid Data')
    //         setIsValid(false)
    //         const timer = setTimeout(() => {
    //             setIsValid(true)
    //         },3000)
    //     }else if(password !== confirmPassword){
    //         // alert("Passwords don't match!")
    //         setPasswordMatch(false)
    //         const timer = setTimeout(() => {
    //             setPasswordMatch(true)
    //         },3000)
    //     }else{
    //         EmployeeService.createUser(employee).then((response) => {
    //             // console.log(response.data)
    //             // alert("Employee Registered Successfully")
    //             setIsSuccess(true)
    //             const timer = setTimeout(() => {
    //                 navigate("/employee-login")
    //             },3000)
    //             // navigate("/login")
    //         })
    //     }
    // }

    EmployeeService.saveUser(employee).then((response) => {
      console.log(response.data);

      navigate("/employee-login");
    });
  };
  // //     const handleSubmit = (e) => {
  //     e.preventDefault();
  //     setFormErrors(validate(formValues));
  //     setIsSubmit(true);
  //   };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    if (id === "userName") {
      setUsername(value);
    }
    if (id === "email") {
      setEmail(value);
    }
    if (id === "password") {
      setPassword(value);
    }
    if (id === "confirmPassword") {
      setConfirmPassword(value);
    }
  };

  return (
    <header style={HeaderStyle1}>
      <div className="text-center m-5-auto">
        <form className="form-class" onSubmit={handleSubmit}>
          {/* {
                isValid ? <></> : <AlertMessage text='Enter Valid Data' color='red'/>
            }
            {
                isSuccess ? <AlertMessage text='Employee Registered Successfully' color='green'/> : <></>
            }
            {
                passwordMatch ? <></> : <AlertMessage text="Passwords don't match!" color='orange'/>
            }
             */}
          <h2> Register </h2>
          <p>
            <label>Username</label>
            <br />
            <input
              type="text"
              id="userName"
              autoComplete="off"
              name="userName"
              value={userName}
              placeholder="set username"
              onChange={(e) => handleInputChange(e)}
              required
            />
          </p>
          <p>
            <label>Email</label>

            <br />

            <input
              type="text"
              id="email"
              name="email"
              onChange={(e) => handleInputChange(e)}
              placeholder="abc@gmail.com"
              value={email}
              required
            />
          </p>
          <p>
            <label>Password</label>

            <br />

            <input
              type="password"
              id="password"
              name="password"
              onChange={(e) => handleInputChange(e)}
              onKeyUp={(e) => passwordValidate(e)}
              placeholder="Password"
              value={password}
              required
            />
          </p>
          {passwordErr === "null" ? (
            <></>
          ) : (
            <AlertMessage text={passwordErr} color="red" />
          )}
          <p>
            <label>Confirm Password</label>

            <br />
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              onChange={(e) => handleInputChange(e)}
              placeholder="confirm password"
              value={confirmPassword}
              required
            />
          </p>
          <p>
            <label>Choose your Designation</label>
            <br />
            <select
              id="designation"
              name="designation"
              onChange={(e) => setDesignation(e.target.value)}
              value={designation}
            >
              <option value="employee">Employee</option>
              <option value="manager">Manager</option>
            </select>
          </p>

          {/* <div className="radio-buttons" >Role:
        Employee
        <input
          id="employee"
          value="employee"
          name="platform"
          type="radio"
          onChange={handleChange}
          
        />
        Manager
        <input
          id="manager"
          value="manager"
          name="platform"
          type="radio"
          onChange={handleChange}
         
        />
     
        
   
      </div>

 */}

          <p>
            <button
              id="sub_btn"
              style={{
                backgroundColor: !isButtonEnabled ? "grey" : "",
              }}
              type="submit"
              disabled={!isButtonEnabled}
              onClick={(e) => handleSubmit(e)}
            >
              Register
            </button>
            {error}
            <br></br>
            {passwordError}
          </p>
        </form>
      </div>
    </header>
  );
}

export default RegisterPage;
const HeaderStyle1 = {
  width: "100%",
  height: "100vh",
  background: `url(${BackgroundImage})`,
  backgroundPosition: "center",
  backgroundRepeat: "repeat",
  backgroundSize: "cover",
  position:"absolute",
  top:"60px"
};
