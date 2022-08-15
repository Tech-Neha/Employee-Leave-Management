import axios from 'axios'

const EMPLOYEE_BASE_REST_API_URL = 'http://localhost:8083/employees';
const user_url = 'http://localhost:8083/login';
const leave_url = 'http://localhost:8083/leave';



class EmployeeService{

  getAllEmployees(){
    return axios.get(EMPLOYEE_BASE_REST_API_URL)
}

createEmployee(employee){
    return axios.post(EMPLOYEE_BASE_REST_API_URL, employee)
}

getEmployeeById(employeeId){
    return axios.get(EMPLOYEE_BASE_REST_API_URL + '/' + employeeId);
}

updateEmployee(employeeId, employee){
    return axios.put(EMPLOYEE_BASE_REST_API_URL + '/' + employeeId, employee);
}


deleteEmployee(employeeId){
    return axios.delete(EMPLOYEE_BASE_REST_API_URL + '/' + employeeId)
}
      
      saveUser(user){
        return axios.post(user_url, user)
      }
    
      // saveLeave(leave){
      //   return axios.post(leave_url,leave)
      // }
      // getAllLeaves(){
      //   return axios.get(leave_url)
      // }
      // updateLeaves(leave){
      //   return axios.put(leave_url,leave)

      // }
      getUserByUserName(userName){
        return axios.get(user_url + '/' + userName)
    }

    createUser(employee){
        return axios.post(user_url, employee)
    }

   
   

    getAllManagers(){
        return axios.get(user_url + '/' + 'managers')
    }

    createLeave(leaveObj){
        return axios.post(leave_url, leaveObj)
    }

    getLeavesByApplicantId(applicantId){
        return axios.get(leave_url + '/' + applicantId)
    }
    getLeaveType()
    {
        return axios.get(leave_url + '/get-leave-type' )
    }

    deleteLeave(leaveId){
        return axios.delete(leave_url + '/' + leaveId)
    }

    getLeavesByManagerId(managerId){
        return axios.get(leave_url + '/manage-leaves/' + managerId)
    }

    getLeaveByLeaveId(id){
        return axios.get(leave_url + '/leaveId/' + id)
    }

    updateLeave(id, leave){
        return axios.put(leave_url + '/' + id, leave)
    }

// // ---------------------------------------------------------------------
//     getAdminByAdminName(adminName){
//         return axios.get(admin_url + '/' + adminName)
//     }

//     createAdmin(employee){
//         return axios.post(admin_url, employee)
//     }
 }



    
    

   
  
   





export default new EmployeeService();
