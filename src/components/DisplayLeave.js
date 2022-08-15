import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import EmployeeService from '../services/EmployeeService'
import EmployeePage from './EmployeePage'
import DisplayStatusComponent from './DisplayStatusComponent'
import BackgroundImage from "./s14.jpeg";

function DisplayLeave() {

  const [leaves, setLeaves] = useState([])

  useEffect(() => {
    const applicantId = localStorage.getItem('loggedInId')
    getLeavesByApplicantId(applicantId)
  },[leaves])

  const getLeavesByApplicantId = (applicantId) => {
      EmployeeService.getLeavesByApplicantId(applicantId).then((response) => {
        setLeaves(response.data)
      }).catch(error => {
        console.log(error);
      })
  }

  const deleteLeave = (leaveId) => {
    EmployeeService.deleteLeave(leaveId).then((response) => {
      // getLeavesByApplicantId(applicantId)
    }).catch(error => console.log(error))
  }


  return (
    <div>
       <header style={HeaderStyle1}>
      <h2 style={{marginTop:'80px' , color: "white" ,backgroundColor :"black"}} className='text-center' >Your Leaves</h2>
      <table className='table table-bordered table-stripped' style ={{color:"White"}} >
        <thead>
            <th>Sl No.</th>
            <th>From Date</th>
            <th>To Date</th>
            <th>Reason</th>
            <th>Leave Type</th>
            <th>Leave Status</th>
           
           
        </thead>
        <tbody style = {{color:"White"}}>
          {
            leaves.map(
              (leave, index) => 
              <tr key={leave.id}>
                <td> {index + 1} </td>
                <td> {leave.fromDate} </td>
                <td> {leave.toDate} </td>
                <td> {leave.reason} </td>
                <td>{leave.leaveType}</td>
                {/* <td> {leave.leaveStatus} </td> */}
                <td> <DisplayStatusComponent status={leave.leaveStatus}/> </td>
                
              </tr>
          )
          }
        </tbody>
      </table>
      </header>

      
    </div>
  )
}

export default DisplayLeave
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

// import EmployeeService from '../services/EmployeeService'
// import BackgroundImage from './s0.jpg'
// import {useLocation} from 'react-router-dom';

// import DisplayStatusComponent from './DisplayStatusComponent'

// function DisplayLeave() {
//   const location = useLocation();
//   const [user, setUser]  = useState([])
//   const [leave, setLeave] = useState([])


//     useEffect(() => {
//         getAllLeaves()
//     },[])

//     const getAllLeaves = () => {
//         setUser('')
//       EmployeeService.getAllLeaves().then((response) => {
     
        
//           setLeave(response.data)
//           setUser(response.data)
//           console.log(response.data);
        
//       }).catch(error =>{
//           console.log(error);
//       })
//   }
 
 
//   return (
//     <header style={ HeaderStyle1 }>
//     <div className='container'>
//       <h2 className='text-center'> view my leaves</h2>
     
//       <table className='table table-bordered table-stripped'>
//         <thead>
          
//             <th>fromDate</th>
//             <th> toDate</th>
//             <th> reason</th>
//             <th> LeaveType</th>
            

            
//             <th>Status</th>
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
//                         <td> {leave.status} </td>
                        
                        
                        
                        
//                     </tr>
//                 )
//             }
//         </tbody>
//       </table>
//     </div>
//     </header>
//   )
// }

// export default DisplayLeave
// const HeaderStyle1 = {
//   width: "100%",
//   height: "100vh",
//   background: `url(${BackgroundImage})`,
//   backgroundPosition: "center",
//   backgroundRepeat: "repeat",
//   backgroundSize: "cover",

// }