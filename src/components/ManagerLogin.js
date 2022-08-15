import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import './style.css'
import BackgroundImage from './s4.jpg'


class ManagerLoginPage extends Component {
    render() {
        return (
            <header style={ HeaderStyle1 }>
            <div className="text-center m-5-auto">
                <h2>Log In</h2>
                <form action="/Emp">
                    <p>
                        <label>Username </label><br/>
                        <input type="text" name="first_name" required />
                    </p>
                   
                    <p>
                        <label>Password</label>
                       
                        <br/>
                        <input type="password" name="password" required />
                    </p>
                    <p>
                    
                    </p>
                    <p>
                        <button id="sub_btn" type="submit">Login</button>
                    </p>
                    <footer>
                    <p class="p">First time? <Link to="/register">Create an account</Link>.</p>
                  
                </footer>
                </form>
                
            </div>
            </header>
        )
    }
}

export default ManagerLoginPage;
const HeaderStyle1 = {
    width: "100%",
    height: "100vh",
    background: `url(${BackgroundImage})`,
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
  
}


