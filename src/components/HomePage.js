import React ,{useEffect} from 'react'
import './index.css';
import {Link, useNavigate} from 'react-router-dom'



import welcome from "./s1.jpg"




function HomePage() {
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
        navigate("/")
      }
    
      
    }
    else {
      navigate("/")
    }

  }, []);
    return (
      <div>
       <img  className="picture" src={welcome} alt="" />
      </div>
    );
  }
  
  export default HomePage;







