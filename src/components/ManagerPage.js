import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import EmployeeService from "../services/EmployeeService";
import DisplayStatusComponent from "./DisplayStatusComponent";
import BackgroundImage from "./s14.jpeg";

function ManagerPage() {
  const [leaves, setLeaves] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const managerId = localStorage.getItem("loggedInId");
    getLeavesByManagerId(managerId);
  }, []);

  
  useEffect(() => {
    const designation = localStorage.getItem("designation");
    
    if (designation){
      if(designation !== "manager")
      {
        navigate("/employee-login")
      }
      
    }
    else{
      navigate("/employee-login")
    }

  }, []);

  const getLeavesByManagerId = (managerId) => {
    EmployeeService.getLeavesByManagerId(managerId)
      .then((response) => {
        setLeaves(response.data);
      })
      .catch((error) => console.log(error));
  };

  const acceptOrRejectLeave = (e, leaveId, acceptOrReject) => {
    e.preventDefault();

    EmployeeService.getLeaveByLeaveId(leaveId).then((response) => {
      // console.log(response.data);

      const applicantId = response.data.applicantId;
      const applicantName = response.data.applicantName;
      const managerId = response.data.managerId;
      const fromDate = response.data.fromDate;
      const toDate = response.data.toDate;
      const reason = response.data.reason;
      const leaveStatus = acceptOrReject;
      const leaveType=response.data.leaveType

      const leave = {
        applicantId,
        applicantName,
        managerId,
        fromDate,
        toDate,
        reason,
        leaveStatus,
        leaveType
      };
      // console.log(leave);
      EmployeeService.updateLeave(response.data.id, leave)
        .then((_response) => {
          const managerId = localStorage.getItem("loggedInId");
          getLeavesByManagerId(managerId);
          // navigate("/manager-page");
          
        })
        .catch((error) => console.log(error));
       


    });
   
  };

  return (
    <header style={HeaderStyle1}>
    <div>
      <h2 style={{ marginTop: "80px"}} className="text-center">
        Manage Leaves
      </h2>
      <table className="table table-bordered table-stripped" style ={{color:"White"}}>
        <thead>
          <th>Sl No.</th>
          <th>Applicant Name</th>
          <th>From Date</th>
          <th>To Date</th>
          <th>Reason</th>
          <th>Leave Type</th>

          <th>Accept or Reject</th>
        </thead>
        <tbody style ={{color:"White"}}>
          {leaves.map((leave, index) => {
            return (
              <>
               
                    <tr key={leave.id}>
                      <td> {index + 1} </td>
                      <td> {leave.applicantName} </td>
                      <td> {leave.fromDate} </td>
                      <td> {leave.toDate} </td>
                      <td> {leave.reason} </td>
                      <td>{leave.leaveType}</td>
                      {/* <td> {leave.leaveStatus} </td> */}

                      <td>
                        <button
                          className="btn btn-success"
                          onClick={(e) =>
                            acceptOrRejectLeave(e, leave.id, "accepted")
                          }
                          disabled={leave.leaveStatus === "accepted" || leave.leaveStatus === "rejected"}
                        >
                          Accept
                        </button>
                        <button
                          className="btn btn-danger"
                          style={{ margin: "5px" }}
                          onClick={(e) =>
                            acceptOrRejectLeave(e, leave.id, "rejected")
                          }
                         disabled={leave.leaveStatus === "rejected"|| leave.leaveStatus === "accepted"}
                        >
                          Reject
                        </button>
                      </td>
                    </tr>
                  
              </>
            );
          })}
        </tbody>
      </table>
    </div>
    </header>
  );
}

export default ManagerPage;
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


// import React, { useEffect, useState } from 'react'
// import { Link, Navigate } from 'react-router-dom'
// import EmployeeService from '../services/EmployeeService'
// import BackgroundImage from './s0.jpg'
// import {useLocation,useNavigate} from 'react-router-dom';

// function ListEmployeeComponent() {
//   const location = useLocation();
//   const [user, setUser]  = useState([])
//   const [leave, setLeave] = useState([])
//   const [employee,setEmployees]=useState([])

//     useEffect(() => {
//         getAllLeaves()

//     },[])

//     useEffect(() => {

//       const localstorage = localStorage.getItem("leaves")
//       if (localstorage){
//         setLeave(JSON.parse(localstorage))

//       }

//   },[])

//     const getAllLeaves = () => {

//       EmployeeService.getAllLeaves().then((response) => {
//      const data=  response.data.map((res,i)=>{return {...res,id:i}})
//         localStorage.setItem("leaves",JSON.stringify(data))

//         // setLeave(JSON.stringify(response.data))

//           console.log(response.data);
//       }).catch(error =>{
//           console.log(error);
//       })
//   }
//   const getAllEmployees = () => {
//     EmployeeService.getAllEmployees().then((response) => {
//         setEmployees(response.data)
//         console.log(response.data);
//     }).catch(error =>{
//         console.log(error);
//     })
// }

//     const deleteEmployee = (employeeId) => {

//       EmployeeService.deleteEmployee(employeeId).then((response) => {
//           getAllEmployees()
//       }).catch(error => console.log(error))
//     }
//     const handleLogout = () => {
//       localStorage.clear()
//     }
//     const acceptOrRejectLeave = (e,leaveId, acceptOrReject) => {
//       e.preventDefault()
//       const navigate= Navigate();

//       EmployeeService.getLeaveByLeaveId(leaveId).then((response) => {
//         // console.log(response.data);

//         const fromDate = response.data.fromDate
//         const toDate = response.data.toDate
//         const reason = response.data.reason
//         const Status = acceptOrReject

//         const leave = { fromDate, toDate, reason, Status}
//         // console.log(leave);
//         EmployeeService.updateLeave(response.data.id, leave).then((response) => {
//           navigate('/login')
//         }).catch(error => console.log(error))
//       })
//   }

//   return (
//     <header style={ HeaderStyle1 }>
//     <div className='container'>
//       <h2 className='text-center'> Accept or Reject leave</h2>

//       <table className='table table-bordered table-stripped'>
//         <thead>

//             <th>fromDate</th>
//             <th> toDate</th>
//             <th> reason</th>
//             <th> LeaveType</th>

//             <th>Actions</th>
//         </thead>
//         <tbody>
//             {
//                 leave.map(
//                     leave =>
//                     <tr key={user.userName}>

//                         <td> {leave.toDate} </td>
//                         <td> {leave.fromDate} </td>
//                         <td> {leave.reason} </td>
//                         <td>{leave.leavetype}</td>

//                         <td>
//                         <button className='btn btn-success' onClick={(e) => acceptOrRejectLeave(e,leave.id, 'accepted')}>Accept</button>
//                   <button className='btn btn-danger' style={{margin:"5px"}} onClick={(e) => acceptOrRejectLeave(e,leave.id, 'rejected')}>Reject</button>

//                           {/* <Link className='btn btn-warning' to={`/employee-page/${user.id}`}>Accept</Link>
//                           <button className='btn btn-danger' onClick={() => (leave.id)} style={{margin:"5px"}}>reject</button> */}
//                         </td>
//                     </tr>
//                 )
//             }
//         </tbody>
//       </table>
//     </div>
//     <p class="p"> logout? <Link to="/employee-login" onClick={handleLogout}>Logout</Link>.</p>
//     </header>
//   )
// }

// export default ListEmployeeComponent
// const HeaderStyle1 = {
//   width: "100%",
//   height: "100vh",
//   background: `url(${BackgroundImage})`,
//   backgroundPosition: "center",
//   backgroundRepeat: "repeat",
//   backgroundSize: "cover",

// }
