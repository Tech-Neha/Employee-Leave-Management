import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Nav, NavLink, Bars, NavMenu } from "./NavBarElements";



const NavBar = () => {
  // const [isUserLoggedIn, setisUserLoggedIn] =useState('')
  const navigate = useNavigate();

   
  const pathName = window.location.pathname;
  const isLoggedIn=localStorage.getItem("isLoggedIn")


  // const isNotLoggedIn =  pathName === "/"  ? true : pathName.split("/").includes("employee-login") ;
  
  const handleLogout =() => {
   localStorage.removeItem("designation")
   localStorage.removeItem("userName")
   localStorage.removeItem("loggedInId")
   localStorage.setItem("isLoggedIn","false")
   navigate("/employee-login")
   
   
  }

  return (
    <>
      <Nav>
        <NavLink to="/home">
          <img
            style={{ maxWidth: "100%", maxHeight: "100%" }}
            src={require("./a.jpg")}
            alt="logo"
          />
        </NavLink>
        <Bars />
        <NavMenu>
          {(isLoggedIn && isLoggedIn === "true" )? (
            <NavLink onClick={handleLogout} to="/employee-login" activeStyle>
            Logout
          </NavLink>
           
          ):(
            <NavLink to="/employee-login" activeStyle>
            Login
          </NavLink>
            

          )}
        </NavMenu>
      </Nav>
    </>
  );
};
export default NavBar;
