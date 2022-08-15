

import React from 'react'
import {Link, useNavigate} from 'react-router-dom'
import { useRef, useState, useEffect } from 'react'
import EmployeeService from '../services/EmployeeService';
import AlertMessage from './AlertMessage';
import BackgroundImage from "./s11.jpeg";
import axios from 'axios';


function EmployeePage() {

    const [fromDate, setFromDate] = useState('')
    const [toDate, setToDate] = useState('')
    const [reason, setReason] = useState('')
    const [managerUserName, setManagerUserName] = useState('')
    const [managerId, setManagerId] = useState('')
    const [applicantId, setApplicantId] = useState('')
    const [applicantName, setApplicantName] = useState('')
    const leaveStatus = 'pending'
    const [leaveType,setLeaveType]=useState('');
    const [leaveTypeOptions,setLeaveTypeOptions]=useState([]);
    const [isValid, setIsValid] = useState(true)
    const [isSuccess, setIsSuccess] = useState(false)


    const [managerList, setManagerList] = useState([])

    useEffect(() => {
        console.log({managerList})
    },[])

    useEffect(() => {
        const designation = localStorage.getItem("designation");
        if (designation){
          if(designation !== "employee")
          {
            navigate("/employee-login")
          }
          
        }
        else{
          navigate("/employee-login")
        }
    
      }, []);

    useEffect(() => {
        getAllManagers()
        getUserByUserName(managerUserName)
        setApplicantId(localStorage.getItem('loggedInId'))
        setApplicantName(localStorage.getItem('userName'))
        getLeaveType()

    },[managerUserName])

    const getAllManagers = () => {
        EmployeeService.getAllManagers().then((response) => {
            setManagerList(response.data)
        }).catch(error =>{
            console.log(error);
        })
    }
    const getLeaveType= () =>
    {
        EmployeeService.getLeaveType().then((response) => {
            setLeaveTypeOptions(response.data)
        }).catch(error =>{
            console.log(error);
        })
    }

    


    const getUserByUserName = (managerUserName) => {
        EmployeeService.getUserByUserName(managerUserName).then(response => {
            // console.log(response.data)
            setManagerId(response.data.id)
        })
    }

    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()

        const leaveObj = {applicantId, applicantName, managerId, fromDate, toDate, reason, leaveStatus,leaveType}
        console.log(leaveObj);

        if(managerId === undefined ||
        fromDate.trim().length === 0 ||
        toDate.trim().length === 0 ||
        reason.trim().length === 0    
        ){
            setIsValid(false)
            const timer = setTimeout(() => {
                setIsValid(true)
            },3000)
        }else{
            EmployeeService.createLeave(leaveObj).then((response) => {
                setIsSuccess(true)

                setApplicantName('')
                setApplicantId('')
                setManagerId('')
                setManagerUserName('')
                setReason('')
                setToDate('')
                setFromDate('')
                setLeaveType('')

                const timer = setTimeout(() => {
                    setIsSuccess(false)
                    
                },3000)
            })
        }
        
    }
    const handleLogout = () => { 
           localStorage.clear()
        }
  return (
 
    <header style={HeaderStyle1}>
          <div>
    {leaveTypeOptions}
    </div>
    <div className="text-center m-5-auto">
    
      <form className='form-class'>
      <h2>Apply Leave</h2>
            <p>
                <label>Choose your Manager</label><br/>
                <select style={{width:'15rem'}} id="designation" name="manager" onChange={(e) => {setManagerUserName(e.target.value)}} value={managerUserName}>
                    <option value="select">Select</option>
                    {
                        managerList.map(manager => <option value={manager.userName} key={manager.id}> {manager.userName} </option>)
                    }
                </select>
            </p>
            <p>
                <label>From Date</label><br/>
                <input type="date" autoComplete='off' name="fromDate" onChange={(e) => setFromDate(e.target.value)} value={fromDate} required="required" />
            </p>
            <p>
                <label>To Date</label><br/>
                <input type="date" name="toDate" min={fromDate} onChange={(e) => setToDate(e.target.value)} value={toDate} required="required" />
            </p>
            <p>
                <label>Reason</label><br/>
                <input type="text" name="reason" onChange={(e) => setReason(e.target.value)} value={reason} required="required" />
            </p>
            <label> Leave type</label><br/>
                <select id="designation" name="designation" onChange={(e) => setLeaveType(e.target.value)} value={leaveType}>
               < option value="select">Select</option>
                    {
                        leaveTypeOptions.map(leaveType =>
                            
                            <option value={leaveType}>{leaveType}</option>   
                        ) 
                    }
{/*                     
                    <option value="sick leave">Sick leave</option>
                    <option value="casual leave">Casual leave</option>
                    <option value="marriage leave">Marriage leave</option>
                    <option value="maternity leave">Maternity leave</option>
                    <option value="paternity leave">Paternity leave</option> */}

                </select>
                <br>
                </br>
            <p>
                <button id="sub_btn" type="submit" onClick={e => handleSubmit(e)}>Submit</button>
            </p>
            {
                isValid ? <></> : <AlertMessage text='Enter Valid Data' color='red'/>
            }
            {
                isSuccess ? <AlertMessage text='Leave Applied Successfully' color='green'/> : <></>
                
            }
             <p class="p">Display all your leaves <Link to="/display-leave"> Click here!</Link>.</p>
           
        </form>
    </div>
    </header>
  )
}

export default EmployeePage
const HeaderStyle1 = {
  width: "100vw",
  height: "100vh",
  position: "relative",
  background: `url(${BackgroundImage})`,
  backgroundPosition: "center",
  backgroundRepeat: "repeat",
  backgroundSize: "cover",
};



















// import React, { useState, useEffect } from "react";
// import EmployeeService from "../services/EmployeeService";
// import { useNavigate, useRoutes } from "react-router-dom";
// import { useLocation } from "react-router-dom";
// import {Link} from 'react-router-dom'

// import BackgroundImage from "./s3.jpg";

// function EmployeePage() {
//   const location = useLocation();
//   const navigate = useNavigate();

//   const [fromDate, setFromDate] = useState("");
//   const [toDate, setToDate] = useState("");
//   const [reason, setReason] = useState("");
//   const [leavetype,setLeaveType] =useState("");
 

//   const [displays, setDisplays] = useState("");

//   useEffect(() => {
//     let timer1 = setTimeout(() => setDisplays(""), 3000);
//     return () => {
//       clearTimeout(timer1);
//     };
//   }, [displays]);

//   const handleInputChange = (e) => {
//     const { id, value } = e.target;
//     if (id === "fromDate") {
//       setFromDate(value);
//     }
//     if (id === "toDate") {
//       setToDate(value);
//     }
//     if (id === "reason") {
//       setReason(value);
//     }
//     if(id === "leavetype")
//     setLeaveType(value);
   
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     const leaveApply = { fromDate, toDate, reason,leavetype };

//     EmployeeService.saveLeave(leaveApply).then((response) => {
//       setDisplays("Applied Successfully");
//     });
//   };
//   const handleLogout = () => { 
//     localStorage.clear()
//   }



//   return (
//     <header style={HeaderStyle1}>
//       <div>
//         <div className="form">
//           <div class="header">
//             <h3>Apply for leaves!!</h3>
//           </div>
//           <hr></hr>
//           <div className="form-body">
//             <div className="name"></div>
//             <div></div>
//           </div>
//           {displays}

//           <div className="form-body">
//             <div className="fromDate">
//               <label className="form__label" for="fromDate">
//                 From Date
//               </label>
//               <input
//                 className="form__input"
//                 type="date"
//                 value={fromDate}
//                 onChange={(e) => handleInputChange(e)}
//                 id="fromDate"
//                 required
//               />
//             </div>
//             <div className="toDate">
//               <label className="form__label" for="toDate">
//                 From Date
//               </label>
//               <input
//                 className="form__input"
//                 type="date"
//                 value={toDate}
//                 onChange={(e) => handleInputChange(e)}
//                 id="toDate"
//                 required
//               />
//             </div>
//             <div className="reason">
//               <label className="form__label" for="reason">
//                 Reason
//               </label>
//               <input
//                 className="form__input"
//                 type="text"
//                 value={reason}
//                 onChange={(e) => handleInputChange(e)}
//                 id="reason"
//                 required
//               />
//             </div>

//             <div className="LeaveType">
//             <label className="form__label" for="leavetype">leavetype</label>
//             <input className="form__input" type="text" value={leavetype} onChange={(e) => handleInputChange(e)} id="leavetype"  required />
//           </div>
         
//           </div>
//           <div class="footer">
//             <button class="btn success" onClick={(e) => handleSubmit(e)}>
//               Apply!
//             </button>
//             <p class="p"> View all my leaves <Link to="/display-leave">View</Link>.</p>
//             <p class="p"> logout? <Link to="/employee-login" onClick={handleLogout}>Logout</Link>.</p>
//           </div>
//         </div>
//       </div>
//     </header>
//   );
// }

// export default EmployeePage;
// const HeaderStyle1 = {
//   width: "100%",
//   height: "100vh",
//   background: `url(${BackgroundImage})`,
//   backgroundPosition: "center",
//   backgroundRepeat: "repeat",
//   backgroundSize: "cover",
// };

// // import React from 'react'

// // function EmployeePage() {
// //   return (
// //     <div className="text-center">
// //                 <form>
// //                     <h1>Welcome </h1>
// //                     <br></br>
// //                     <h2 class="h21">Apply for leave</h2><br></br>
// //                     <p>
// //                         <label> From Date</label><br/>
// //                         <input type="date" name="date" required />
// //                     </p>
// //                     <p>
// //                         <label> To Date</label><br/>
// //                         <input type="date" name="date" required />
// //                     </p>
// //                     <p>
// //                         <label> Cause </label><br/>
// //                         <input type="text" name="cause" required />
// //                     </p>
// //                     <p>
// //                         <button id="sub_btn" type="submit">Apply</button>
// //                     </p>

// //                 </form>
// //             </div>
// //   )
// // }

// // export default EmployeePage
