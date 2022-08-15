import React from 'react'
import {Link, useNavigate} from 'react-router-dom'
import { useRef, useState, useEffect } from 'react'
import EmployeeService from '../services/EmployeeService';
import BackgroundImage from './s13.jpeg'
 import './stylesheet/login.css'

function Login() {

    const [user, setUser] = useState('');
    const [pwd, setPwd] = useState('')
    const [designation, setDesignation]=useState('employee')

    const userRef = useRef()

    const navigate = useNavigate()
   
   

    useEffect(() => {
        const designation = localStorage.getItem("designation");
        if (designation){
          if(designation === "employee")
          {
            navigate("/employee-page")
          }
          else if(designation === "manager")
          {
            navigate("/manager-page")

          }
          else {
            navigate("/employee-login")
          }
        
          
        }
        else {
          navigate("/employee-login")
        }
    
      }, []);
    useEffect(() => {
        userRef.current.focus();
    }, [])

    
    


    

    const handleSubmit = (e) => {
        e.preventDefault()
        // console.log(user,pwd);
        setUser('')
        setPwd('')
        setDesignation('')
        EmployeeService.getUserByUserName(user).then((response) => {
            // console.log(response.data);
            if(response.data.userName === user && response.data.password === pwd  ) {
                
                localStorage.setItem("loggedInId",response.data.id)
                localStorage.setItem("isLoggedIn","true")
                localStorage.setItem("designation",response.data.designation)
                localStorage.setItem("userName",response.data.userName)
                console.log('Logged in');
                if(response.data.designation === designation)
                navigate('/employee-page',{state:{name:user}});
                else
                navigate('/manager-page')
              
            
            } else {
                alert("Wrong Credentials, Please try again");
                console.log(user,pwd,response.data.userName,response.data.password);
            }
        })
    }

  return (

    <div style={ HeaderStyle1 }>
   
    <div className="text-center m-5-auto">
        
        <form className='form-class' onSubmit={handleSubmit}>
        <h2> Log In</h2>
            <p>
                <label>Username</label><br/>
                <input type="text" autoComplete='off' name="userName" ref={userRef} onChange={(e) => setUser(e.target.value)} value={user} required />
            </p>
            <p>
                <label>Password</label>
                
                <br/>
                <input type="password" name="password" onChange={(e) => setPwd(e.target.value)} value={pwd} required />
            </p>

			
            <p>
                <button id="sub_btn" type="submit">Login</button>
            </p>
            <footer>
                    <p class="p">First time? <Link to="/register">Create an account</Link>.</p>
                  
                </footer>
        </form>
    </div>
    </div>
    
  )
}

export default Login
const HeaderStyle1 = {
  width: "100vw",
  height: "100vh",
  background: `url(${BackgroundImage})`,
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  position:"absolute",
  top:"60px"
 
  // marginTop:"-90px"

}

  

